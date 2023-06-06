"use strict";

var _d3Path = require("../d3Path");
var _asserts = require("./asserts.test");
it("path is an instanceof path", function () {
  var p = (0, _d3Path.path)();
  expect(p instanceof _d3Path.path).toBe(true);
  (0, _asserts.assertPathEqual)(p, "");
});
it("path.moveTo(x, y) appends an M command", function () {
  var p = (0, _d3Path.path)();
  p.moveTo(150, 50);
  (0, _asserts.assertPathEqual)(p, "M150,50");
  p.lineTo(200, 100);
  (0, _asserts.assertPathEqual)(p, "M150,50L200,100");
  p.moveTo(100, 50);
  (0, _asserts.assertPathEqual)(p, "M150,50L200,100M100,50");
});
it("path.closePath() appends a Z command", function () {
  var p = (0, _d3Path.path)();
  p.moveTo(150, 50);
  (0, _asserts.assertPathEqual)(p, "M150,50");
  p.closePath();
  (0, _asserts.assertPathEqual)(p, "M150,50Z");
  p.closePath();
  (0, _asserts.assertPathEqual)(p, "M150,50ZZ");
});
it("path.closePath() does nothing if the path is empty", function () {
  var p = (0, _d3Path.path)();
  (0, _asserts.assertPathEqual)(p, "");
  p.closePath();
  (0, _asserts.assertPathEqual)(p, "");
});
it("path.lineTo(x, y) appends an L command", function () {
  var p = (0, _d3Path.path)();
  p.moveTo(150, 50);
  (0, _asserts.assertPathEqual)(p, "M150,50");
  p.lineTo(200, 100);
  (0, _asserts.assertPathEqual)(p, "M150,50L200,100");
  p.lineTo(100, 50);
  (0, _asserts.assertPathEqual)(p, "M150,50L200,100L100,50");
});
it("path.quadraticCurveTo(x1, y1, x, y) appends a Q command", function () {
  var p = (0, _d3Path.path)();
  p.moveTo(150, 50);
  (0, _asserts.assertPathEqual)(p, "M150,50");
  p.quadraticCurveTo(100, 50, 200, 100);
  (0, _asserts.assertPathEqual)(p, "M150,50Q100,50,200,100");
});
it("path.bezierCurveTo(x1, y1, x, y) appends a C command", function () {
  var p = (0, _d3Path.path)();
  p.moveTo(150, 50);
  (0, _asserts.assertPathEqual)(p, "M150,50");
  p.bezierCurveTo(100, 50, 0, 24, 200, 100);
  (0, _asserts.assertPathEqual)(p, "M150,50C100,50,0,24,200,100");
});
it("path.arc(x, y, radius, startAngle, endAngle) throws an error if the radius is negative", function () {
  var p = (0, _d3Path.path)();
  p.moveTo(150, 100);
  expect(function () {
    p.arc(100, 100, -50, 0, Math.PI / 2);
  }).toThrow(/negative radius/);
});
it("path.arc(x, y, radius, startAngle, endAngle) may append only an M command if the radius is zero", function () {
  var p = (0, _d3Path.path)();
  p.arc(100, 100, 0, 0, Math.PI / 2);
  (0, _asserts.assertPathEqual)(p, "M100,100");
});
it("path.arc(x, y, radius, startAngle, endAngle) may append only an L command if the radius is zero", function () {
  var p = (0, _d3Path.path)();
  p.moveTo(0, 0);
  p.arc(100, 100, 0, 0, Math.PI / 2);
  (0, _asserts.assertPathEqual)(p, "M0,0L100,100");
});
it("path.arc(x, y, radius, startAngle, endAngle) may append only an M command if the angle is zero", function () {
  var p = (0, _d3Path.path)();
  p.arc(100, 100, 0, 0, 0);
  (0, _asserts.assertPathEqual)(p, "M100,100");
});
it("path.arc(x, y, radius, startAngle, endAngle) may append only an M command if the angle is near zero", function () {
  var p = (0, _d3Path.path)();
  p.arc(100, 100, 0, 0, 1e-16);
  (0, _asserts.assertPathEqual)(p, "M100,100");
});
it("path.arc(x, y, radius, startAngle, endAngle) may append an M command if the path was empty", function () {
  var p1 = (0, _d3Path.path)();
  p1.arc(100, 100, 50, 0, Math.PI * 2);
  (0, _asserts.assertPathEqual)(p1, "M150,100A50,50,0,1,1,50,100A50,50,0,1,1,150,100");
  var p2 = (0, _d3Path.path)();
  p2.arc(0, 50, 50, -Math.PI / 2, 0);
  (0, _asserts.assertPathEqual)(p2, "M0,0A50,50,0,0,1,50,50");
});
it("path.arc(x, y, radius, startAngle, endAngle) may append an L command if the arc doesn’t start at the current point", function () {
  var p = (0, _d3Path.path)();
  p.moveTo(100, 100);
  p.arc(100, 100, 50, 0, Math.PI * 2);
  (0, _asserts.assertPathEqual)(p, "M100,100L150,100A50,50,0,1,1,50,100A50,50,0,1,1,150,100");
});
it("path.arc(x, y, radius, startAngle, endAngle) appends a single A command if the angle is less than π", function () {
  var p = (0, _d3Path.path)();
  p.moveTo(150, 100);
  p.arc(100, 100, 50, 0, Math.PI / 2);
  (0, _asserts.assertPathEqual)(p, "M150,100A50,50,0,0,1,100,150");
});
it("path.arc(x, y, radius, startAngle, endAngle) appends a single A command if the angle is less than τ", function () {
  var p = (0, _d3Path.path)();
  p.moveTo(150, 100);
  p.arc(100, 100, 50, 0, Math.PI * 1);
  (0, _asserts.assertPathEqual)(p, "M150,100A50,50,0,1,1,50,100");
});
it("path.arc(x, y, radius, startAngle, endAngle) appends two A commands if the angle is greater than τ", function () {
  var p = (0, _d3Path.path)();
  p.moveTo(150, 100);
  p.arc(100, 100, 50, 0, Math.PI * 2);
  (0, _asserts.assertPathEqual)(p, "M150,100A50,50,0,1,1,50,100A50,50,0,1,1,150,100");
});
it("path.arc(x, y, radius, 0, π/2, false) draws a small clockwise arc", function () {
  var p = (0, _d3Path.path)();
  p.moveTo(150, 100);
  p.arc(100, 100, 50, 0, Math.PI / 2, false);
  (0, _asserts.assertPathEqual)(p, "M150,100A50,50,0,0,1,100,150");
});
it("path.arc(x, y, radius, -π/2, 0, false) draws a small clockwise arc", function () {
  var p = (0, _d3Path.path)();
  p.moveTo(100, 50);
  p.arc(100, 100, 50, -Math.PI / 2, 0, false);
  (0, _asserts.assertPathEqual)(p, "M100,50A50,50,0,0,1,150,100");
});
it("path.arc(x, y, radius, 0, ε, true) draws an anticlockwise circle", function () {
  var p = (0, _d3Path.path)();
  p.moveTo(150, 100);
  p.arc(100, 100, 50, 0, 1e-16, true);
  (0, _asserts.assertPathEqual)(p, "M150,100A50,50,0,1,0,50,100A50,50,0,1,0,150,100");
});
it("path.arc(x, y, radius, 0, ε, false) draws nothing", function () {
  var p = (0, _d3Path.path)();
  p.moveTo(150, 100);
  p.arc(100, 100, 50, 0, 1e-16, false);
  (0, _asserts.assertPathEqual)(p, "M150,100");
});
it("path.arc(x, y, radius, 0, -ε, true) draws nothing", function () {
  var p = (0, _d3Path.path)();
  p.moveTo(150, 100);
  p.arc(100, 100, 50, 0, -1e-16, true);
  (0, _asserts.assertPathEqual)(p, "M150,100");
});
it("path.arc(x, y, radius, 0, -ε, false) draws a clockwise circle", function () {
  var p = (0, _d3Path.path)();
  p.moveTo(150, 100);
  p.arc(100, 100, 50, 0, -1e-16, false);
  (0, _asserts.assertPathEqual)(p, "M150,100A50,50,0,1,1,50,100A50,50,0,1,1,150,100");
});
it("path.arc(x, y, radius, 0, τ, true) draws an anticlockwise circle", function () {
  var p = (0, _d3Path.path)();
  p.moveTo(150, 100);
  p.arc(100, 100, 50, 0, 2 * Math.PI, true);
  (0, _asserts.assertPathEqual)(p, "M150,100A50,50,0,1,0,50,100A50,50,0,1,0,150,100");
});
it("path.arc(x, y, radius, 0, τ, false) draws a clockwise circle", function () {
  var p = (0, _d3Path.path)();
  p.moveTo(150, 100);
  p.arc(100, 100, 50, 0, 2 * Math.PI, false);
  (0, _asserts.assertPathEqual)(p, "M150,100A50,50,0,1,1,50,100A50,50,0,1,1,150,100");
});
it("path.arc(x, y, radius, 0, τ + ε, true) draws an anticlockwise circle", function () {
  var p = (0, _d3Path.path)();
  p.moveTo(150, 100);
  p.arc(100, 100, 50, 0, 2 * Math.PI + 1e-13, true);
  (0, _asserts.assertPathEqual)(p, "M150,100A50,50,0,1,0,50,100A50,50,0,1,0,150,100");
});
it("path.arc(x, y, radius, 0, τ - ε, false) draws a clockwise circle", function () {
  var p = (0, _d3Path.path)();
  p.moveTo(150, 100);
  p.arc(100, 100, 50, 0, 2 * Math.PI - 1e-13, false);
  (0, _asserts.assertPathEqual)(p, "M150,100A50,50,0,1,1,50,100A50,50,0,1,1,150,100");
});
it("path.arc(x, y, radius, τ, 0, true) draws an anticlockwise circle", function () {
  var p = (0, _d3Path.path)();
  p.moveTo(150, 100);
  p.arc(100, 100, 50, 0, 2 * Math.PI, true);
  (0, _asserts.assertPathEqual)(p, "M150,100A50,50,0,1,0,50,100A50,50,0,1,0,150,100");
});
it("path.arc(x, y, radius, τ, 0, false) draws a clockwise circle", function () {
  var p = (0, _d3Path.path)();
  p.moveTo(150, 100);
  p.arc(100, 100, 50, 0, 2 * Math.PI, false);
  (0, _asserts.assertPathEqual)(p, "M150,100A50,50,0,1,1,50,100A50,50,0,1,1,150,100");
});
it("path.arc(x, y, radius, 0, 13π/2, false) draws a clockwise circle", function () {
  var p = (0, _d3Path.path)();
  p.moveTo(150, 100);
  p.arc(100, 100, 50, 0, 13 * Math.PI / 2, false);
  (0, _asserts.assertPathEqual)(p, "M150,100A50,50,0,1,1,50,100A50,50,0,1,1,150,100");
});
it("path.arc(x, y, radius, 13π/2, 0, false) draws a big clockwise arc", function () {
  var p = (0, _d3Path.path)();
  p.moveTo(100, 150);
  p.arc(100, 100, 50, 13 * Math.PI / 2, 0, false);
  (0, _asserts.assertPathEqual)(p, "M100,150A50,50,0,1,1,150,100");
});
it("path.arc(x, y, radius, π/2, 0, false) draws a big clockwise arc", function () {
  var p = (0, _d3Path.path)();
  p.moveTo(100, 150);
  p.arc(100, 100, 50, Math.PI / 2, 0, false);
  (0, _asserts.assertPathEqual)(p, "M100,150A50,50,0,1,1,150,100");
});
it("path.arc(x, y, radius, 3π/2, 0, false) draws a small clockwise arc", function () {
  var p = (0, _d3Path.path)();
  p.moveTo(100, 50);
  p.arc(100, 100, 50, 3 * Math.PI / 2, 0, false);
  (0, _asserts.assertPathEqual)(p, "M100,50A50,50,0,0,1,150,100");
});
it("path.arc(x, y, radius, 15π/2, 0, false) draws a small clockwise arc", function () {
  var p = (0, _d3Path.path)();
  p.moveTo(100, 50);
  p.arc(100, 100, 50, 15 * Math.PI / 2, 0, false);
  (0, _asserts.assertPathEqual)(p, "M100,50A50,50,0,0,1,150,100");
});
it("path.arc(x, y, radius, 0, π/2, true) draws a big anticlockwise arc", function () {
  var p = (0, _d3Path.path)();
  p.moveTo(150, 100);
  p.arc(100, 100, 50, 0, Math.PI / 2, true);
  (0, _asserts.assertPathEqual)(p, "M150,100A50,50,0,1,0,100,150");
});
it("path.arc(x, y, radius, -π/2, 0, true) draws a big anticlockwise arc", function () {
  var p = (0, _d3Path.path)();
  p.moveTo(100, 50);
  p.arc(100, 100, 50, -Math.PI / 2, 0, true);
  (0, _asserts.assertPathEqual)(p, "M100,50A50,50,0,1,0,150,100");
});
it("path.arc(x, y, radius, -13π/2, 0, true) draws a big anticlockwise arc", function () {
  var p = (0, _d3Path.path)();
  p.moveTo(100, 50);
  p.arc(100, 100, 50, -13 * Math.PI / 2, 0, true);
  (0, _asserts.assertPathEqual)(p, "M100,50A50,50,0,1,0,150,100");
});
it("path.arc(x, y, radius, -13π/2, 0, false) draws a big clockwise arc", function () {
  var p = (0, _d3Path.path)();
  p.moveTo(150, 100);
  p.arc(100, 100, 50, 0, -13 * Math.PI / 2, false);
  (0, _asserts.assertPathEqual)(p, "M150,100A50,50,0,1,1,100,50");
});
it("path.arc(x, y, radius, 0, 13π/2, true) draws a big anticlockwise arc", function () {
  var p = (0, _d3Path.path)();
  p.moveTo(150, 100);
  p.arc(100, 100, 50, 0, 13 * Math.PI / 2, true);
  (0, _asserts.assertPathEqual)(p, "M150,100A50,50,0,1,0,100,150");
});
it("path.arc(x, y, radius, π/2, 0, true) draws a small anticlockwise arc", function () {
  var p = (0, _d3Path.path)();
  p.moveTo(100, 150);
  p.arc(100, 100, 50, Math.PI / 2, 0, true);
  (0, _asserts.assertPathEqual)(p, "M100,150A50,50,0,0,0,150,100");
});
it("path.arc(x, y, radius, 3π/2, 0, true) draws a big anticlockwise arc", function () {
  var p = (0, _d3Path.path)();
  p.moveTo(100, 50);
  p.arc(100, 100, 50, 3 * Math.PI / 2, 0, true);
  (0, _asserts.assertPathEqual)(p, "M100,50A50,50,0,1,0,150,100");
});
it("path.arc(x, y, radius, π/2, 0, truthy) draws a small anticlockwise arc", function () {
  for (var _i = 0, _arr = [1, "1", true, 10, "3", "string"]; _i < _arr.length; _i++) {
    var trueish = _arr[_i];
    var p = (0, _d3Path.path)();
    p.moveTo(100, 150);
    p.arc(100, 100, 50, Math.PI / 2, 0, trueish);
    (0, _asserts.assertPathEqual)(p, "M100,150A50,50,0,0,0,150,100");
  }
});
it("path.arc(x, y, radius, 0, π/2, falsy) draws a small clockwise arc", function () {
  for (var _i2 = 0, _arr2 = [0, null, undefined]; _i2 < _arr2.length; _i2++) {
    var falseish = _arr2[_i2];
    var p = (0, _d3Path.path)();
    p.moveTo(150, 100);
    p.arc(100, 100, 50, 0, Math.PI / 2, falseish);
    (0, _asserts.assertPathEqual)(p, "M150,100A50,50,0,0,1,100,150");
  }
});
it("path.arcTo(x1, y1, x2, y2, radius) throws an error if the radius is negative", function () {
  var p = (0, _d3Path.path)();
  p.moveTo(150, 100);
  expect(function () {
    p.arcTo(270, 39, 163, 100, -53);
  }).toThrow(/negative radius/);
});
it("path.arcTo(x1, y1, x2, y2, radius) appends an M command if the path was empty", function () {
  var p = (0, _d3Path.path)();
  p.arcTo(270, 39, 163, 100, 53);
  (0, _asserts.assertPathEqual)(p, "M270,39");
});
it("path.arcTo(x1, y1, x2, y2, radius) does nothing if the previous point was ⟨x1,y1⟩", function () {
  var p = (0, _d3Path.path)();
  p.moveTo(270, 39);
  p.arcTo(270, 39, 163, 100, 53);
  (0, _asserts.assertPathEqual)(p, "M270,39");
});
it("path.arcTo(x1, y1, x2, y2, radius) appends an L command if the previous point, ⟨x1,y1⟩ and ⟨x2,y2⟩ are collinear", function () {
  var p = (0, _d3Path.path)();
  p.moveTo(100, 50);
  p.arcTo(101, 51, 102, 52, 10);
  (0, _asserts.assertPathEqual)(p, "M100,50L101,51");
});
it("path.arcTo(x1, y1, x2, y2, radius) appends an L command if ⟨x1,y1⟩ and ⟨x2,y2⟩ are coincident", function () {
  var p = (0, _d3Path.path)();
  p.moveTo(100, 50);
  p.arcTo(101, 51, 101, 51, 10);
  (0, _asserts.assertPathEqual)(p, "M100,50L101,51");
});
it("path.arcTo(x1, y1, x2, y2, radius) appends an L command if the radius is zero", function () {
  var p = (0, _d3Path.path)();
  p.moveTo(270, 182);
  p.arcTo(270, 39, 163, 100, 0);
  (0, _asserts.assertPathEqual)(p, "M270,182L270,39");
});
it("path.arcTo(x1, y1, x2, y2, radius) appends L and A commands if the arc does not start at the current point", function () {
  var p1 = (0, _d3Path.path)();
  p1.moveTo(270, 182);
  p1.arcTo(270, 39, 163, 100, 53);
  (0, _asserts.assertPathEqual)(p1, "M270,182L270,130.222686A53,53,0,0,0,190.750991,84.179342");
  var p2 = (0, _d3Path.path)();
  p2.moveTo(270, 182);
  p2.arcTo(270, 39, 363, 100, 53);
  (0, _asserts.assertPathEqual)(p2, "M270,182L270,137.147168A53,53,0,0,1,352.068382,92.829799");
});
it("path.arcTo(x1, y1, x2, y2, radius) appends only an A command if the arc starts at the current point", function () {
  var p = (0, _d3Path.path)();
  p.moveTo(100, 100);
  p.arcTo(200, 100, 200, 200, 100);
  (0, _asserts.assertPathEqual)(p, "M100,100A100,100,0,0,1,200,200");
});
it("path.arcTo(x1, y1, x2, y2, radius) sets the last point to be the end tangent of the arc", function () {
  var p = (0, _d3Path.path)();
  p.moveTo(100, 100);
  p.arcTo(200, 100, 200, 200, 50);
  p.arc(150, 150, 50, 0, Math.PI);
  (0, _asserts.assertPathEqual)(p, "M100,100L150,100A50,50,0,0,1,200,150A50,50,0,1,1,100,150");
});
it("path.rect(x, y, w, h) appends M, h, v, h, and Z commands", function () {
  var p = (0, _d3Path.path)();
  p.moveTo(150, 100);
  p.rect(100, 200, 50, 25);
  (0, _asserts.assertPathEqual)(p, "M150,100M100,200h50v25h-50Z");
});
//# sourceMappingURL=d3Path.test.js.map