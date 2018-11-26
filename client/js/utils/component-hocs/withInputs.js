import React, { 
    Component, 
    PureComponent 
} from 'react'

// TODO : create new npm module + github repo
//        for this helper HOC

/**
 * class which binds onChange methods
 * and props for listening to an input
 * (without the huge boilerplate of redux
 *  or some convoluted form lib)
 * 
 * usage: withInputs(MyComponent)({
 *  inputs : { 
 *      [obj-namespace]: {
 *          onAction     : Function <({ ...props })>,
 *          focusOnMount : Boolean,
 *          elementId    : String
 *      }
 *  })
 * 
 * @param {*} WrappedComponent 
 */
function withInputs (WrappedComponent) {
    return (inputs, asNonPure=false) => {

        /**
         * The namespace of the input which will
         * contain the default input to focus on when 
         * wrapped component mounts (if available)
         */
        let defaultFocusInput = '';

        for(let [namespace, { focusOnMount }] of Object.entries(inputs)) {
            if(focusOnMount) {
                defaultFocusInput = namespace;
                break;
            }
        }

        let ComponentType = asNonPure ? Component : PureComponent;

        class InputComponentsHOC extends ComponentType {
            constructor(props) {
                super(props);

                /** 
                 * Any element or React element refs are
                 * to be added to this namespace for simplicity
                 * and convenience with IDE
                 **/
                this.R = { componentRef : undefined };

                this.listeners = {};

                let initialState = {};

                for(let [namespace, { elementId } ] of Object.entries(inputs)) {

                    // for each input of [xxx], create a 
                    // change listener in the form "onChange[Xxx]" 
                    // These callbacks detect input changes, and sets 
                    // state[xxx] to the new input values. 
                    // They are made available to the HOC's wrapped
                    // components via props.

                    let capitalizedName = namespace.charAt(0).toUpperCase() + 
                                                            namespace.substr(1);

                    let listenerNS = `onChange${capitalizedName}`;
                    this.listeners[listenerNS] = (event)=> {
                        this.setState({ [namespace] : event.target.value });
                    }

                    // also be sure while iterating to assign a default
                    // value to inputs so that they do not register as
                    // "uncontrolled" and start to throw React warnings
                    
                    initialState[namespace] = '';
                }

                this.state = initialState;
            }

            componentDidMount () {
                document.addEventListener('keypress', this.onKeyPressed);

                for(let [namespace, { elementId }] of Object.entries(inputs)) {   
                    let element = document.getElementById(elementId);

                    if(element) {
                        this.R[`${namespace}Ref`] = element;

                        // allows for keyboard navigation
                        // (must be specified because MUI
                        // lib hides input component)

                        this.R[`${namespace}Ref`].tabIndex = 0;
                    }
                }

                if(defaultFocusInput && this.R[`${defaultFocusInput}Ref`]) {
                    this.R[`${defaultFocusInput}Ref`].focus();
                }
            }

            componentWillUnmount () {
                document.removeEventListener('keypress', this.onKeyPressed);

                // element references should be let
                // go to free up RAM

                for(let [namespace, element] of Object.entries(this.R)) {
                    this.R[`${namespace}Ref`] = undefined;
                }
            }

            /**
             * Listens for the enter key and
             * if one of our inputs are focused,
             * apply a supplied action (via an input.onAction callback)
             * run from the wrapped component's scope
             */
            onKeyPressed = (event)=> {
                switch(event.keyCode) {
        
                    case 13:   // ENTER
                        let activeElement = document.activeElement;

                        for (const [ namespace, { onAction, elementId } ] of Object.entries(inputs)) {
                            let element = this.R[`${namespace}Ref`];
                            if(element == activeElement && onAction) {
                                onAction.apply(this.R.componentRef, this.props);
                            }
                        }
                }
            };

            render () {
                let { componentRef, ...refs } = this.R; 
                
                return (
                    <WrappedComponent 
                        ref={ c => this.R.componentRef = c }
                        { ...this.props }
                        { ...this.state }
                        { ...this.listeners }
                        { ...refs }
                    />
                );
            }
        }

        return InputComponentsHOC;
    };
}

export default withInputs