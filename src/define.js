(function (onReady, global) {
  'use strict';
  
  var registry = {};
  
  var define = function (name, module) {
    if (registry[name]) { throw 'module redefinition: ' + name; }
    
    registry[name] = {
      module: module,
      cached: false
    };
  };
  
  var requireFrom = function (parent) {
    return function require (name) {
      var entry = registry[name];
      
      if (!entry) { throw parent + ': module undefined: ' + name; }
      if (entry.cached) { return entry.module; }
  
      entry.module = entry.module(requireFrom(name));
      entry.cached = true;
      return entry.module;
    };
  };

  define.root = function (callback) {
    onReady(function () {
      callback(requireFrom('root'));
    });
  };

  global('define', define);

})((function onReady () {
  'use strict';

  var callAsync = function (callback) {
    setTimeout(callback, 0);
  };

  var addReadyListener = function (listener) {
    document.addEventListener('DOMContentLoaded', listener);
  };

  addReadyListener(function () {
    addReadyListener = callAsync;
  });

  return function onReady (listener) {
    addReadyListener(listener);
  };

})(), function global (name, module) {
  'use strict';
  window[name] = module;
}); 
