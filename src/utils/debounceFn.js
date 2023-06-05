const debounceFn = (
  func,
  delay,
  { leading } = {}
) => {
  let timerId;

  return (...args) => {
    if (!timerId && leading) {
      func(...args)
    }
    clearTimeout(timerId)

    timerId = setTimeout(() => func(...args), delay)
  }
}

export default debounceFn
