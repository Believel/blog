(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.MyBundle = factory());
}(this, (function () { 'use strict';

  var foo = "Hello World";

  var version = "1.0.0";

  var main = (function () {
    console.log(foo + version);
  });

  return main;

})));
