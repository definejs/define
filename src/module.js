(function (env) {
  'use strict';

  var registry = {};

  var getter = function (parent) {
    var msgPrefix = parent ? (parent + ': ') : '';

    return function (name) {
      var entry = registry[name];

      if (!entry) { throw msgPrefix + 'module not registered: ' + name; }
      if (entry.cached) { return entry.module; }

      entry.module = entry.module(getter(name));
      entry.cached = true;
      return entry.module;
    };
  };

  var get = getter();

  var register = function (name, module) {
    if (registry[name]) { throw 'module already registered: ' + name; }

    registry[name] = {
      module: module,
      cached: false
    };
  };

  var root = function (callback) {
    env.onReady(function () {
      callback(get);
    });
  };

  var module = function () {
    var arg = arguments[0],
        arg2 = arguments[1];

    if (typeof arg === 'string' && typeof arg2 === 'function') {
      return register(arg, arg2);
    }

    if (typeof arg === 'function') { return root(arg); }
    if (typeof arg === 'string') { return get(arg); }
  };

  env.register('module', module);

})((function env () {
  'use strict';

  var onReady = function (listener) {
    document.addEventListener('DOMContentLoaded', listener);
  };

  var register = function (name, module) {
    window[name] = module;
  };

  return {
    onReady: onReady,
    register: register
  };
})());
