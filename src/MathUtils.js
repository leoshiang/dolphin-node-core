const EPSILON = 0.00000001
const areEqual = (one, other, epsilon = EPSILON) => Math.abs(one - other) < epsilon

module.exports = {
  EPSILON,
  areEqual,
}
