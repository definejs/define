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
  
  var requireFrom = function (parent) {
    var require = function (name) {
      var entry = registry[name];
      
      if (!entry) { throw env.err(parent + ': module undefined: ' + name); }
      if (entry.cached) { return entry.module; }
  
      entry.module = entry.module(requireFrom(name));
      entry.cached = true;
      return entry.module;
    };
    
    return require;
  };

  var root = function (callback) {
    env.onReady(function () {
      callback(requireFrom('root'));
    });
  };

  define.root = root;
  env.global('define', define);
})((function env () {
  'use strict';

  var callAsync = function (callback) {
    setTimeout(callback, 0);
  };

  var addReadyListener = function (listener) {
    document.addEventListener("DOMContentLoaded", function () {
      addReadyListener = callAsync;
      listener();
    });
  };

  var onReady = function (listener) {
    addReadyListener(listener);
  };

  var err = function (e) {
    return new Error(e);
  };

  var global = function (name, module) {
    window[name] = module;
  };

  return {
    onReady: onReady,
    err: err,
    global: global
  };
})());
