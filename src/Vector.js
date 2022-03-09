const Type = require('./Type')

/**
 * @class
 * @classdesc 向量。
 */
class Vector extends Array {

  constructor (...items) {
    let allItems = items.reduce((a, b) => {
      if (Type.isArray(b)) {
        return [...a, ...b]
      } else {
        return [...a, b]
      }
    }, [])
    super(...allItems)
  }

  /**
   * 向量相加，回傳新向量。
   * @param {Vector} other
   * @return {Vector}
   */
  add (other) {
    return new Vector(this.map((x, index) => x + other[index]))
  }

  /**
   * cross product
   * @param {Vector} other
   * @return {Vector}
   */
  cross (other) {
    return new Vector(this[1] * other[2] - this[2] * other[1],
                      this[2] * other[0] - this[0] * other[2],
                      this[0] * other[1] - this[1] * other[0])
  }

  /**
   * dot product
   * @param {Vector} other
   * @return {number}
   */
  dot (other) {
    return other.reduce((acc, curr, index) => acc + curr * this[index], 0)
  }

  /**
   * 距離。
   * @return {number}
   */
  norm () {
    return Math.sqrt(this.reduce((acc, curr) => acc + curr * curr, 0))
  }

  /**
   * 與純量相乘。
   * @param {number} number
   * @return {Vector}
   */
  scaleBy (number) {
    return new Vector(this.map(x => x * number))
  }

  /**
   * 向量相減，傳回新向量。
   * @param {Vector} other
   * @return {Vector}
   */
  subtract (other) {
    return new Vector(this.map((x, index) => x - other[index]))
  }

  /**
   * 所有元素的加總。
   * @return {number}
   */
  sum () {
    return this.reduce((acc, curr) => acc + curr, 0)
  }
}

module.exports = { Vector }
