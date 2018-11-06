const fs = require('fs');
const { DefinePlugin } = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

/**
 * 
 * helper function to populate an object
 * with aliases anywhere within a specified 
 * directory's root level for all folders
 * 
 * @param {String} subPath
 * @returns {Object} dict with [aliases] -> 'path'
 */
function createDirAliases (subPath) {
  const aliasDict = {};

  fs.readdirSync(global.resolvePath(subPath))
    .filter( fname => 
    fs.lstatSync(global.resolvePath(subPath, fname))
      .isDirectory()
  ).forEach( dirname => 
    aliasDict[dirname] = global.resolvePath(subPath, dirname)
  );

  return aliasDict;
}

const rootJSAliases = createDirAliases('src/js');
const reduxAliases = createDirAliases('src/js/modules');

module.exports = {
  module : {
    rules : [
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: (process.env.NODE_ENV == 'production') }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      }
    ]
  },
  plugins : [
    new HtmlWebPackPlugin({
      template : "./src/index.html",
      filename : "./index.html"
    }),
    new MiniCssExtractPlugin({
      filename : "[name].css",
      chunkFilename : "[id].css"
    }),
    new DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ],
  resolve : {
    alias : { 
      ...rootJSAliases,
      ...reduxAliases 
    }
  }
};