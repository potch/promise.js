# promise.js

[<img align="right" alt="Promises/A+ 1.0 compliant" src="http://promisesaplus.com/assets/logo-small.png">](http://promisesaplus.com/)

A Minimal, fully Promises/A+ compliant library.

Promises/A+ spec here: http://promisesaplus.com/

[![Build Status](https://travis-ci.org/potch/promise.js.png)](https://travis-ci.org/potch/promise.js)

# Usage

* `promise()` - Created a promise. Can pass an optional `obj` argument. If passed, promise methods are attached to passed object.

## Promise Methods

* `then(onFulfill, onReject)` - bind fulfillment/rejection handlers to the promise. Returns a promise object
* `fulfill(value)` - fulfills the promise with the passed value.
* `reject(reason)` - rejects the promise with the passed reason.

For all behaviors, see the [spec](http://promisesaplus.com/ "Promises/A+ Specification").
