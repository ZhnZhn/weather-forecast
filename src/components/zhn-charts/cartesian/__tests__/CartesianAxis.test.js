import {
  render,
  screen
} from '@testing-library/react';
import {
  Surface,
  CartesianAxis
} from '../../index';
import {
  CL_AXIS_TICK,
  CL_LABEL
} from '../../CL';

const CustomizeLabel = ({
  x,
  y
}) => (
  <text data-testid="customized-label" x={x} y={y}>
    test
  </text>
);

const CustomizedTick = ({
  x,
  y
}) => (
  <text data-testid="customized-tick" x={x} y={y}>
    test
  </text>
);

describe('<CartesianAxis />', () => {
  const ticks = [
    { value: 10, coordinate: 50 },
    { value: 1000, coordinate: 100 },
    { value: 20, coordinate: 150 }
  ];

  it('Renders 5 ticks in simple CartesianAxis', () => {
    const { container } = render(
      <Surface width={500} height={500}>
        <CartesianAxis
          orientation="bottom"
          y={100}
          width={400}
          height={50}
          viewBox={{ x: 0, y: 0, width: 500, height: 500 }}
          ticks={ticks}
          label="test"
        />
      </Surface>,
    );

    expect(container.querySelectorAll(`.${CL_AXIS_TICK}`)).toHaveLength(ticks.length);
    expect(container.querySelectorAll(`.${CL_LABEL}`)).toHaveLength(1);
  });

  it('Renders no ticks in simple CartesianAxis', () => {
    const { container } = render(
      <Surface width={500} height={500}>
        <CartesianAxis
          orientation="bottom"
          y={100}
          width={400}
          height={50}
          viewBox={{ x: 0, y: 0, width: 500, height: 500 }}
          ticks={[]}
          label="test"
        />
      </Surface>,
    );

    expect(container.querySelectorAll(`.${CL_AXIS_TICK}`)).toHaveLength(0);
  });

  it('Renders ticks when interval="preserveStartEnd"', () => {
    const { container } = render(
      <Surface width={500} height={500}>
        <CartesianAxis
          orientation="bottom"
          y={100}
          width={400}
          height={50}
          viewBox={{ x: 0, y: 0, width: 500, height: 500 }}
          ticks={ticks}
          label="test"
          interval="preserveStartEnd"
        />
      </Surface>,
    );

    expect(container.querySelectorAll(`.${CL_AXIS_TICK}`)).toHaveLength(ticks.length);
  });

  it('gets font states from its ComputedStyle', () => {
    const myStyle = { fontSize: '14px', letterSpacing: '0.5em' };

    jest.spyOn(window, 'getComputedStyle').mockReturnValue(myStyle);

    render(
      <Surface width={500} height={500}>
        <CartesianAxis
          data-testid="hello"
          orientation="bottom"
          y={100}
          width={400}
          height={50}
          viewBox={{ x: 0, y: 0, width: 500, height: 500 }}
          ticks={ticks}
          label="test"
          interval="preserveStartEnd"
        />
      </Surface>,
    );

    const container = document.querySelector('#recharts_measurement_span');

    expect(container?.style).toMatchObject(myStyle);
  });

  it('Renders ticks when interval="preserveStart"', () => {
    const { container } = render(
      <Surface width={500} height={500}>
        <CartesianAxis
          orientation="bottom"
          y={100}
          width={400}
          height={50}
          viewBox={{ x: 0, y: 0, width: 500, height: 500 }}
          ticks={ticks}
          label="test"
          interval="preserveStart"
        />
      </Surface>,
    );

    expect(container.querySelectorAll(`.${CL_AXIS_TICK}`)).toHaveLength(ticks.length);
  });

  it('Renders 5 ticks in a CartesianAxis which has orientation top', () => {
    const { container } = render(
      <Surface width={500} height={500}>
        <CartesianAxis
          orientation="top"
          y={100}
          width={400}
          height={50}
          viewBox={{ x: 0, y: 0, width: 500, height: 500 }}
          ticks={ticks}
          label="top"
        />
      </Surface>,
    );

    expect(container.querySelectorAll(`.${CL_AXIS_TICK}`)).toHaveLength(ticks.length);
    expect(container.querySelectorAll(`.${CL_LABEL}`)).toHaveLength(1);
  });

  it('Renders 5 ticks in a CartesianAxis which has orientation left', () => {
    const { container } = render(
      <Surface width={500} height={500}>
        <CartesianAxis
          orientation="left"
          y={100}
          width={50}
          height={400}
          viewBox={{ x: 0, y: 0, width: 500, height: 500 }}
          ticks={ticks}
          label="left"
        />
      </Surface>,
    );

    expect(container.querySelectorAll(`.${CL_AXIS_TICK}`)).toHaveLength(ticks.length);
    expect(container.querySelectorAll(`.${CL_LABEL}`)).toHaveLength(1);
  });

  it('Renders 5 ticks in a CartesianAxis which has orientation right', () => {
    const { container } = render(
      <Surface width={500} height={500}>
        <CartesianAxis
          orientation="right"
          y={100}
          width={50}
          height={400}
          viewBox={{ x: 0, y: 0, width: 500, height: 500 }}
          ticks={ticks}
          label="right"
        />
      </Surface>,
    );

    expect(container.querySelectorAll(`.${CL_AXIS_TICK}`)).toHaveLength(ticks.length);
    expect(container.querySelectorAll(`.${CL_LABEL}`)).toHaveLength(1);
  });

  it('Renders label when label is a function', () => {
    const { container } = render(
      <Surface width={500} height={500}>
        <CartesianAxis
          orientation="left"
          y={100}
          width={50}
          height={400}
          viewBox={{ x: 0, y: 0, width: 500, height: 500 }}
          ticks={ticks}
          label={CustomizeLabel}
        />
      </Surface>,
    );

    expect(container.querySelectorAll(`.${CL_AXIS_TICK}`)).toHaveLength(ticks.length);
    expect(screen.getAllByTestId('customized-label')).toHaveLength(1);
  });

  it('Renders label when label is a react element', () => {
    const { container } = render(
      <Surface width={500} height={500}>
        <CartesianAxis
          orientation="right"
          y={100}
          width={50}
          height={400}
          viewBox={{ x: 0, y: 0, width: 500, height: 500 }}
          ticks={ticks}
          label={<CustomizeLabel />}
        />
      </Surface>,
    );

    expect(container.querySelectorAll(`.${CL_AXIS_TICK}`)).toHaveLength(ticks.length);
    expect(screen.getAllByTestId('customized-label')).toHaveLength(1);
  });

  it('Render customized ticks when tick is set to be a ReactElement', () => {
    render(
      <Surface width={500} height={500}>
        <CartesianAxis
          orientation="bottom"
          y={100}
          width={400}
          height={50}
          viewBox={{ x: 0, y: 0, width: 500, height: 500 }}
          ticks={ticks}
          tick={<CustomizedTick />}
          interval={0}
        />
      </Surface>,
    );

    expect(screen.getAllByTestId('customized-tick')).toHaveLength(ticks.length);
  });

  it('Render customized ticks when ticks is an array of strings and interval is 0', () => {
    render(
      <Surface width={500} height={500}>
        <CartesianAxis
          orientation="bottom"
          y={100}
          width={400}
          height={50}
          viewBox={{ x: 0, y: 0, width: 500, height: 500 }}
          ticks={ticks}
          tick={<CustomizedTick />}
          interval={0}
        />
      </Surface>,
    );

    expect(screen.getAllByTestId('customized-tick')).toHaveLength(ticks.length);
  });

  it('Render customized ticks when tick is set to be a function', () => {
    render(
      <Surface width={500} height={500}>
        <CartesianAxis
          orientation="bottom"
          y={100}
          width={400}
          height={50}
          viewBox={{ x: 0, y: 0, width: 500, height: 500 }}
          ticks={ticks}
          tick={CustomizedTick}
          interval={0}
        />
      </Surface>,
    );

    expect(screen.getAllByTestId('customized-tick')).toHaveLength(ticks.length);
  });

  it('Renders no ticks when tick is set to false', () => {
    const { container } = render(
      <Surface width={500} height={500}>
        <CartesianAxis
          orientation="bottom"
          y={100}
          width={400}
          height={50}
          viewBox={{ x: 0, y: 0, width: 500, height: 500 }}
          tick={false}
        />
      </Surface>,
    );

    expect(container.querySelectorAll(`.${CL_AXIS_TICK}`)).toHaveLength(0);
  });
});
