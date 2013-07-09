# promise.js

A Minimal, fully Promises/A+ compliant library.

Promises/A+ spec here: http://promisesaplus.com/

# Usage

* `promise()` - Created a promise. Can pass an optional `obj` argument. If passed, promise methods are attached to passed object.

## Promise Methods

* `then(onFulfill, onReject)` - bind fulfillment/rejection handlers to the promise. Returns a promise object
* `fulfill(value)` - fulfills the promise with the passed value.
* `reject(reason)` - rejects the promise with the passed reason.

For all behaviors, see the [spec](http://promisesaplus.com/ "Promises/A+ Specification").
