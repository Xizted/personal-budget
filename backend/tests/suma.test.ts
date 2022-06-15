const suma = (a: number, b: number): number => a + b;

test('la suma de 1 + 2 es 3', () => {
  const result = suma(1, 2);

  expect(result).toBe(3);
});
