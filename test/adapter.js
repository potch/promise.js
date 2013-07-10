var promise = require('../promise');

console.log(promise);

exports.fulfilled = function fulfilled(value) {
    var p = promise();
    p.fulfill(value);
    return p;
};

exports.rejected = function rejected(value) {
    var p = promise();
    p.reject(value);
    return p;
};

exports.pending = function pending() {
    return {
        promise: promise(),
        fulfill: function(value) {
            this.promise.fulfill(value);
        },
        reject: function(reason) {
            this.promise.reject(reason);
        }
    }
}
