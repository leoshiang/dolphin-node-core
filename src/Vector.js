const Type = require('./Type')

/**
 * @class
 * @classdesc 向量。
 */
class Vector extends Array {

  /**
   * @constructor
   * @param items
   * @example
   * const v1 = new Vector(4) // [undefined, undefined, undefined, undefined]
   * const v2 = new Vector([1, 2, 3]) // [1, 2, 3]
   * const v3 = new Vector([1, 2, 3], 4) // [1, 2, 3, 4]
   * const v4 = new Vector([1, 2, 3], 4, [5, 6, 7]) // [1, 2, 3, 4, 5, 6, 7]
   * const v5 = new Vector() // []
   *
   */
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
   * 向量相加。
   * @param {Vector} other
   * @return {Vector} 傳回新向量。
   * @example
   * const v1 = new Vector([1, 2, 3])
   * const v2 = new Vector([4, 5, 6])
   * const v3 = v1.add(v2) // [5, 7, 8]
   */
  add (other) {
    return new Vector(this.map((x, index) => x + other[index]))
  }

  /**
   * cross product
   * @param {Vector} other
   * @return {Vector} 傳回新向量。
   * @example
   * const v1 = new Vector([3, 4, 1])
   * const v2 = new Vector([3, 7, 5])
   * const v3 = v1.cross(v2) // [13, -12, 9]
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
   * @example
   * const v1 = new Vector([3, 4, 1])
   * const v2 = new Vector([3, 7, 5])
   * const product = v1.dot(v2) // 42
   */
  dot (other) {
    return other.reduce((acc, curr, index) => acc + curr * this[index], 0)
  }

  /**
   * 距離。
   * @return {number}
   * @example
   * const v = new Vector([1, 3]).norm()
   * console.log(v) // 3.1622776601683795
   */
  norm () {
    return Math.sqrt(this.reduce((acc, curr) => acc + curr * curr, 0))
  }

  /**
   * 與純量相乘。
   * @param {number} number
   * @return {Vector} 傳回新向量。
   * @example
   * const v = new Vector([1, 2, 3]).scaleBy(3) // [3, 6, 9]
   */
  scaleBy (number) {
    return new Vector(this.map(x => x * number))
  }

  /**
   * 向量相減。
   * @param {Vector} other
   * @return {Vector} 傳回新向量。
   * @example
   * const v1 = new Vector([1, 2, 3])
   * const v2 = new Vector([4, 5, 6])
   * const v3 = v1.subtract(v2)
   */
  subtract (other) {
    return new Vector(this.map((x, index) => x - other[index]))
  }

  /**
   * 所有元素的加總。
   * @return {number} 所有元素的加總。
   * @example
   * let v = new Vector([1, 2, 3])
   * console.log(v.sum()) // 6
   */
  sum () {
    return this.reduce((acc, curr) => acc + curr, 0)
  }
}

module.exports = { Vector }
