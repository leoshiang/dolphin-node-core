const { Vector } = require('./Vector')
const { InvalidParameterException } = require('./Exceptions')
const Type = require('./Type')

/**
 * 此 callback 會在遍歷每一個 column 時被呼叫一次。
 *
 * @callback forEachColumnCallback
 * @param {*} value 向量。
 * @param {*} column  column 編號。
 */

/**
 * 此 callback 會在遍歷每一個元素時被呼叫一次。
 *
 * @callback forEachCallback
 * @param {*} value 值。
 * @param {*} row  row 編號。
 * @param {*} column  column 編號。
 */

/**
 * 此 callback 會在遍歷每一個 row 時被呼叫一次。
 *
 * @callback forEachRowCallback
 * @param {*} value 值。
 * @param {*} row  row 編號。
 */

/**
 * @class
 * @classdesc 二維陣列。
 */
class Matrix extends Array {

  #columns
  #defaultValue
  #rows

  /**
   * @constructor
   * @param {number|Array} [rows] 列數。
   * @param {number|Array} [columns]
   * @param {number} [defaultValue]
   * @example
   * let m1 = new Matrix() // []
   * let m2 = new Matrix(2, 2) // [[0, 0], [0, 0]]
   * let m3 = new Matrix([2, 3, 1],
   *                     [4, 7, 2],
   *                     [3, 1, 1]) // [[2, 3, 1], [4, 7, 2], [3, 1, 1]]
   * let m4 = new Matrix([2, 3, 1], 1, [3, 1, 1]) // [[2, 3, 1], [3, 1, 1]]
   */
  constructor (rows = 0, columns = 0, defaultValue) {
    super()
    this.clear()
    this.#defaultValue = Type.isUndefined(defaultValue)
      ? 0
      : defaultValue
    if (Type.isArray(rows)) {
      this.#initFromArray(Array.from(arguments))
    } else {
      this.resize(rows || 0, columns || 0)
      this.fill(this.#defaultValue)
    }
  }

  /**
   * 取得 columns。
   * @return {*}
   */
  get columns () {
    return this.#columns
  }

  /**
   * 取得 rows。
   * @return {*}
   */
  get rows () {
    return this.#rows
  }

  /**
   * 找出最長的陣列長度當作 columns，有效的陣列數目當作 rows。
   * @param {*} arrayList 陣列串列。
   * @return {{columns: number, rows: number}}
   */
  #getDimension (arrayList) {
    let columns = 0
    let rows = 0
    arrayList.forEach(x => {
      if (Type.isNotArray(x)) {
        return
      }
      columns = Math.max(columns, x.length)
      rows++
    })
    return {
      columns: columns,
      rows: rows,
    }
  }

  #initFromArray (arrayList) {
    let dimension = this.#getDimension(arrayList)
    this.length = 0
    arrayList.forEach(x => {
      if (Type.isNotArray(x)) {
        return
      }
      let newRow = new Array(dimension.columns)
      let column = 0
      while (column < dimension.columns) {
        newRow[column] = x[column]
        column++
      }
      this.push(newRow)
    })
    this.#rows = dimension.rows
    this.#columns = dimension.columns
  }

  /**
   * 與另一個矩陣相加。
   * @param other
   * @return {Matrix} 新矩陣。
   * @example
   * let m1 = new Matrix([1, 2], [3, 4])
   * let m2 = new Matrix([5, 6], [7, 8])
   * let m3 = m1.add(m2) // [[6, 8],[10, 12]]
   */
  add (other) {
    let result = new Matrix(this.#rows, this.#columns)
    for (let row = 0; row < this.#rows; row++) {
      for (let column = 0; column < this.#columns; column++) {
        result[row][column] = this[row][column] + other[row][column]
      }
    }
    return result
  }

  /**
   * 清除矩陣。
   * @return {Matrix} 矩陣本身。
   * @example
   * let m = new Matrix(2, 2).clear()
   */
  clear () {
    this.length = 0
    this.#rows = 0
    this.#columns = 0
    return this
  }

  /**
   * 取得一整行（column）的值。
   * @param {number} column 列編號，從 0 開始。
   * @return {Vector} 回傳向量。
   * @example
   * let m = new Matrix([1, 2], [3, 4])
   * console.log(m.column(0)) // [2, 4]
   */
  column (column) {
    let result = new Vector(this.#rows)
    this.forEach((row, index) => result[index] = row[column])
    return result
  }

  /**
   * 填入數值。
   * @param {number} number 要填入的數值。
   * @return {Vector} 矩陣本身。
   * @example
   * let m = new Matrix(2, 2).fill(2)
   */
  fill (number) {
    this.forEach(row => row.fill(number))
    return this
  }

  /**
   * 遍歷每一行（column）。
   * @param {forEachColumnCallback} callback 回呼函數。
   * @return {Matrix} 矩陣本身。
   * @example
   * new Matrix(3, 3).fill(1).forEachColumn((x) => console.log(x))
   */
  forEachColumn (callback) {
    for (let column = 0; column < this.#columns; column++) {
      callback(this.column(column), column)
    }
    return this
  }

  /**
   * 遍歷每一列（row）。
   * @param {forEachRowCallback} callback 回呼函數。
   * @return {Matrix} 矩陣本身。
   * @example
   * new Matrix(3, 3).fill(1).forEachRow((x) => console.log(x))
   */
  forEachRow (callback) {
    for (let row = 0; row < this.#rows; row++) {
      callback(this[row], row)
    }
    return this
  }

  /**
   * 將矩陣設為單位矩陣（對角線元素為 1 ，其餘元素為 0）
   * @return {Matrix}
   * @example
   * let m = new Matrix(3, 3).identity()
   */
  identity () {
    if (!this.isSquare()) {
      return this
    }
    this.fill(0)
    for (let row = 0; row < this.#rows; row++) {
      this[row][row] = 1
    }
    return this
  }

  /**
   * 與另一個矩陣或數值乘。
   * @param {number|Matrix} other
   * @return {Matrix} 新矩陣。
   * @throws {TypeError} 當參數 other 不是 Matrix 時，會拋出此例外。
   * @example
   * let m = new Matrix([1, 2], [3, 4], [5, 6])
   * let n = new Matrix([1, 2, 3, 4], [5, 6, 7, 8])
   * let result = m.multiply(n)
   */
  multiply (other) {
    if (!(other instanceof Matrix)) {
      throw new TypeError('參數 other 必須是 Matrix。')
    }
    if (this.#columns !== other.rows) {
      return this
    }

    let result = new Matrix(this.rows, other.columns)
    for (let row = 0; row < this.rows; row++) {
      for (let column = 0; column < other.columns; column++) {
        let sum = 0
        for (let s = 0; s < this.#columns; s++) {
          sum += this[row][s] * other[s][column]
        }
        result[row][column] = sum
      }
    }
    return result
  }

  /**
   * 調整大小。
   * @param {number} rows 列數。
   * @param {number} columns 行數。
   * @return {Matrix} 矩陣本身。
   * @example
   * let m = new Matrix(2, 2).fill(2).resize(3, 3)
   */
  resize (rows, columns) {
    let numberOfRowsToChange = this.#rows - rows
    while (numberOfRowsToChange < 0) {
      this.push(new Array(this.#columns).fill(0))
      numberOfRowsToChange++
    }
    while (numberOfRowsToChange > 0) {
      this.pop()
      numberOfRowsToChange--
    }
    this.#rows = rows

    let numberOfColumnsToChange = this.#columns - columns
    if (numberOfColumnsToChange < 0) {
      for (let row = 0; row < this.#rows; row++) {
        for (let i = 0; i > numberOfColumnsToChange; i--) {
          this[row].push(0)
        }
      }
    }
    if (numberOfColumnsToChange > 0) {
      for (let row = 0; row < this.#rows; row++) {
        for (let i = 0; i < numberOfColumnsToChange; i++) {
          this[row].pop()
        }
      }
    }
    this.#columns = columns

    return this
  }

  /**
   * 取得一整行（row）的值。
   * @param {number} rowIndex 行編號，從 0 開始。
   * @return {Vector} 回傳向量。
   * @example
   * let m = new Matrix(2, 2)
   * m[0][0] = 1
   * m[0][1] = 2
   * m[1][0] = 3
   * m[1][1] = 4
   * console.log(m.row(0))
   */
  row (rowIndex) {
    return new Vector(this[rowIndex])
  }

  /**
   * 矩陣相減
   * @param {Matrix} other
   * @return {Matrix} 矩陣本身。
   * @example
   * let m1 = new Matrix(2, 2)
   * m1[0][0] = 1
   * m1[0][1] = 2
   * m1[1][0] = 3
   * m1[1][1] = 4
   * let m2 = new Matrix(2, 2)
   * m2[0][0] = 1
   * m2[0][1] = 2
   * m2[1][0] = 3
   * m2[1][1] = 4
   * let m3 = m1.subtract(m2)
   */
  subtract (other) {
    let result = new Matrix(this.#rows, this.#columns)
    for (let row = 0; row < this.#rows; row++) {
      for (let column = 0; column < this.#columns; column++) {
        result[row][column] = this[row][column] - other[row][column]
      }
    }
    return result
  }

  /**
   * 所有元素的加總。
   * @return {number}
   * @example
   * let m1 = new Matrix(2, 2)
   * m1[0][0] = 1
   * m1[0][1] = 2
   * m1[1][0] = 3
   * m1[1][1] = 4
   * console.log(m1.sum())
   */
  sum () {
    let result = 0
    for (let row = 0; row < this.#rows; row++) {
      for (let column = 0; column < this.#columns; column++) {
        result += this[row][column]
      }
    }
    return result
  }
}

module.exports = { Matrix }
