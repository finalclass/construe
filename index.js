/**
 * @license MIT
 */
(function () {
    'use strict';

    var construe = function (obj) {
        if (arguments.length === 2) {
            return construe.defineProperties(obj, arguments[1]);
        }

        if (arguments.length === 3) {
            return construe.defineProperty(obj, arguments[1], arguments[2]);
        }

        throw new TypeError('Expected 2 or 3 arguments got', arguments.length);
    };

    construe.defineProperties = function (obj, descriptorsHash) {
        Object.keys(descriptorsHash).forEach(function (key) {
            construe.defineProperty(obj, key, descriptorsHash[key]);
        });
        return obj;
    };

    construe.defineProperty = function (obj, propertyName, dirtyDescriptor) {
        var pure = {};

        if (dirtyDescriptor.method instanceof Function) {
            pure.value = dirtyDescriptor.method.bind(obj);
        } else {
            pure = dirtyDescriptor;
        }

        Object.defineProperty(obj, propertyName, pure);
        return obj;
    };

    // -----------------------------------------
    // Export
    // -----------------------------------------
    if (typeof window === 'undefined') {
        construe.expressRoute = require('./express-route.js');
        module.exports = construe;
    } else {
        window.construe = construe;
    }
}());