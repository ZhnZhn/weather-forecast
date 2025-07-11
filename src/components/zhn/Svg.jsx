import { useId } from '../uiApi';

export const Svg100 = ({
  w,
  h=w,
  children,
  ...restProps
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="100%"
    height="100%"
    viewBox={`0 0 ${w} ${h}`}
    preserveAspectRatio="none"
    {...restProps}
  >
    {children}
  </svg>
)

export const Svg100WithTitle = ({
  title,
  children,
  ...restProps
}) => {
  const _titleId = useId();
  return (
    <Svg100
      {...restProps}
      aria-labelledby={_titleId}
    >
      <title id={_titleId}>{title}</title>
      {children}
    </Svg100>)
}
