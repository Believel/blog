export default function compose(...fns: any[]) {
  if (fns.length === 0) {
    return (args: any) => args
  }
  if (fns.length === 1) {
    return fns[0]
  }
  return fns.reduce((a, b) => (...args: any[]) => a(b(...args)))
}