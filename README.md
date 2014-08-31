define
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
<script src="define.js"></script>
<script src="bundle.js"></script>
```

Its API is an unholy act of inspiration from [requireJS sugar syntax][1]

```js
define.root(function (require) {
  var greet = require('greet');
  greet('world');
});

define('greet', function (require) {
  var $ = require('dom');
    
  var greet = function (greeted) {
    $('#content').innerHTML = '<h1>Hello, ' + greeted + '!!</h1>';
  };
  
  return greet;
});

define('dom', function () {
  var dom =  function (selector) {
    return document.querySelector(selector);
  };
  
  return dom;
});
```

In order to have a unique global exposed there is required an entry point:
`define.root`.

The `root` method can be declared everywhere like modules do and can be
declared multiple times allowing multiple entry points and easy debbuging.

[1]: http://requirejs.org/docs/whyamd.html#sugar
