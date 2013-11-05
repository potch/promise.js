var Promise = (function() {

    function Promise(fn) {
        if (typeof fn !== 'function') {
            throw "Expected a function as first argument."
        }

        var pending = true;
        var resolved = false;
        var resolveHandlers = [];
        var rejectHandlers = [];
        var result;
        var self = this;

        function then(onResolved, onRejected) {
            var o = {};
            o.promise = new Promise(function (resolve, reject){
                o.resolve = resolve;
                o.reject = reject;

                resolveHandlers.push([onResolved, o]);
                rejectHandlers.push([onRejected, o]);

                setTimeout(function () {
                    if (!pending) {
                        if (resolved) {
                            flushHandlers(resolveHandlers);
                        } else {
                            flushHandlers(rejectHandlers);
                        }
                    }
                }, 0);
            });
            return o.promise;
        };

        function resolve(value) {
            if (pending) {
                if (value === self) {
                    reject(new TypeError('a Promise can not be resolved with itself'));
                }
                if (isPromise(value)) {
                    console.log('x was promise');
                    value.then(resolve, reject);
                } else {
                    console.dir(value);
                    if (typeof value === 'object' ||
                        typeof value === 'function') {
                        console.log('x is oof ' + typeof value);
                        try {
                            if ('then' in value && typeof value.then === 'function') {
                                console.log('x is thenable');
                                value.then(resolve, reject);
                            } else {
                                console.log('x is not thenable');
                                _resolve(value);
                            }
                        } catch (e) {
                            console.log('there was an error with x');
                            reject(e);
                        }
                    } else {
                        console.log('x is ' + typeof value);
                        _resolve(value);
                    }
                }
            }
        };

        function _resolve(value) {
            result = value;
            pending = false;
            resolved = true;

            setTimeout(function () {
                flushHandlers(resolveHandlers);
            }, 0);
        }

        function reject(reason) {
            if (pending) {
                result = reason;
                pending = false;

                setTimeout(function () {
                    flushHandlers(rejectHandlers);
                }, 0);
            }
        };

        function flushHandlers(list) {
            while (list.length) {
                var tuple = list.shift();
                var handler = tuple[0];
                var o = tuple[1];
                if (typeof handler === 'function') {
                    try {
                        var subResult = handler(result);
                    } catch (e) {
                        o.reject(e);
                    }
                    if (subResult === o.promise) {
                        o.reject(new TypeError());
                    }
                    if (isPromise(subResult)) {
                        subResult.then(o.resolve, o.reject);
                    } else {
                        if (typeof subResult !== 'undefined') {
                            o.resolve(subResult);
                        }
                    }
                } else {
                    if (resolved) {
                        o.resolve(result);
                    } else {
                        o.reject(result);
                    }
                }
            }
        }

        this.then = then;

        fn(resolve, reject);
    }

    function isPromise(p) {
        return p instanceof Promise;
    }

    if (this.define !== undefined && define.amd) {
        define('promise', [], Promise);
    } else if (typeof module !== 'undefined' && module.exports !== undefined) {
        module.exports = Promise;
    }

    return Promise;
})();

