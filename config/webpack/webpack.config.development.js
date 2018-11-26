module.exports = {
    module : {
        rules : [
          {
            test    : /\.(js|jsx)$/,
            exclude : /node_modules/,
            use : {
                loader: "babel-loader",
                options : {
                    // This is a feature of `babel-loader` for webpack 
                    // (not Babel itself). It enables caching results 
                    // in ./node_modules/.cache/babel-loader/ dir 
                    // for faster rebuilds.
                    
                    cacheDirectory : true,
                    plugins : [ 
                        '@babel/plugin-proposal-export-default-from',
                        'react-hot-loader/babel' 
                    ]
                }
            }
          }
        ]
      }
};