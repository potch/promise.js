// minipromise
// One can optionally bestow the promise capabilities to any existing object.
function promise(obj) {
    if (!obj) {
        obj = {};
    }

    var pending = true;
    var fulfilled = false;
    var fulfillHandlers = [];
    var rejectHandlers = [];
    var result;

    obj.then = function(onFulfilled, onRejected) {
        var p = promise();

        fulfillHandlers.push([onFulfilled, p]);
        rejectHandlers.push([onRejected, p]);

        setTimeout(function() {
            if (!pending) {
                if (fulfilled) {
                    flushHandlers(fulfillHandlers);
                } else {
                    flushHandlers(rejectHandlers);
                }
            }
        }, 0);
        return p;
    };

    obj.fulfill = function(value) {
        if (pending) {
            result = value;
            pending = false;
            fulfilled = true;

            flushHandlers(fulfillHandlers);
        }
    };

    obj.reject = function(reason) {
        if (pending) {
            result = reason;
            pending = false;

            flushHandlers(rejectHandlers);
        }
    };

    function isPromise(p) {
        return p && ('then' in p && typeof p.then === 'function');
    }

    function flushHandlers(list) {
        while (list.length) {
            var tuple = list.shift();
            var handler = tuple[0];
            var p = tuple[1];
            if (typeof handler === 'function') {
                try {
                    var subResult = handler(result);
                } catch (e) {
                    p.reject(e);
                }
                if (isPromise(subResult)) {
                    subResult.then(p.fulfill, p.reject);
                } else {
                    p.fulfill(subResult);
                }
            } else {
                if (fulfilled) {
                    p.fulfill(result);
                } else {
                    p.reject(result);
                }
            }
        }
    }

    return obj;
}

if (this.define !== undefined && define.amd) {
    define('defer', [], promise);
} else if (module && module.exports !== undefined) {
    module.exports = promise;
}
