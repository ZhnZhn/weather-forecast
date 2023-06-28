"use strict";

var _index = require("../index");
describe('translateStyle', () => {
  const fn = _index.translateStyle;
  test('should get browsers compatible style', () => {
    const style = {
      transform: 'translateY(20px)',
      transition: 'transform .4s ease',
      transformOrigin: '50%'
    };
    const translatedStyle = fn(style);
    expect(translatedStyle.WebkitTransform).toEqual('translateY(20px)');
    expect(translatedStyle.WebkitTransition).toEqual('-webkit-transform .4s ease');
    expect(translatedStyle.WebkitTransformOrigin).toEqual('50%');
  });
});
//# sourceMappingURL=translateStyle.test.js.map