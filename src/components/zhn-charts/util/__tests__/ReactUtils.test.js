import { render } from '@testing-library/react';

import {
  Bar,
  Line,
  LineChart
} from '../../index';
import {
  filterProps,
  //filterSvgElements,
  findAllByType,
  getDisplayName,
  isChildrenEqual,
  isValidSpreadableProp,
  toArray,
  validateWidthHeight,
  //withoutType,
} from '../ReactUtils';
import {
  //adaptEventHandlers,
  adaptEventsOfChild
} from '../types';

const _crElementKeys = (
  elements
) => elements.map(el => el.key);

describe('ReactUtils', () => {
  describe('filterProps', () => {
    test('should call filterProps wtesth any boolean and return a null result', () => {
      expect(filterProps(true)).toBe(null);
      expect(filterProps(false)).toBe(null);
    });

    test('should call filterProps wtesth a non-object and return null', () => {
      expect(filterProps(125)).toBe(null);
    });

    test('should call filterProps wtesth a react element extract properties and filter out non-svg properties', () => {
      expect(
        filterProps(<input id="test" value={1} />)
      )
      .toEqual({ id: 'test' });
    });

    test('should pass props and filter out non wanted properties', () => {
      expect(
        filterProps({
          test: '1234',
          helloWorld: 1234,
          viewBox: '0 0 0 0',
          dx: 1,
          dy: 1
        }))
      .toEqual({
          dx: 1,
          dy: 1,
      });
    });

    test('should expect viewBox on type "svg"', () => {
      expect(
        filterProps({
          test: '1234',
          helloWorld: 1234,
          viewBox: '0 0 0 0'
        }, false, 'svg'))
      .toEqual({
          viewBox: '0 0 0 0',
      });
    });

    test('should include events when includeEvents is true', () => {
      expect(
        filterProps({
          test: '1234',
          helloWorld: 1234,
          viewBox: '0 0 0 0',
          onClick: jest.fn()
        }, true, 'svg'),
      ).toEqual({
          viewBox: '0 0 0 0',
          onClick: expect.any(Function)
      });
    });

    test('should filter out "points" attribute when included without an svg type that explicitly uses "points"', () => {
      expect(
        filterProps({
          test: '1234',
          points: '1234',
          onClick: jest.fn()
        }, true))
      .toEqual({
          onClick: expect.any(Function)
      });
    });

    test('filterProps return presentation attributes', () => {
      const resultKeys = Object.keys(filterProps({
        stroke: '#000',
        fill: '#000',
        r: 6
      }));

      expect(resultKeys).toContain('stroke');
      expect(resultKeys).toContain('fill');
      expect(resultKeys).toContain('r');
    });
  });

  describe('isValidSpreadableProp', () => {
    test('return true for valid SVG element attribute', () => {
      const isValid = isValidSpreadableProp(42, 'height');
      expect(isValid).toBe(true);
    });

    test('return false for invalid SVG element attribute', () => {
      const isValid = isValidSpreadableProp(42, 'type');
      expect(isValid).toBe(false);
    });

    test('return true for event when includeEvents is true', () => {
      const isValid = isValidSpreadableProp(() => true, 'onClick', true);
      expect(isValid).toBe(true);
    });

    test('return true for valid SVGElementType', () => {
      const isValid = isValidSpreadableProp('00 00 00 00', 'points', false, 'polyline');
      expect(isValid).toBe(true);
    });
  });

  describe('getDisplayName', () => {
    test('getDisplayName return empty string when has a null as input', () => {
      // added never casting to test runtime value
      const result = getDisplayName(null);

      expect(result).toBe('');
    });

    test('getDisplayName return the same string when has a string as input', () => {
      const result = getDisplayName('test');

      expect(result).toBe('test');
    });

    test('getDisplayName return the "Component" when has an object as input', () => {
      const test = {}
      , result = getDisplayName(test);

      expect(result).toBe('Component');
    });
  });

  /*
  describe('adaptEventHandlers', () => {
    test('adaptEventHandlers return event attributes', () => {
      const resultKeys = Object.keys(adaptEventHandlers({
        a: 1,
        onMouseEnter: jest.fn(),
      }));
      expect(resultKeys).toContain('onMouseEnter');
      expect(resultKeys).not.toContain('a');
    });

    test('adaptEventHandlers return null when input is not a react element', () => {
      expect(adaptEventHandlers(null)).toBe(null);
      expect(adaptEventHandlers(jest.fn())).toBe(null);
      expect(adaptEventHandlers(1)).toBe(null);
    });
  });
  */

  describe('adaptEventsOfChild', () => {
    test('adaptEventsOfChild return null when input is not a props', () => {
      expect(adaptEventsOfChild(null, undefined, 0)).toBe(null);
      expect(adaptEventsOfChild(1, undefined, 0)).toBe(null);
    });
  });

  describe('validateWidthHeight', () => {
    test('validateWidthHeight return false when a react element has width or height smaller than 0', () => {
      const { container } = render(
        <LineChart width={0} height={0}>
          <Line dataKey="a" />
          <Bar dataKey="b" />
        </LineChart>,
      );
      expect(validateWidthHeight(container)).toBe(false);
    });

    test('validateWidthHeight return false when input is not a react element', () => {
      expect(validateWidthHeight({ a: 1 })).toBe(false);
      expect(validateWidthHeight(jest.fn())).toBe(false);
    });
  });


  describe('isChildrenEqual', () => {
    test('isChildrenEqual when children has no null children', () => {
      const children = [
        <>
          <Line dataKey="a" />
          <Line dataKey="b" />
          <rect x="0" y="0" width="20" height="20" />
          <text x="0" y="0">
            12
          </text>
        </>,
      ];

      expect(
        isChildrenEqual(children, children)
      ).toBe(true);
    });

    test('isChildrenEqual when children has null children', () => {
      const children = [
        <>
          <Line dataKey="a" />
          <Line dataKey="b" />
          <rect x="0" y="0" width="20" height="20" />
          <text x="0" y="0">
            12
          </text>
          {null}
        </>,
      ];

      expect(
        isChildrenEqual(children, children)
      ).toBe(true);
    });

    test('isChildrenEqual false when children are not equal', () => {
      const childrenOne = [
        <>
          <Line dataKey="a" />
          <Line dataKey="b" />
          <rect x="0" y="0" width="20" height="20" />
          <text x="0" y="0">
            12
          </text>
        </>,
      ];
      const childrenTwo = [
        <>
          <Line dataKey="a" />
          <Line dataKey="b" />
          <rect x="0" y="0" width="20" height="20" />
        </>,
      ];

      expect(
        isChildrenEqual(childrenOne, childrenTwo)
      ).toBe(false);
    });

    test('isChildrenEqual return false when single child are not equal', () => {
      const childrenOne = [<Line dataKey="a" />];
      const childrenTwo = [<Line dataKey="b" />];

      expect(
        isChildrenEqual(childrenOne, childrenTwo)
      ).toBe(false);
    });

    test("isChildrenEqual return false when one has child and another don't has child", () => {
      const childrenOne = [<>{null}</>];
      const childrenTwo = [
        <>
          <Line dataKey="b" />
        </>,
      ];

      expect(
        isChildrenEqual(childrenOne, childrenTwo)
      ).toBe(false);
    });

    test('isChildrenEqual return true when only has a child in an array', () => {
      const childrenOne = [
        <>
          {['A'].map(value => {
            return <Line key={value} dataKey={value} />;
          })}
        </>,
      ];
      const childrenTwo = [
        <>
          {['B'].map(value => {
            return <Line key={value} dataKey={value} />;
          })}
        </>,
      ];

      expect(
        isChildrenEqual(childrenOne, childrenTwo)
      ).toBe(false);
    });
  });

  describe('toArray', () => {
    test('basic', () => {
      const children = [
        <li key="1">1</li>,
        <li key="2">2</li>,
        <li key="3">3</li>
      ]
      , result = toArray(children);

      expect(result.length).toBe(3);
      expect(
        _crElementKeys(result)
      ).toEqual(['1', '2', '3']);
    });

    test('Array', () => {
      const children = [
        <li key="1">1</li>,
        <>{[
           <li key="2">2</li>,
           <li key="3">3</li>
        ]}</>
      ]
      , result = toArray(children);

      expect(result.length).toBe(3);
      expect(
        _crElementKeys(result)
      ).toEqual(['1', '2', '3']);
    });

    test('Ignores `undefined` and `null`', () => {
      const children = [
        <>
          {null}
          <li key="1" />
          {null}
          {undefined}
          <li key="2" />
          {undefined}
          <li key="3" />
        </>,
      ]
      , result = toArray(children);

      expect(result.length).toBe(3);
      expect(
        _crElementKeys(result)
      ).toEqual(['1', '2', '3']);
    });

    test('Iterable', () => {
      const iterable = {
        *[Symbol.iterator]() {
          yield <li key="5">5</li>;
          yield null;
          yield <li key="6">6</li>;
        }
      };

      const children = [
        <>
          {[<li key="1">1</li>]}
          <li key="2">2</li>
          {null}
          {new Set([<li key="3">3</li>, <li key="4">4</li>])}
          {iterable}
        </>,
      ]
      , result = toArray(children);

      expect(result.length).toBe(6);
      expect(
        _crElementKeys(result)
      ).toEqual(['1', '2', '3', '4', '5', '6']);
    });

    test('Fragment', () => {
      const children = [
        <>
          <li key="1">1</li>
          <>
            <li key="2">2</li>
            <li key="3">3</li>
          </>
          <>
            <>
              <li key="4">4</li>
              <li key="5">5</li>
            </>
          </>
        </>,
      ]
      , result = toArray(children);

      expect(result.length).toBe(5);
      expect(
        _crElementKeys(result)
      ).toEqual(['1', '2', '3', '4', '5']);
    });
  });

  describe('findAllByType', () => {
    test('findAllByType returns children that matched the type', () => {
      const children = [
        <div />,
        <Line key="a" />,
        null,
        <Bar dataKey="A" />,
        undefined,
        <Line key="b" />,
        <Line key="c" />,
      ]
      , lineChildren = findAllByType(children, Line);

      expect(lineChildren.length).toBe(3);
      expect(
        _crElementKeys(lineChildren)
      ).toEqual(['a', 'b', 'c']);
    });

    test('findAllByType includes children inside of the fragment', () => {
      const children = [
        <Line key="a" />,
        <div />,
        <>
          <Line key="b" />
          <Line key="c" />
          <Bar dataKey="A" />
          <>
            <Line key="d" />
          </>
        </>,
      ]
      , lineChildren = findAllByType(children, Line);

      expect(lineChildren.length).toBe(4);
      expect(
        _crElementKeys(lineChildren)
      ).toEqual(['a', 'b', 'c', 'd']);
    });
  });
});
