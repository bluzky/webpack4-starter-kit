// ------------------
// @Table of Contents
// ------------------

/**
 * + @Loading Dependencies
 * + @Entry Point Setup
 * + @Path Resolving
 * + @Exporting Module
 */

// ---------------------
// @Loading Dependencies
// ---------------------

const path = require("path"),
  manifest = require("./manifest"),
  rules = require("./rules"),
  plugins = require("./plugins"),
  UglifyJsPlugin = require('uglifyjs-webpack-plugin');;

// ------------------
// @Entry Point Setup
// ------------------

var entries = {};
for (var key in manifest.entries) {
  entries[key] = path.join(
    manifest.paths.src,
    "scripts",
    manifest.entries[key]
  );
}

// ---------------
// @Path Resolving
// ---------------

const resolve = {
  extensions: [".webpack-loader.js", ".web-loader.js", ".loader.js", ".js"],
  modules: [
    path.join(__dirname, "../node_modules"),
    path.join(manifest.paths.src, "")
  ]
};


// ---------------
// @Optimization and split chunk
// -------------
var optimization = {
    namedChunks: true,
    nodeEnv: 'production',
    splitChunks: {
      chunks: 'all',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: false,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
};
  
  
if (manifest.IS_PRODUCTION) {
    optimization.minimizer = [
      new UglifyJsPlugin({
          parallel: true,
          uglifyOptions: {
              compress: {
                comparisons: true,
                conditionals: true,
                dead_code: true,
                drop_debugger: true,
                evaluate: true,
                if_return: true,
                join_vars: true,
                sequences: true,
                unused: true,
                warnings: false
              },

              output: {
                comments: false
              }
          }
        })
    ]
}
  
  

// -----------------
// @Exporting Module
// -----------------

module.exports = {
  devtool: manifest.IS_PRODUCTION ? false : "cheap-eval-source-map",
  context: path.join(manifest.paths.src, "scripts"),
  //  watch: !manifest.IS_PRODUCTION,
  entry: entries,
  output: {
    path: manifest.paths.build,
    publicPath: "/static/",
    filename: manifest.outputFiles.bundle
  },
  module: {
    rules
  },
  resolve,
  plugins,
  optimization
};
