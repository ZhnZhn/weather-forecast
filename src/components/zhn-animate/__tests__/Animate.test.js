import {
  render,
  waitFor
} from '@testing-library/react';

import { Animate } from '../index';

describe('Animate', () => {

  test('should change the style of children from to value by attributeName and duration', () => {
    const { container } = render(
      <Animate
        duration={500}
      >
        {({ t }) => <div className="test-wrapper" style={{opacity: t}} />}
      </Animate>
    );

    const element = container.getElementsByClassName('test-wrapper')[0];
    expect(element.style.opacity).toBe('0')

    return waitFor(() => {
      const element = container.getElementsByClassName('test-wrapper')[0];
      expect(element.style.opacity).toBe('1')
    }, { timeout: 700 })
  });

  test('should called onAnimationEnd', async () => {
    const handleAnimationEnd = jest.fn()

    render(
      <Animate
        attributeName="opacity"
        duration={500}
        onAnimationEnd={handleAnimationEnd}
      >
        {() => <div />}
      </Animate>
    );

    expect(handleAnimationEnd).toHaveBeenCalledTimes(0)

    await waitFor(() => {
      expect(handleAnimationEnd).toHaveBeenCalledTimes(1)
    }, { timeout: 900 })
  });

})
