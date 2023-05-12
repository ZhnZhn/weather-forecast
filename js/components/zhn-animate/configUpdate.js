"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports["default"] = void 0;
var _extends4 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _util = require("./util");
var alpha = function alpha(begin, end, k) {
  return begin + (end - begin) * k;
};
var needContinue = function needContinue(_ref) {
  var from = _ref.from,
    to = _ref.to;
  return from !== to;
};

/*
 * @description: cal new from value and velocity in each stepper
 * @return: { [styleProperty]: { from, to, velocity } }
 */
var calStepperVals = function calStepperVals(easing, preVals, steps) {
  var nextStepVals = (0, _util.mapObject)(function (key, val) {
    if (needContinue(val)) {
      var _easing = easing(val.from, val.to, val.velocity),
        newX = _easing[0],
        newV = _easing[1];
      return (0, _extends4["default"])({}, val, {
        from: newX,
        velocity: newV
      });
    }
    return val;
  }, preVals);
  if (steps < 1) {
    return (0, _util.mapObject)(function (key, val) {
      if (needContinue(val)) {
        return (0, _extends4["default"])({}, val, {
          velocity: alpha(val.velocity, nextStepVals[key].velocity, steps),
          from: alpha(val.from, nextStepVals[key].from, steps)
        });
      }
      return val;
    }, preVals);
  }
  return calStepperVals(easing, nextStepVals, steps - 1);
};

// configure update function
var _default = function _default(from, to, easing, duration, render) {
  var interKeys = (0, _util.getIntersectionKeys)(from, to);
  var timingStyle = interKeys.reduce(function (res, key) {
    var _extends2;
    return (0, _extends4["default"])({}, res, (_extends2 = {}, _extends2[key] = [from[key], to[key]], _extends2));
  }, {});
  var stepperStyle = interKeys.reduce(function (res, key) {
    var _extends3;
    return (0, _extends4["default"])({}, res, (_extends3 = {}, _extends3[key] = {
      from: from[key],
      velocity: 0,
      to: to[key]
    }, _extends3));
  }, {});
  var cafId = -1,
    preTime,
    beginTime,
    update = function update() {
      return null;
    };
  var getCurrStyle = function getCurrStyle() {
      return (0, _util.mapObject)(function (key, val) {
        return val.from;
      }, stepperStyle);
    },
    shouldStopAnimation = function shouldStopAnimation() {
      return !Object.values(stepperStyle).filter(needContinue).length;
    };

  // stepper timing function like spring
  var stepperUpdate = function stepperUpdate(now) {
    if (!preTime) {
      preTime = now;
    }
    var deltaTime = now - preTime,
      steps = deltaTime / easing.dt;
    stepperStyle = calStepperVals(easing, stepperStyle, steps);
    // get union set and add compatible prefix
    render((0, _extends4["default"])({}, from, to, getCurrStyle(stepperStyle)));
    preTime = now;
    if (!shouldStopAnimation()) {
      cafId = requestAnimationFrame(update);
    }
  };

  // t => val timing function like cubic-bezier
  var timingUpdate = function timingUpdate(now) {
    if (!beginTime) {
      beginTime = now;
    }
    var t = (now - beginTime) / duration;
    var currStyle = (0, _util.mapObject)(function (key, val) {
      return alpha.apply(void 0, val.concat([easing(t)]));
    }, timingStyle);

    // get union set and add compatible prefix
    render((0, _extends4["default"])({}, from, to, currStyle));
    if (t < 1) {
      cafId = requestAnimationFrame(update);
    } else {
      var finalStyle = (0, _util.mapObject)(function (key, val) {
        return alpha.apply(void 0, val.concat([easing(1)]));
      }, timingStyle);
      render((0, _extends4["default"])({}, from, to, finalStyle));
    }
  };
  update = easing.isStepper ? stepperUpdate : timingUpdate;

  // return start animation method
  return function () {
    requestAnimationFrame(update);

    // return stop animation method
    return function () {
      cancelAnimationFrame(cafId);
    };
  };
};
exports["default"] = _default;
//# sourceMappingURL=configUpdate.js.map