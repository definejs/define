(function (env) {
  'use strict';
  
  var registry = {};
  
  var define = function (name, module) {
    if (registry[name]) { throw env.err('module redefinition: ' + name); }
    
    registry[name] = {
      module: module,
      cached: false
    };
  };
  
  var require = function (name) {
    var entry = registry[name];
    
    if (!entry) { throw env.err('module undefined: ' + name); }
    if (entry.cached) { return entry.module; }

    entry.module = entry.module(require);
    entry.cached = true;
    return entry.module;
  };
  
  var rootSync = function (callback) {
    callback(require);
  };
  
  var root = function (callback) {
    env.ready(function () {
      root = rootSync;
      root(callback);
    });
  };
  
  var rootWrapper = function (callback) {
    root(callback);
  };

  define.root = rootWrapper;
  
  env.global('define', define);
  
})({
  global: function (name, module) {
    window[name] = module;
  },
  ready: function (callback) {
    document.addEventListener("DOMContentLoaded", callback);
  },
  err: function (e) {
    return new Error(e);
  }
});
