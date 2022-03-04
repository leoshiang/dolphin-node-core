const {
  IndexOutOfRangeException,
  InvalidParameterException,
  TypeError,
} = require('./Exceptions')
const Type = require('./Type')

/**
 * 此 callback 會在遍歷每一個 column 時被呼叫一次。
 *
 * @callback forEachColumnCallback
 * @param {*} value 值。
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
 */
class Matrix {
  #columns = 0
  #rows = 0
  #elements = []
  #defaultValue

  constructor (rows, columns, defaultValue) {
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
   * column 數目。
   * @return {number}
   */
  get columns () {
    return this.#columns
  }

  /**
   * row 數目。
   * @return {number}
   */
  get rows () {
    return this.#rows
  }

  /**
   * 驗證 row 是否有效。
   * 如果不是數字或是超出範圍，會拋出例外 InvalidParameterException。
   * @throws {InvalidParameterException}
   * @param {*} row row 編號。
   */
  #checkRowIndex (row) {
    if (Type.isNotNumber(row)) {
      throw new TypeError('參數 row 必須是數字。')
    }
    if (row < 0 || row >= this.#rows) {
      throw new IndexOutOfRangeException(`參數 row 超出範圍(${0}, ${this.#rows - 1})`)
    }
  }

  #createNewRowFrom (rowIndex, columnCount) {
    let columnsToCopy = Math.min(this.#columns, columnCount)
    let remainingColumns = columnCount - columnsToCopy
    let currentRow = this.#elements[rowIndex]
    let result = currentRow.slice(0, columnsToCopy)
    for (let i = 0; i < remainingColumns; i++) {
      result.push(undefined)
    }
    return result
  }

  dump () {
    this.forEachRow(row => {console.log(row)})
  }

  #initFromArray (array) {
    let columns = 0
    let rows = 0
    array.forEach(x => {
      if (Type.isNotArray(x)) {
        return
      }
      columns = Math.max(columns, x.length)
      rows++
    })
    this.#rows = rows
    this.#columns = columns
    this.#elements = []
    array.forEach(x => {
      if (Type.isNotArray(x)) {
        return
      }
      let newRow = []
      let column = 0
      while (column < columns) {
        newRow.push(x[column])
        column++
      }
      this.#elements.push(newRow)
    })
  }

  /**
   * 與另一個矩陣或數值相加。
   * @param {number|Matrix} other
   * @return {Matrix}
   * @example
   * let m = new Matrix(3, 3).fill(1).add(1)
   *
   * let n = new Matrix(3, 3)
   * n.setRow(0, [1, 2, 3])
   * n.setRow(1, [2, 3, 4])
   * n.setRow(2, [3, 4, 5])
   * n.add(new Matrix(3, 3).fill(1))
   */
  add (other) {
    if (Type.isNumber(other)) {
      this.forEach((element, row, column) => {
        this.set(row, column, element + other)
      })
      return this
    }
    if (!(other instanceof Matrix)) {
      throw new TypeError('參數 other 必須是 Matrix 或數字。')
    }
    if (this.rows !== other.columns || this.#columns !== other.columns) {
      return this
    }
    let result = new Matrix(this.rows, this.#columns, false)
    this.forEach((element, row, column) => {
      result.set(row, column, element + other.get(row, column))
    })
    return result
  }

  /**
   * 複製。
   * @return {Matrix}
   * @example
   * let m = new Matrix(3, 2)
   * m.setRow(0, [1, 2])
   * m.setRow(1, [3, 4])
   * m.setRow(2, [5, 6])
   * let n = m.clone()
   */
  clone () {
    let result = new Matrix(this.#rows, this.#columns, false)
    this.#elements.forEach((row, rowIndex) => {
      let resultColumns = result.#elements[rowIndex]
      row.forEach((value, columnIndex) => resultColumns[columnIndex] = value)
    })
    return result
  }

  /**
   * 取得整個 row 的資料。
   * @param {number} column 編號。
   * @return {*} 資料陣列。
   * @example
   * let m = new Matrix(3, 3)
   *     m.set(0, 0, 1)
   *     m.set(0, 1, 2)
   *     m.set(0, 2, 3)
   * console.log(m.column(0)) // [1]
   */
  column (column) {
    if (Type.isNotNumber(column)) {
      return undefined
    }
    if (column < 0 || column >= this.#columns) {
      return undefined
    }
    let result = []

    this.#elements.forEach(row => result.push(row[column]))
    return result
  }

  /**
   * 計算 column 所有元素的總和。
   * @param column column 編號。
   * @return {*} 所有元素的總和。
   * @example
   * new Matrix(3, 3).fill(1).columnSum(0) // 3
   */
  columnSum (column) {
    if (Type.isNotNumber(column)) {
      return undefined
    }
    if (column < 0 || column >= this.#columns) {
      return undefined
    }
    let result = this.#defaultValue
    for (let row = 0; row < this.#rows; row++) {
      result += this.#elements[row][column]
    }
    return result
  }

  /**
   * 用 value 填滿整個矩陣。
   * @param {*} value 要填入的值。
   * @return {Matrix}
   * @example
   * let m = new Matrix(3, 3)
   * m.fill(1).fill(2)
   */
  fill (value) {
    for (let row = 0; row < this.#rows; row++) {
      this.#elements[row].fill(value)
    }
    return this
  }

  /**
   * 遍歷每一個元素。
   * @param {forEachCallback} callback
   * @return {Matrix}
   * @throws {TypeError}
   * @example
   * let sum = 0
   * new Matrix(3, 3).fill(1).forEach(x => sum += x)
   * console.log(sum) // 9
   */
  forEach (callback) {
    if (Type.isNotFunction(callback)) {
      throw new TypeError('參數 callback 必須是函數。')
    }
    this.#elements.forEach((row, rowIndex) => {
      row.forEach((element, columnIndex) => callback(element, rowIndex, columnIndex))
    })
    return this
  }

  /**
   * 遍歷每一個 column。
   * @param {forEachColumnCallback} callback 回呼函數。
   * @return {Matrix}
   * @throws {TypeError}
   * @example
   * new Matrix(3, 3).fill(1).forEachColumn((x) => console.log(x))
   */
  forEachColumn (callback) {
    if (Type.isNotFunction(callback)) {
      throw new TypeError('參數 callback 必須是函數。')
    }
    for (let column = 0; column < this.#columns; column++) {
      callback(this.column(column), column)
    }
    return this
  }

  /**
   * 遍歷每一個 row。
   * @param {forEachRowCallback} callback 回呼函數。
   * @return {Matrix}
   * @throws {InvalidParameterException}
   * @example
   * new Matrix(3, 3).fill(1).forEachRow((x) => console.log(x))
   */
  forEachRow (callback) {
    if (Type.isNotFunction(callback)) {
      throw new InvalidParameterException('參數 callback 必須是函數。')
    }
    for (let row = 0; row < this.#rows; row++) {
      callback(this.#elements[row], row)
    }
    return this
  }

  /**
   * 取得 cell 的值。如果 row 或 column 不存在，會回傳 undefined
   * @param {number} row
   * @param {number} column
   * @return {*}
   * @example
   * let m = new Matrix(3, 3)
   * m.set(1, 1, 3)
   * console.log(m.get(1, 1)) // 3
   */
  get (row, column) {
    return this.#elements[row][column]
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
      this.#elements[row][row] = 1
    }
    return this
  }

  /**
   * 但斷是否為方陣。
   * @return {boolean}
   */
  isSquare () {
    return this.#columns === this.#rows
  }

  /**
   * 與另一個矩陣或數值乘。
   * @param {number|Matrix} other
   * @return {Matrix}
   * @example
   * let m = new Matrix(3, 3).fill(1).mul(1)
   *
   * let n = new Matrix(3, 3)
   * n.setRow(0, [1, 2, 3])
   * n.setRow(1, [2, 3, 4])
   * n.setRow(2, [3, 4, 5])
   * n.mul(m)
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
          sum += this.get(row, s) * other.get(s, column)
        }
        result.set(row, column, sum)
      }
    }
    return result
  }

  /**
   * 調整大小。如果新的 row 或 column 大於目前的數量，新的 cell 其資料將會是 undefined。
   * @param rows row 數量。
   * @param columns column 數量。
   * @return {Matrix}
   * @throws {InvalidParameterException}
   * @example
   * let m = new Matrix(10, 10)
   *     m.resize(3, 3)
   */
  resize (rows, columns) {
    if (Type.isNotNumber(rows) || Type.isNotNumber(columns)) {
      throw new TypeError('參數 rows 與 columns 必須是數值。')
    }
    if (columns < 0 || rows < 0) {
      throw new InvalidParameterException('參數 rows 與 columns 必須大於等於 0。')
    }
    if (rows === this.#rows && columns === this.#columns) {
      return this
    }

    let newElements = []
    let rowsToCopy = Math.min(this.#rows, rows)
    let remainingRows = rows - rowsToCopy
    for (let row = 0; row < rowsToCopy; row++) {
      newElements.push(this.#createNewRowFrom(row, columns))
    }
    for (let i = 0; i < remainingRows; i++) {
      newElements.push(new Array(columns))
    }
    this.#elements = newElements
    this.#columns = columns
    this.#rows = rows
    return this
  }

  /**
   * 取得整個 row 的資料。
   * @param {number} row 編號。
   * @return {*} 資料陣列。
   * @throws {InvalidParameterException}
   * @throws {IndexOutOfRangeException}
   * @example
   * let m = new Matrix(3, 3)
   *     m.set(0, 0, 1)
   *     m.set(0, 1, 2)
   *     m.set(0, 2, 3)
   * console.log(m.row(0)) // [1,2,3]
   */
  row (row) {
    this.#checkRowIndex(row)
    return this.#elements[row]
  }

  /**
   * 計算 row 所有元素的總和。
   * @param row row 編號。
   * @return {*} 所有元素的總和。
   * @throws {InvalidParameterException}
   * @throws {IndexOutOfRangeException}
   * @example
   * new Matrix(3, 3).fill(1).rowSum(0) // 3
   */
  rowSum (row) {
    this.#checkRowIndex(row)
    return this.#elements[row].reduce((acc, curr) => acc + curr, this.#defaultValue)
  }

  /**
   * 設定 row, column 位置的值。
   * @param {number} row 編號。
   * @param {number} column 編號。
   * @param {*} value 值。
   * @return {Matrix}
   * @example
   * let m = new Matrix(3, 3)
   * m.set(1,1,1)
   */
  set (row, column, value) {
    if (Type.isNumber(row) && Type.isNumber(column)) {
      this.#elements[row][column] = value
    }
    return this
  }

  /**
   * 設定 column 的值。
   * @param {number} column 編號。
   * @param {*} values 資料陣列，長度必須與 row 數目一樣。
   * @return {Matrix}
   * @throws {TypeError}
   * @example
   * let m = new Matrix(3, 3)
   * m.fill(1)
   * m.setColumn(2, [1,2,3]) // [1,1,1]
   *                         // [1,1,2]
   *                         // [1,1,3]
   */
  setColumn (column, values) {
    if (column < 0 || column >= this.#columns) {
      return this
    }
    if (Type.isNotArray(values)) {
      for (let row = 0; row < this.#rows; row++) {
        this.#elements[row][column] = values
      }
      return this
    }
    let row = 0
    while (row < this.#rows && row < values.length) {
      this.#elements[row][column] = values[row]
      row++
    }
    return this
  }

  /**
   * 設定 row 的值。
   * @param {number} row row 編號。
   * @param {*} values 資料陣列，長度必須與 column 數目一樣。
   * @return {Matrix}
   * @throws {InvalidParameterException}
   * @throws {IndexOutOfRangeException}
   * @example
   * let m = new Matrix(3, 3)
   * m.fill(1)
   * m.setRow(2, [1,2,3]) // [1,1,1]
   *                      // [1,1,1]
   *                      // [1,2,3]
   */
  setRow (row, values) {
    this.#checkRowIndex(row)
    if (Type.isNotArray(values)) {
      throw new InvalidParameterException('參數 values 必須是陣列。')
    }
    if (values.length !== this.#columns) {
      throw new InvalidParameterException(`參數 values 的長度應為${this.#columns}。`)
    }
    let newRow = []
    values.forEach(x => newRow.push(x))
    this.#elements[row] = newRow
    return this
  }

  /**
   * 與另一個矩陣或數值相減。
   * @param {number|Matrix} other
   * @return {Matrix} 新矩陣。
   * @example
   * let m = new Matrix([1, 2, 3], [2, 3, 4], [4, 5, 6])
   * let n = new Matrix(3, 3).fill(1)
   * let result = n.subtract(m)
   */
  subtract (other) {
    if (Type.isNumber(other)) {
      this.forEach((element, row, column) => {
        this.set(row, column, element - other)
      })
      return this
    }
    if (!(other instanceof Matrix)) {
      throw new TypeError('參數 other 必須是 Matrix 或數字。')
    }
    if (this.rows !== other.columns || this.#columns !== other.columns) {
      return this
    }
    let result = new Matrix(this.rows, this.#columns, false)
    this.forEach((element, row, column) => {
      result.set(row, column, element - other.get(row, column))
    })
    return result
  }

  /**
   * 累加矩陣所有的元素。
   * @return {*} 所有元素的加總。
   * @example
   * let m = new Matrix(3, 3).fill(1).sum()
   * console.log(m) // 9
   *
   * m.clear()
   * m.setRow(0, ['a', 'b', 'c'])
   * m.setRow(1, ['d', 'e', 'f'])
   * m.setRow(2, ['g', 'h', 'i'])
   * console.log(m.sum()) // 'abcdefghi'
   */
  sum () {
    const reduceColumn = (acc, curr) => acc + curr
    const reduceRow = (acc, curr) => acc + curr.reduce(reduceColumn, this.#defaultValue)
    return this.#elements.reduce(reduceRow, this.#defaultValue)
  }
}

module.exports = { Matrix }
