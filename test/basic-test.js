// division-by-zero-test.js

var vows = require('vows'),
    construe = require('construe'),
    assert = require('assert');

// Create a Test Suite
vows.describe('Describing').addBatch({
    'when running function with 1 argument': {
        topic: function () {
            return construe({});
        },
        'we got TypeError': function (topic) {
            assert.instanceOf(topic, TypeError);
        }
    },
    'when running function with more then 3 arguments': {
        topic: function () {
            return construe({}, 'aaa', {}, 33);
        },
        'we got TypeError': function (topic) {
            assert.instanceOf(topic, TypeError);
        }
    },
    'when creating with no descriptor': {
        topic: function () {
            return construe({test: 'test'}, {});
        },
        'return type is the given object': function (topic) {
            assert.isObject(topic);
            assert.include(topic, 'test');
        }
    }
}).export(module);