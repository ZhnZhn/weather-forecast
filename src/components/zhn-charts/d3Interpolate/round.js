export default (
  a,
  b
) => (a = +a, b = +b, t =>  Math.round(a * (1 - t) + b * t))  
