// division-by-zero-test.js

var vows = require('vows'),
  construe = require('construe'),
  assert = require('assert');

// Create a Test Suite
vows.describe('Describing').addBatch({
  'when running function with no argument': {
    topic: function () {
      return construe();
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
  },
  'simple bindings': {
    topic: function () {
      return {
        obj1: construe({
          variable: {
            bindable: true,
            value: 0
          }
        }),
        obj2: construe({
          variable: {
            bindable: true,
            value: 0
          }
        })
      };
    },
    'one way bindings should work': function (topic) {
      construe.bind(topic.obj1, 'variable', topic.obj2, 'variable');
      topic.obj2.variable = 1;

      assert.equal(topic.obj1.variable, 1);
    },
    'two way bindings should work': function (topic) {
      construe.bind2Way(topic.obj1, 'variable', topic.obj2, 'variable');

      topic.obj1.variable = 1;
      assert.equal(topic.obj2.variable, 1);

      topic.obj2.variable = 2;
      assert.equal(topic.obj1.variable, 2);
    }
  },
  'bindings with getters and setters': {
    topic: function () {
      return {
        obj1: construe({
          variable: {
            bindable: true,
            get: function () {
              return this.test;
            },
            set: function (value) {
              this.test = value;
            }
          }
        }),
        obj2: construe({
          variable: {
            bindable: true,
            get: function () {
              return this.test;
            },
            set: function (value) {
              this.test = value;
            }
          }
        })
      }
    },
    'one way bindings should work': function (topic) {
      construe.bind(topic.obj1, 'variable', topic.obj2, 'variable');
      topic.obj2.variable = 1;
      assert.equal(topic.obj2.test, 1);
      assert.equal(topic.obj1.variable, 1);
      assert.equal(topic.obj1.test, 1);
    },
    'two way bindings should work': function (topic) {
      construe.bind2Way(topic.obj1, 'variable', topic.obj2, 'variable');
      topic.obj2.variable = 1;
      assert.equal(topic.obj2.test, 1);
      assert.equal(topic.obj1.variable, 1);
      assert.equal(topic.obj1.test, 1);

      topic.obj1.variable = 1;
      assert.equal(topic.obj1.test, 1);
      assert.equal(topic.obj2.variable, 1);
      assert.equal(topic.obj2.test, 1);
    }
  },
  'bind descriptor': {
    topic: function () {
      var obj1 = construe({
        variable: {
          bindable: true
        }
      });

      var obj2 = construe({
        variable: {
          bind: [obj1, 'variable']
        }
      });

      return {
        obj1: obj1,
        obj2: obj2
      }
    },
    'works with no errors': function (topic) {
      topic.obj1.variable = 1;
      assert.equal(topic.obj2.variable, 1);
    }
  },
  'bind descriptor with setters and getters': {
    topic: function () {
      var obj1 = construe({
        variable: {
          bindable: true,
          set: function (value) {
            this.test = value;
          },
          get: function () {
            return this.test;
          }
        }
      });

      var obj2 = construe({
        variable: {
          bind: [obj1, 'variable'],
          set: function (value) {
            this.test = value;
          },
          get: function () {
            return this.test;
          }
        }
      });

      return {
        obj1: obj1,
        obj2: obj2
      }
    },
    'works with no errors': function (topic) {
      topic.obj1.variable = 1;
      assert.equal(topic.obj1.test, 1);
      assert.equal(topic.obj2.variable, 1);
      assert.equal(topic.obj2.test, 1);
    }
  },
  'bind2Way descriptor': {
    topic: function () {
      var obj1 = construe({
        variable: {
          bindable: true
        }
      });
      var obj2 = construe({
        variable: {
          bind2Way: [obj1, 'variable']
        }
      });
      return {
        obj1: obj1,
        obj2: obj2
      };
    },
    'works 2 way': function (topic) {
      topic.obj1.variable = 1;
      assert.equal(topic.obj2.variable, 1);

      topic.obj2.variable = 2;
      assert.equal(topic.obj1.variable, 2);
    }
  },
  'bind2Way descriptor with setters and getters': {
    topic: function () {
      var obj1 = construe({
        variable: {
          bindable: true,
          set: function (value) {
              this.test = value;
          },
          get: function () {
              return this.test;
          }
        }
      });
      var obj2 = construe({
        variable: {
          bind2Way: [obj1, 'variable'],
          set: function (value) {
            this.test = value;
          },
          get: function () {
              return this.test;
          }
        }
      });
      return {
        obj1: obj1,
        obj2: obj2
      };
    },
    'works 2 way': function (topic) {
      topic.obj1.variable = 1;
      assert.equal(topic.obj2.variable, 1);
      assert.equal(topic.obj1.test, 1);
      assert.equal(topic.obj2.test, 1);

      topic.obj2.variable = 2;
      assert.equal(topic.obj1.variable, 2);
      assert.equal(topic.obj1.test, 2);
      assert.equal(topic.obj2.test, 2);
    }
  }

}).export(module);