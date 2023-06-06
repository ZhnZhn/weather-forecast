export function initRange(...args) {
  const [domain, range] = args;
  switch (args.length) {
    case 0: break;
    case 1: this.range(domain); break;
    default: this.range(range).domain(domain); break;
  }
  return this;
}
