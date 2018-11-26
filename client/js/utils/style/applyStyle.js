const noUnitDict = {
    display        : true,
    alignItems     : true,
    justifyContent : true,
    fontWeight     : true,
    color          : true,
    border         : true,
    textAlign      : true,
    cursor         : true,
    pointerEvents  : true,
    filter         : true,
    border         : true,
    textTransform  : true,
    lineHieght     : true
};

/**
 * Recursively adds unit as needed
 * to props within the styleguide
 * 
 * @param {*} source 
 * @param {*} unit 
 */
function applyStyle (
    source, unit, 
    scaleFactors = undefined,
    onlyScaleFactors = (scaleFactors && true)
) {
    const returnObj = { ...source };
    
    for(let key of Object.keys(returnObj)) {
        switch(typeof returnObj[key]) {
            case 'number' :
                
                // apply unit only if it's not an
                // ignored attribute
                const unitApplied =  !noUnitDict[key] ? unit : '';

                const useScaleFactor = scaleFactors && scaleFactors[key];
                
                // if we have no scale factor, include 
                // if onlyScaleFactors check is false
                // (which is default mode of op)
                
                if(useScaleFactor){
                    returnObj[key] = `${(returnObj[key]*scaleFactors[key])}${unitApplied}`;
                } else if(!onlyScaleFactors){
                    returnObj[key] = returnObj[key] + unitApplied;                        
                }

            break;

            case 'object' : // recursive call
                applyStyle(returnObj[key], unit, scaleFactors, onlyScaleFactors)
                break;
        }
    }
    
    return returnObj;
}

module.exports = applyStyle;