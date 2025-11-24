import {
  render,
  waitFor
} from '@testing-library/react';

import { JsAnimation } from '../JsAnimation';

describe('JsAnimation', () => {

  test('should change the style of children from to to value and duration', () => {
    const { container } = render(
      <JsAnimation
        duration={500}
      >
        {(t) => <div className="test-wrapper" style={{opacity: t}} />}
      </JsAnimation>
    );

    const element = container.getElementsByClassName('test-wrapper')[0];
    expect(element.style.opacity).toBe('0')

    return waitFor(() => {
      const element = container.getElementsByClassName('test-wrapper')[0];
      expect(element.style.opacity).toBe('1')
    }, { timeout: 800 })
  });

  test('should called onAnimationEnd', async () => {
    const handleAnimationEnd = jest.fn()

    render(
      <JsAnimation
        attributeName="opacity"
        duration={500}
        onAnimationEnd={handleAnimationEnd}
      >
        {() => <div />}
      </JsAnimation>
    );

    expect(handleAnimationEnd).toHaveBeenCalledTimes(0)

    await waitFor(() => {
      expect(handleAnimationEnd).toHaveBeenCalledTimes(1)
    }, { timeout: 900 })
  });

})
