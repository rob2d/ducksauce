import React, { Component }  from 'react'
import { Provider, connect } from 'react-redux'
import ReactDOM              from 'react-dom'
import Route                 from 'react-router-dom/Route'
import Switch                from 'react-router-dom/Switch'
import injectSheet           from 'react-jss'
import appHistory            from 'utils/appHistory'
import { ConnectedRouter }   from 'connected-react-router'
import store                 from './store'
import AppHeader             from 'core/components/AppHeader'
import AppFooter             from 'core/components/AppFooter'
import Welcome               from 'core/components/Welcome'

const styles = {
    appWrapper : {
        minHeight       : '100%',
        margin          : '0px auto',
        display         : 'flex',
        flexDirection   : 'row',
        textAlign       : 'center',
        backgroundColor : '#FFFFFF',
        transition      : 'all 0.32s'
    },
    routeViewWrapper : {
        display       : 'flex',
        width         : '100%',
        flexDirection : 'column'
    },
    mainContent : {
        flexGrow : 1,
        display : 'flex',
        flexDirection : 'column'
    }
};

const StyledContent = injectSheet(styles)(
    function AppContent ({ classes }) {
        return (  
            <div className={ classes.appWrapper }>
                <div className={ classes.routeViewWrapper }>
                    <AppHeader />
                    {
                        <Switch>
                            <Route 
                                exact path='/' 
                                component={ Welcome } 
                            />
                        </Switch>
                    }
                    <AppFooter />
                </div>
            </div>
        );
    }
);

function RoutingApp() { 
    return (
        <Provider store={ store }>
            <ConnectedRouter history={ appHistory }>
                <StyledContent />
            </ConnectedRouter>
        </Provider>
    );
}

ReactDOM.render(<RoutingApp />, document.getElementById("app"));

export default RoutingApp