import {
  render,
  waitFor
} from '@testing-library/react';

import { Animate } from '../index';

describe('Animate', () => {
  test('should change the style of children from to value by attributeName and duration', () => {
    const { container } = render(
      <Animate
        from="1" to="0"
        attributeName="opacity"
        duration={500}
      >
        <div className="test-wrapper" />
      </Animate>
    );

    const element = container.getElementsByClassName('test-wrapper')[0];
    expect(element.style.opacity).toBe('1')
    return waitFor(() => {
      expect(element.style.opacity).toBe('0')
    }, { timeout: 700 })
  });

  test('should called onAnimationEnd', async () => {
    const handleAnimationEnd = jest.fn()

    render(
      <Animate
        from="1"
        to="0"
        attributeName="opacity"
        duration={500}
        onAnimationEnd={handleAnimationEnd}
      >
        <div />
      </Animate>
    );

    expect(handleAnimationEnd).toHaveBeenCalledTimes(0)

    await waitFor(() => {
      expect(handleAnimationEnd).toHaveBeenCalledTimes(1)
    }, { timeout: 900 })
  });

  test('should change style as steps', async () => {

    const firstHandleAnimationEnd = jest.fn()
    , secondHandleAnimationEnd = jest.fn();

    render(
      <Animate
        steps={[
          {
            duration: 0,
            style: { opacity: 0 },
          },
          {
            duration: 500,
            style: { opacity: 1 },
            onAnimationEnd: firstHandleAnimationEnd,
          },
          {
            duration: 500,
            style: { opacity: 0.5 },
          },
        ]}
        onAnimationEnd={secondHandleAnimationEnd}
      >
        <div />
      </Animate>
    );

    expect(firstHandleAnimationEnd).toHaveBeenCalledTimes(0)
    expect(secondHandleAnimationEnd).toHaveBeenCalledTimes(0)

    await waitFor(() => {
      expect(firstHandleAnimationEnd).toHaveBeenCalledTimes(1)
      expect(secondHandleAnimationEnd).toHaveBeenCalledTimes(0)
    }, { timeout: 900 });

    await waitFor(() => {
      expect(firstHandleAnimationEnd).toHaveBeenCalledTimes(1)
      expect(secondHandleAnimationEnd).toHaveBeenCalledTimes(1)
    }, { timeout: 1400 });
  });
})
