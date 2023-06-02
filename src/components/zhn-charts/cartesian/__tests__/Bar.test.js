import { render } from '@testing-library/react';
import { Bar, Surface } from '../../index';
import { CL_BAR_BACKGROUND_RECTANGLE } from '../../CL';

let i = 0;
const _crUniqueKey = () => {
  i +=1
  return `key${i}`;
}

describe('<Bar />', () => {
  const data = [
    { x: 10, y: 50, width: 20, height: 50, value: 100, label: 'test' },
    { x: 50, y: 50, width: 20, height: 50, value: 100, label: 'test' },
    { x: 90, y: 50, width: 20, height: 50, value: 100, label: 'test' }
  ];

  it(`Render ${data.length} rectangles in a simple Bar`, () => {
    const wrapper = render(
      <Surface width={500} height={500}>
        <Bar
          isAnimationActive={false}
          layout="horizontal"
          data={data}
          dataKey="value"
        />
      </Surface>
    );

    expect(wrapper.getAllByRole('img')).toHaveLength(data.length);
  });

  it(`Render ${data.length} rectangles in a vertical Bar`, () => {
    const wrapper = render(
      <Surface width={500} height={500}>
        <Bar
          isAnimationActive={false}
          layout="vertical"
          data={data}
          dataKey="value"
        />
      </Surface>
    );

    expect(wrapper.getAllByRole('img')).toHaveLength(data.length);
  });

  it("Don't render any rectangle when data is empty", () => {
    const wrapper = render(
      <Surface width={500} height={500}>
        <Bar data={[]} dataKey="value" />
      </Surface>
    );

    expect(wrapper.queryAllByRole('img')).toHaveLength(0);
  });
});

describe('<Bar /> With background', () => {
  const composedDataWithBackground = [
    {
      x: 10,
      y: 50,
      width: 20,
      height: 20,
      value: 40,
      label: 'test',
      background: { x: 10, y: 50, width: 20, height: 50 },
    },
    {
      x: 50,
      y: 50,
      width: 20,
      height: 50,
      value: 100,
      label: 'test',
      background: { x: 50, y: 50, width: 20, height: 50 },
    }
  ];

  it('Will create a background Rectangle with the passed in props', () => {
    const { container } = render(
      <Surface width={500} height={500}>
        <Bar
          background={{ fill: '#000' }}
          data={composedDataWithBackground}
          dataKey="value"
        />
      </Surface>
    );

    expect(container.querySelectorAll(`.${CL_BAR_BACKGROUND_RECTANGLE}`))
      .toHaveLength(composedDataWithBackground.length);
  });

  it('Will accept a function for the background prop', () => {
    const CL_TEST_CUSTOM_BACKGROUND = 'test-custom-background'
    , backgroundComponent = () => (
      <div
         key={_crUniqueKey()}
         className={CL_TEST_CUSTOM_BACKGROUND}
       />
    )
    , { container } = render(
        <Surface width={500} height={500}>
          <Bar
            background={backgroundComponent}
            data={composedDataWithBackground}
            dataKey="value"
          />
        </Surface>
    );

    expect(container.querySelectorAll(`.${CL_TEST_CUSTOM_BACKGROUND}`))
      .toHaveLength(composedDataWithBackground.length);
  });
});
