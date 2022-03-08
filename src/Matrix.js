const Vector = require('./Vector')
const { re } = require('@babel/core/lib/vendor/import-meta-resolve')

class Matrix extends Array {

  #columns
  #rows
  #columnCache

  constructor (rows, columns) {
    super()
    this.clear()
    this.resize(rows, columns)
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

  add (other) {
    let result = new Matrix(0, 0)
    this.forEach((row, index) => {
      result.push(this[index].add(other[index]))
    })
    return result
  }

  /**
   * 清除矩陣。
   * @return {Matrix} 回傳矩陣本身。
   */
  clear () {
    while (this.length > 0) {
      this.pop()
    }
    this.#rows = 0
    this.#columns = 0
    this.#columnCache = []
    return this
  }

  column (column) {
    let result = this.#columns[column]
    if (result) {
      return result
    }
    result = new Vector(this.#rows)
    this.forEach((row, index) => result[index] = row[column])
    this.#columnCache[column] = result
    return result
  }

  /**
   * 填入數值。
   * @param number
   */
  fill (number) {
    this.forEach(row => row.fill(number))
    return this
  }

  /**
   * 調整大小。
   * @param {number} rows 列數。
   * @param {number} columns 行數。
   * @return {Matrix} 回傳矩陣本身。
   */
  resize (rows, columns) {
    let numberOfRowsToChange = this.#rows - rows
    while (numberOfRowsToChange < 0) {
      this.push(new Vector(this.#columns).fill(0))
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
   * 矩陣相減，傳回新矩陣。
   * @param other
   * @return {Matrix}
   */
  subtract (other) {
    let result = new Matrix(0, 0)
    this.forEach((row, index) => {
      result.push(this[index].subtract(other[index]))
    })
    return result
  }
}

module.exports = Matrix
