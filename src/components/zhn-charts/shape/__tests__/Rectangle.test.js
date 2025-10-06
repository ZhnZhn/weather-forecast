import { render } from '@testing-library/react';
import { Surface } from '../../index';
import { Rectangle } from '../Rectangle';
import { CL_RECTANGLE } from '../../CL';

const _getNodeRectangles = container => container
  .querySelectorAll(`.${CL_RECTANGLE}`);

describe('<Rectangle />', () => {
  const rectangleRadiusCases = [
    { radius: [5, 10, 8, 15] },
    { radius: 5 }
  ];
  test.each(rectangleRadiusCases)(
    'Should render 1 rectangle in simple Rectangle when radius is $radius',
    ({ radius }) => {
      const { container } = render(
        <Surface width={400} height={400}>
          <Rectangle x={50} y={50} width={80} height={100} radius={radius} fill="#ff7300" />
        </Surface>
      );

      expect(_getNodeRectangles(container)).toHaveLength(1);
      expect(container).toMatchSnapshot();
    }
  );

  it('Should render 4 arc when height < 0', () => {
    const { container } = render(
      <Surface width={400} height={400}>
        <Rectangle x={50} y={200} width={80} height={-100} radius={5} fill="#ff7300" />
      </Surface>
    );

    const rects = _getNodeRectangles(container);
    expect(rects).toHaveLength(1);
    //expect(rects[0]).toHaveAttribute('d');
    const paths = rects[0].getAttribute('d') || '';
    expect(paths.length - paths.split('A').join('').length).toBe(4);
    expect(container).toMatchSnapshot();
  });

  it("Shouldn't render anything when height === 0 || width === 0", () => {
    const { container } = render(
      <Surface width={400} height={400}>
        <Rectangle x={50} y={200} width={80} height={0} radius={5} fill="#ff7300" />
        <Rectangle x={50} y={200} width={0} height={30} radius={5} fill="#ff7300" />
      </Surface>
    );

    expect(_getNodeRectangles(container)).toHaveLength(0);
    expect(container).toMatchSnapshot();
  });

  it("Shouldn't render any path when x, y, width or height is not a number", () => {
    const { container } = render(
      <Surface width={400} height={400}>
        <Rectangle x="a" y={50} width={80} height={100} fill="#ff7300" />
        <Rectangle x={50} y="b" width={80} height={100} fill="#ff7300" />
        <Rectangle x={50} y={50} width="c" height={100} fill="#ff7300" />
        <Rectangle x={50} y={50} width={80} height="d" fill="#ff7300" />
      </Surface>
    );

    expect(_getNodeRectangles(container)).toHaveLength(0);
    expect(container).toMatchSnapshot();
  });
});
