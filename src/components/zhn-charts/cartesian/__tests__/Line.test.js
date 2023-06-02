import { render } from '@testing-library/react';
import { Surface, Line } from '../../index';
import { CL_LINE_CURVE } from '../../CL';

describe('<Line />', () => {
  const data = [
    { x: 10, y: 50, value: 100 },
    { x: 50, y: 50, value: 100 },
    { x: 90, y: 50, value: 100 }
  ];

  it('Render a path in a simple Line', () => {
    const { container } = render(
      <Surface width={500} height={500}>
        <Line isAnimationActive={false} points={data} />
      </Surface>,
    );

    expect(container.querySelectorAll('.' + CL_LINE_CURVE)).toHaveLength(1);
  });

  it("Don't render any path when data is empty", () => {
    const { container } = render(
      <Surface width={500} height={500}>
        <Line points={[]} />
      </Surface>,
    );

    expect(container.querySelectorAll('.' + CL_LINE_CURVE)).toHaveLength(0);
  });
});
