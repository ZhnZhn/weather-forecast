import exponent from "./exponent.js";

const mathMax = Math.max
, mathMin = Math.min
, mathAbs = Math.abs
, mathFloor = Math.floor;

export const precisionFixed = (
  step
) => mathMax(0, -exponent(mathAbs(step)))

export const precisionPrefix = (
  step,
  value
) => mathMax(
  0,
  mathMax(
    -8,
    mathMin(
      8,
      mathFloor(exponent(value) / 3))
    ) * 3 - exponent(mathAbs(step)
  )
)

export const precisionRound = (
  step,
  max
) => {
  step = mathAbs(step);
  max = mathAbs(max) - step;
  return mathMax(0, exponent(max) - exponent(step)) + 1;
}
