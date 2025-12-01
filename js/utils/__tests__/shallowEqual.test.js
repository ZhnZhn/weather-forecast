"use strict";

var _shallowEqual = require("../shallowEqual");
const ARR_VALUE = [1],
  OBJ_VALUE = {
    foo: 'bar'
  },
  TEST_CONFIGS = [{
    should: 'return true when the same top level keys have the same top level values, when they are different instances',
    a: {
      foo: true,
      bar: false
    },
    b: {
      foo: true,
      bar: false
    },
    result: true
  }, {
    should: 'return true when top level values of an Object are non-primitives but are the same instance',
    a: {
      value: ARR_VALUE
    },
    b: {
      value: ARR_VALUE
    },
    result: true
  }, {
    should: 'return true when top level values of an Array are non-primitives but are the same instance',
    a: [ARR_VALUE],
    b: [ARR_VALUE],
    result: true
  }, {
    should: 'return true when top level values of an Array are non-primitives but are the same instance',
    a: {
      a: [1]
    },
    b: {
      a: [1]
    },
    result: false
  }, {
    should: 'return false when a has the same keys but different values',
    a: {
      k: 1
    },
    b: {
      k: 2
    },
    result: false
  }, {
    should: 'return false when a has more keys ',
    a: {
      k: 1,
      x: 5
    },
    b: {
      k: 2
    },
    result: false
  }, {
    should: 'return false when b has more keys than a',
    a: {
      k: 1
    },
    b: {
      k: 2,
      x: 3
    },
    result: false
  }, {
    should: 'return false when a contains undefined',
    a: {
      first: undefined
    },
    b: {
      second: 'green'
    },
    result: false
  }, {
    should: 'return true with empty objects',
    a: {},
    b: {},
    result: true
  }, {
    should: 'return true when passing the same instance',
    a: OBJ_VALUE,
    b: OBJ_VALUE,
    result: true
  }, {
    should: 'return false if there are corresponding elements which are not ===',
    a: [OBJ_VALUE, OBJ_VALUE],
    b: [OBJ_VALUE, {
      foo: 'bar'
    }],
    result: false
  }, {
    should: 'return true if all corresponding elements are ===',
    a: [OBJ_VALUE, OBJ_VALUE],
    b: [OBJ_VALUE, OBJ_VALUE],
    result: true
  }];
describe('shallowEqual', () => {
  TEST_CONFIGS.forEach(_ref => {
    let {
      should,
      a,
      b,
      result
    } = _ref;
    it(should, () => {
      expect((0, _shallowEqual.shallowEqual)(a, b)).toBe(result);
    });
  });
});
//# sourceMappingURL=shallowEqual.test.js.map