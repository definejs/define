(function (env) {
  'use strict';
  
  var modules = {};
  
  var define = function (name, module) {
    if (modules[name]) {
      throw env.exception('module redefinition: ' + name);
    }
    
    modules[name] = {
      ref: module,
      cached: false
    };
  };
  
  var require = function (name) {
    var module = modules[name];
    
    if (!module) {
      throw env.exception('module undefined: ' + name);
    }
    
    if (module.cached) { return module.ref; }

    module.ref = module.ref(require);
    module.cached = true;
    return module.ref;
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
    
    /**
     * the function wrapper is needed in order to update the reference
     * to the root function since it will be redefined on env ready
     */
     
    root(callback);
  };
  
  env.global('define', define);
  
})({
  global: function (name, module) {
    window[name] = module;
  },
  ready: function (callback) {
    document.addEventListener("DOMContentLoaded", callback);
  },
  exception: function (e) {
    return new Error(e);
  }
});
