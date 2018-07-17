export function* fibbonaci() {
  let first = 1,
    second = 1;
  for (;;) {
    let sum = first + second;
    yield sum;
    first = second;
    second = sum;
  }
}
