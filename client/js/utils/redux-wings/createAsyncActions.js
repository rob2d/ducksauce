import createAsyncAction from './createAsyncAction'

function createAsyncActions ({
    actions, sliceNamespace, actionParams
}) {
    actionParams.forEach(({ namespace, requestCaller })=> {
        createAsyncAction({
            actions,            
            sliceNamespace,
            namespace, 
            requestCaller        
        })
    });
}

export default createAsyncActions