"use strict";
/**
 * Promise example
 * Create a Promise and check it's features
 */
function createPromise(resolveSeconds, rejectSeconds) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () { return resolve('promise is resolved'); }, resolveSeconds * 1e3);
        setTimeout(function () { return reject('promise is rejected'); }, rejectSeconds * 1e3);
    });
}
console.log(createPromise(1, 2));
/**
 * Output:
 Promise { <pending> }
 */
createPromise(1, 2)
    .then(function (value) { return console.log('then is called when ', value); })
    .catch(function (value) { return console.log('catch is called when ', value); })
    .finally(function () { return console.log('finally is called always'); });
/**
 * Output:
then is called when  promise is resolved
finally is called always
 */
createPromise(3, 2)
    .then(function (value) { return console.log('then is called when ', value); })
    .catch(function (value) { return console.log('catch is called when ', value); })
    .finally(function () { return console.log('finally is called always'); });
/**
 * Output:
catch is called when  promise is rejected
finally is called always
 */
createPromise(1, 2)
    .then(function (value) { return (console.log('then is called when ', value), 'first then return value'); })
    .then(function (value) { return console.log('second then is called with', value); })
    .catch(function (value) { return console.log('catch is called when ', value); })
    .finally(function () { return console.log('finally is called always'); });
/**
 * Output:
then is called when  promise is resolved
second then is called with first then return value
finally is called always
 */
/**
 * Notes:
 * `promise.then` returns a promise and it can be chained with `then`, `catch` and `finally`
 * `promise.catch` returns a promise and it can be chanied with `then`, `catch` and `finally`
 * `promise.finally` returns a promise and it can be chanied with `then`, `catch` and `finally`
 */
