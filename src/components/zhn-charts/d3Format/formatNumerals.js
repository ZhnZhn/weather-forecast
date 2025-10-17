export default (
  numerals
) => value => value
  .replace(/[0-9]/g, i => numerals[+i])
