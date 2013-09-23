# promise.js

[<img align="right" alt="Promises/A+ 1.0 compliant" src="http://promisesaplus.com/assets/logo-small.png">](http://promisesaplus.com/)

A Minimal, fully Promises/A+ compliant library.

Promises/A+ spec here: http://promisesaplus.com/

[![Build Status](https://travis-ci.org/potch/promise.js.png)](https://travis-ci.org/potch/promise.js)

# Usage

* `promise()` - Creates a promise. Can pass an optional `obj` argument. If passed, promise methods are attached to passed object.
* `promise.isPromise(obj)` - Uses duck-typing to check whether the given object is a 'promise' (does it have a `then` method?)
* `promise.avow(fn)` - wrap a function in a promise. Usage:

```js
var add = promise.avow(function (fulfill, reject, a, b) {
  if (a <= 2 && b <=2) {
    fulfill(a + b);
  } else {
    reject('Math is hard.');
  }
});
add(1, 1).then(console.log);
```

## Promise Methods

* `then(onFulfill, onReject)` - bind fulfillment/rejection handlers to the promise. Returns a promise object
* `fulfill(value)` - fulfills the promise with the passed value.
* `reject(reason)` - rejects the promise with the passed reason.

For all behaviors, see the [spec](http://promisesaplus.com/ "Promises/A+ Specification").
