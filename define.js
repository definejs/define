(function (env) {
  'use strict';
  
  var modules = {},
      cached = {};
  
  var define = function (name, module) {
    modules[name] = module;
  };
  
  var require = function (name) {
    if (cached[name]) {
      return cached[name];
    }
    
    cached[name] = modules[name](require);
    delete modules[name];
    return cached[name];
  };
  
  var root = function (callback) {
    env.ready(function () {
      root = function (callback) {
        callback(require);
      };
      
      root(callback);
    });
  };

  define.root = function (callback) {
    // the function wrapper is needed in order to update the reference
    // to the root function since it will be redefined on env ready
    root(callback);
  };
  
  env.global('define', define);
  
})({
  global: function (name, module) {
    window[name] = module;
  },
  ready: function (callback) {
    document.addEventListener("DOMContentLoaded", callback);
  }
});
