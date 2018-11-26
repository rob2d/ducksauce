import React                 from 'react'
import ReactDOM              from 'react-dom'
import { Provider, connect } from 'react-redux'
import injectSheet           from 'react-jss'
import { ConnectedRouter }   from 'connected-react-router'
import store                 from './store'
import appHistory            from 'utils/appHistory'
import withViewportSizes     from 'utils/component-hocs/withViewportSizes'

const styles = {
    appWrapper : { 
        minWidth        : '300px',
        minHeight       : '100%',
        margin          : '0px auto',
        display         : 'flex',
        flexDirection   : 'column',
        textAlign       : 'center',
        backgroundColor : '#FFFFFF'
    },
    routeViewWrapper : {
        display        : 'flex',
        width          : '100%',
        flexDirection  : 'column',
        alignItems     : 'center',
        justifyContent : 'center',
        flexGrow       : 1
    },
    mainContent : {
        flexGrow : 1,
        display : 'flex',
        flexDirection : 'column'
    }
};

const AppContent = connect(({ router, viewport, session })=>({ 
    ...router,
    ...viewport,
    sessionState : session.sessionState
}))(withViewportSizes(injectSheet(styles)(
    function AppContent ({ classes, sessionState }) {
        
        return (  
            <div className={ classes.appWrapper }>
                <div className={ classes.routeViewWrapper }>
                    Ducksauce!
                </div>
            </div>
        );
    }
)));

function RoutingApp() { 
    return (
        <Provider store={ store }>
            <ConnectedRouter history={ appHistory }>
                <AppContent />
            </ConnectedRouter>
        </Provider>
    );
}

ReactDOM.render(<RoutingApp />, document.getElementById("app"));
export default RoutingApp