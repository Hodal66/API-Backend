const sum = require('./sum');

test('adds 1 + 2 to equal 3', () => {
  expect(sum.add(1,2)).toBe(3);
});
test('adds 1 - 2 to equal -1', () => {
    expect(sum.sub(1,2)).toBe(-1);
  });