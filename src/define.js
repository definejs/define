(function (onReady, register) {
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

  define.test = function (callback) {
    callback(requireFrom('root'));
  };

  register('define', define);

})(function onReady (listener) {
  'use strict';

  if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', listener);
  } else { setTimeout(callback, 0); }
}, function register (name, module) {
  'use strict';

  if (typeof window !== 'undefined') { window[name] = module; }
  if (typeof global !== 'undefined') { global[name] = module; }
}); 
