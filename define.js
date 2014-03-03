(function (register, ready) {
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
    ready(function () {
      root = function (callback) {
        callback(require);
      };
      
      root(callback);
    });
  };

  define.root = function (callback) {
    root(callback);
  };
  
  register('define', define);
  
})(function register (name, lib) {
  window[name] = lib;
}, function ready (callback) {
  document.addEventListener("DOMContentLoaded", callback);
});
