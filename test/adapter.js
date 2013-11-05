var Promise = require('../promise');

exports.deferred = function deferred() {
    var o = {};
    o.promise = new Promise(function(resolve, reject) {
        o.resolve = resolve;
        o.reject = reject;
    });
    return o;
}
