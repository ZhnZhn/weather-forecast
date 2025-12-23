import { render } from '@testing-library/react';

import {
  Bar,
  Line,
  LineChart
} from '../../index';
import {
  findAllByType,
  getDisplayName,
  _toArray,
  validateWidthHeight
} from '../ReactUtils';
import {
  adaptEventsOfChild
} from '../types';

const _crElementKeys = (
  elements
) => elements.map(el => el.key);

describe('ReactUtils', () => {

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

  describe('toArray', () => {
    const fn = _toArray;
    test('basic', () => {
      const children = [
        <li key="1">1</li>,
        <li key="2">2</li>,
        <li key="3">3</li>
      ]
      , result = fn(children);

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
      , result = fn(children);

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
      , result = fn(children);

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
      , result = fn(children);

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
      , result = fn(children);

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
