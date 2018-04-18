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
  plugins = require("./plugins");

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
    publicPath: "/",
    filename: manifest.outputFiles.bundle
  },
  module: {
    rules
  },
  resolve,
  plugins
};
