module
======

Module system for the browser

Featuring
---------

*   Simple, feather-weight library
*   One global to rule them all
*   Lazy module loading
*   Cached module instantation
*   DOM ready 

CAUTION: This is not a script loader
------------------------------------

This library neither loads your scripts dynamically nor binds module names to
files.

You still need to declare the scripts in the html.

This really sucks, but this library can help allowing scripts to be declared
in any order besides its dependency tree.

The only caveat is to declare this library first.

Usage
=====

If you are using a build system to concatenate your scripts, the script
declarations can be very simple:

```html
<script src="module.js"></script>
<script src="bundle.js"></script>
```

```js
module(function (require) {
  var greet = require('greet');
  greet('world');
});

module('greet', function (require) {
  var $ = require('dom');
    
  var greet = function (greeted) {
    $('#content').innerHTML = '<h1>Hello, ' + greeted + '!!</h1>';
  };
  
  return greet;
});

module('dom', function () {
  var dom =  function (selector) {
    return document.querySelector(selector);
  };
  
  return dom;
});
```
