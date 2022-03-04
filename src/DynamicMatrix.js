const {
  InvalidParameterException,
  KeyNotExistsException,
} = require('./Exceptions')
const Type = require('./Type')

/**
 @typedef {object} configObject
 @property {*} defaultValue 讀取 cell 時，如果是 undefined 會用此值取代。
 @property {boolean} strictMode 嚴格模式，預設 false。
 如果是 true，當讀取不存在的 cell 時會拋出例外。
 如果是 false，當讀取不存在的 cell 時會回傳 undefined。
 */

/**
 * 預設設定
 * @type {{defaultValue: number, strictMode: boolean}}
 */
const defaultConfig = {
  defaultValue: 0,
  strictMode: false,
}

/**
 * 此 callback 會在遍歷每一個值時被呼叫一次。
 *
 * @callback forEachCallback
 * @param {*} value 值。
 * @param {*} rowKey  row 鍵值。
 * @param {*} columnKey column 鍵值。
 */

/**
 * 此 callback 會在遍歷每一個 column key 時被呼叫一次。
 *
 * @callback forEachColumnKeyCallback
 * @param {*} columnKey column 鍵值。
 */

/**
 * 此 callback 會在遍歷每一個 row key 時被呼叫一次。
 *
 * @callback forEachRowCallback
 * @param {[*]} row row 所有值的陣列。
 * @param {*} rowKey row 鍵值。
 */

/**
 * 此 callback 會在遍歷每一個 row key 時被呼叫一次。
 *
 * @callback forEachRowKeyCallback
 * @param {*} rowKey row 鍵值。
 */

/**
 * @class DynamicMatrix 二維矩陣。
 * @param {configObject} config 設定物件。預設為 {
 *   defaultValue: 0,
 *   strictMode: false
 * }
 * @example
 * let m1 = new DynamicMatrix()
 * let m2 = new DynamicMatrix({defaultValue: 1})
 * let m3 = new DynamicMatrix({strictMode: true})
 * let m4 = new DynamicMatrix(
 * {
 *   defaultValue: 1,
 *   strictMode: true
 * })
 */
class DynamicMatrix {
  #config
  #rows
  #columnKeys

  constructor (config) {
    this.#config = config || defaultConfig
    this.#rows = new Map()
    this.#columnKeys = new Map()
  }

  /**
   * 驗證 columnKey 是否有效以及是否存在。
   * @throws {InvalidParameterException, KeyNotExistsException}
   * @param {*} columnKey column 鍵值。
   */
  #checkColumnKey (columnKey) {
    if (!columnKey) {
      throw new InvalidParameterException(`參數 columnKey 不可以為 undefined!`)
    }
    if (!this.#columnKeys.has(columnKey)) {
      throw new KeyNotExistsException(`columnKey ${columnKey} 不存在!`)
    }
  }

  /**
   * 確認 rowKey 是否有效以及是否存在。
   * @throws {InvalidParameterException, KeyNotExistsException}
   * @param {*} rowKey row 鍵值。
   */
  #checkRowKey (rowKey) {
    if (!rowKey) {
      throw new InvalidParameterException(`參數 rowKey 不可以為 undefined!`)
    }
    if (!this.#rows.has(rowKey)) {
      throw new KeyNotExistsException(`參數 rowKey ${rowKey} 不存在!`)
    }
  }

  /**
   * 如果 rowKey不存在則建立新的 row。
   * @param {*} rowKey roe 鍵值。
   * @return {Map<any, any>}
   */
  #createRowIfNotExists (rowKey) {
    let row = this.#rows.get(rowKey)
    if (!row) {
      row = new Map()
      this.#rows.set(rowKey, row)
    }
    return row
  }

  /**
   * 清除所有元素，columnCount 與 rowCount 歸零。
   * @return {DynamicMatrix} 回傳物件本身。
   * @example
   * let m = new DynamicMatrix()
   * m.set(1,1,2)
   *  .set(1,2,3)
   *  .clear()
   */
  clear () {
    this.#rows.forEach(row => row.clear())
    this.#rows.clear()
    this.#columnKeys.clear()
    return this
  }

  /**
   * 取得 column 全部值的陣列。
   * @param columnKey column 鍵值。
   * @returns {[*]} 一個全部值的陣列。
   * @example
   * let m = new DynamicMatrix()
   * m.set(1, 1, 3)
   * m.set(2, 1, 4)
   * m.set(3, 1, 5)
   * console.log(m.columnValues(1)) // [3,4,5]
   */
  column (columnKey) {
    let result = []
    this.#rows.forEach((row) => result.push(row.get(columnKey)))
    return result
  }

  /**
   * 回傳 column 數目。
   * @returns {number} column 數目。
   * @example
   * let m = new DynamicMatrix()
   * m.set(1, 1, 'A')
   * m.set(1, 2, 'B')
   * console.log(m.ColumnCount) // 2
   */
  columnCount () {
    return this.#columnKeys.size
  }

  /**
   * 回傳某一個 column 值的加總。
   * @param columnKey column 鍵值。
   * @returns {number} column 值的加總。
   * @throws {InvalidParameterException, KeyNotExistsException}
   * @example
   * let m = new DynamicMatrix()
   * m.set(1, 1, 3)
   * m.set(2, 1, 4)
   * m.set(3, 1, 5)
   * console.log(m.columnSum(1)) // 12
   * m.clear()
   * m.set(1, 1, 'A')
   * m.set(2, 1, 'B')
   * m.set(3, 1, 'C')
   * console.log(m.columnSum(1)) // 'ABC'
   */
  columnSum (columnKey) {
    this.#checkColumnKey(columnKey)
    let result = this.#config.defaultValue
    this.#rows.forEach((rowValue) => result += rowValue.get(columnKey) || this.#config.defaultValue)
    return result
  }

  /**
   * 用 value 填滿整個矩陣。
   * @param {*} value 要填入的值。
   * @return {DynamicMatrix} 回傳物件本身。
   * @example
   * let m = new DynamicMatrix()
   *     m.setRow(1, [1, 2, 3])
   *      .setRow(2, [1, 2, 3])
   *      .setRow(3, [1, 2, 3])
   *     m.fill(1)
   */
  fill (value) {
    this.#rows.forEach((row) => {
      row.forEach((column, columnKey) => row.set(columnKey, value))
    })
    return this
  }

  /**
   * 遍歷每一個值時會呼叫 callback 一次。
   * @param {forEachCallback} callback 回呼函數。
   * @return {DynamicMatrix} 回傳物件本身。
   * @throws {InvalidParameterException}
   * @example
   * let m = new DynamicMatrix()
   * m.set(1, 1, 1)
   *  .set(2, 1, 2)
   *  .set(3, 1, 3)
   *  .set(1, 2, 2)
   *  .set(2, 2, 3)
   *  .set(3, 2, 4)
   *  .set(1, 3, 3)
   *  .set(2, 3, 4)
   *  .set(3, 3, 5)
   *
   * let sum = 0
   * m.forEach((value) => sum += value)
   * console.log(sum) // 27
   */
  forEach (callback) {
    if (Type.isNotFunction(callback)) {
      throw new InvalidParameterException('callback 必須是函數。')
    }
    this.#rows.forEach((row, rowKey) => {
      row.forEach((column, columnKey) => callback(row.get(columnKey), rowKey, columnKey))
    })
    return this
  }

  /**
   * 遍歷每一個 column key 時會呼叫 callback 一次。
   * @param {forEachColumnKeyCallback} callback 回呼函數。
   * @return {DynamicMatrix} 回傳物件本身。
   * @throws {InvalidParameterException}
   * @example
   * let m = new DynamicMatrix()
   * m.set(1, 'A', 1)
   * m.set(2, 'B', 2)
   * m.set(3, 'C', 3)
   *
   * let keys = []
   * m.forEachColumnKey((columnKey) => keys.push(columnKey))
   * console.log(keys) // ['A', 'B', 'C'])
   */
  forEachColumnKey (callback) {
    if (Type.isNotFunction(callback)) {
      throw new InvalidParameterException('callback 必須是函數。')
    }
    this.#columnKeys.forEach((value, key) => callback(key))
    return this
  }

  /**
   * 遍歷每一個 column，每次回傳整個 column 的值。
   * @param {forEachColumnCallback} callback 回呼函數。
   * @throws {InvalidParameterException}
   * @return {DynamicMatrix} 回傳物件本身。
   */
  forEachColumnValues (callback) {
    if (Type.isNotFunction(callback)) {
      throw new InvalidParameterException('callback 必須是函數。')
    }
    this.#columnKeys.forEach((value, columnKey) => callback(this.column(columnKey), columnKey))
    return this
  }

  /**
   *
   * @param {forEachRowCallback} callback 回呼函數。
   * @return {DynamicMatrix} 回傳物件本身。
   * @throws {InvalidParameterException}
   * @example
   * let m = new DynamicMatrix()
   * m.set(1, 1, 1)
   * m.set(2, 1, 2)
   * m.set(3, 1, 3)
   *
   * m.set(1, 2, 2)
   * m.set(2, 2, 3)
   * m.set(3, 2, 4)
   *
   * m.set(1, 3, 3)
   * m.set(2, 3, 4)
   * m.set(3, 3, 5)
   *
   * let sum = 0
   * m.forEachRow((values) => {
   *   sum += values.reduce((previousValue, currentValue) => previousValue + currentValue, 0)
   * })
   *
   * console.log(sum) // 27
   */
  forEachRow (callback) {
    if (Type.isNotFunction(callback)) {
      throw new InvalidParameterException('參數 callback 應為函數。')
    }
    this.#rows.forEach((row, rowKey) => callback(this.row(rowKey), rowKey))
    return this
  }

  /**
   * 遍歷每一個 rowKey。
   * @param {forEachRowKeyCallback} callback
   * @return {DynamicMatrix} 回傳物件本身。
   * @throws {InvalidParameterException}
   * @example
   * let m = new DynamicMatrix()
   * m.set('A', 1, 1)
   * m.set('B', 2, 2)
   * m.set('C', 3, 3)
   *
   * let keys = []
   * m.forEachRowKey((rowKey) => keys.push(rowKey))
   * console.log(keys) //['A', 'B', 'C']
   */
  forEachRowKey (callback) {
    if (Type.isNotFunction(callback)) {
      throw new InvalidParameterException('參數 callback 應為函數。')
    }
    for (const key of this.#rows.keys()) {
      callback(key)
    }
    return this
  }

  /**
   * 取得指定位置的元素。如果該元素是物件，你會取得該物件的參考，因此你對該物件做的修改動，
   * 會立即修改矩陣中的物件。
   * @param {*} rowKey row 鍵值。
   * @param {*} columnKey column 鍵值。
   * @return {*}
   */
  get (rowKey, columnKey) {
    let row = this.#rows.get(rowKey)
    if (!row) {
      return this.#config.defaultValue
    }
    return row.get(columnKey) || this.#config.defaultValue
  }

  /**
   * 取得 row 全部值的陣列。
   * @param {*} rowKey row 鍵值。
   * @return {*[]} 一個全部值的陣列。
   * @example
   * let m = new DynamicMatrix()
   *     m.set(1, 1, 1)
   *     m.set(1, 2, 2)
   *     m.set(1, 3, 3)
   * console.log(m.row(1)) // [1, 2, 3]
   */
  row (rowKey) {
    let result = []
    let row = this.#rows.get(rowKey)
    if (!row) {
      this.#columnKeys.forEach(() => {result.push(this.#config.defaultValue)})
      return result
    }
    this.#columnKeys.forEach((value, columnKey) => {
      result.push(row.get(columnKey) || this.#config.defaultValue)
    })
    return result
  }

  /**
   * row 數量。
   * @return {number} row 數量。
   * @example
   * let m = new DynamicMatrix()
   *     m.set(1, 1, 1)
   *     m.set(2, 2, 2)
   *     m.set(3, 3, 3)
   *  console.log(m.rowCount()) // 3
   */
  rowCount () {
    return this.#rows.size
  }

  /**
   * 計算 row 的加總。
   * @param {*} rowKey row 鍵值。
   * @return {*} 加總結果。
   * @example
   * let m = new DynamicMatrix()
   *     m.set(1, 1, 1)
   *     m.set(1, 2, 2)
   *     m.set(1, 3, 3)
   * console.log(m.rowSum(1)) // 6
   *
   * let n = new DynamicMatrix({defaultValue: ''})
   *     n.set(1, 1, 'a')
   *     n.set(1, 2, 'b')
   *     n.set(1, 3, 'c')
   * console.log(n.rowSum(1)) // 'abc'
   */
  rowSum (rowKey) {
    this.#checkRowKey(rowKey)
    let row = this.#rows.get(rowKey)
    let result = this.#config.defaultValue
    row.forEach(columnValue => result += columnValue)
    return result
  }

  /**
   * 賦值給 Cell。
   * @param {*} rowKey row 鍵值。
   * @param {*} columnKey column 鍵值。
   * @param {*} value 要寫入的值。
   * @return {DynamicMatrix} 回傳物件本身。
   * @example
   * let m = new DynamicMatrix()
   * m.set('a', 1) = [1,2,3]
   */
  set (rowKey, columnKey, value) {
    if (!rowKey) {
      return this
    }
    if (!columnKey) {
      return this
    }
    let row = this.#rows.get(rowKey)
    if (!row) {
      row = new Map()
      this.#rows.set(rowKey, row)
    }
    row.set(columnKey, value)
    this.#columnKeys.set(columnKey, true)
    return this
  }

  /**
   * 用陣列的值填入 column。
   * @param {*} columnKey column 鍵值。
   * @param {[*]} values 資料陣列。
   * @return {DynamicMatrix}
   * @throws {InvalidParameterException}
   * @example
   * let m = new DynamicMatrix()
   *     m.set(1, 1, 1)
   *      .set(2, 1, 2)
   *      .set(3, 1, 3)
   *      .set(4, 1, 4)
   *      .set(5, 1, 5)
   *      .setColumn(1, ['D', 'E', 'F']) // column(1) = ['D', 'E', 'F', 4, 5]
   */
  setColumn (columnKey, values) {
    if (Type.isNotArray(values)) {
      throw new InvalidParameterException('參數 values 必須是陣列型態!')
    }

    // 將 values 放到目前 column 的位置
    let i = this.#rows.keys()
    let rowKey = i.next().value
    while (rowKey && values.length > 0) {
      this.#rows.get(rowKey).set(columnKey, values.shift())
      rowKey = i.next().value
    }

    // 當 values 的數量比目前的 row 多時，用現在時間作為新的 row key
    if (values.length > 0) {
      let rowKey = Date.now()
      while (values.length > 0) {
        this.set(String(rowKey), columnKey, values.shift())
        rowKey++
      }
    }
    return this
  }

  /**
   * 用陣列的值填入 row。
   * @param {*} rowKey row 鍵值。
   * @param {[*]} values 資料陣列。
   * @return {DynamicMatrix}
   * @throws {InvalidParameterException}
   * @example
   * let m = new DynamicMatrix()
   *     m.set(1, 1, 1)
   *      .set(1, 2, 2)
   *      .set(1, 3, 3)
   *      .set(1, 4, 4)
   *      .set(1, 5, 5)
   *      .setRow(1, ['D', 'E', 'F', 4, 5])
   */
  setRow (rowKey, values) {
    if (Type.isNotArray(values)) {
      throw new InvalidParameterException('參數 values 必須是陣列型態!')
    }

    let row = this.#createRowIfNotExists(rowKey)
    let i = this.#columnKeys.keys()
    let key = i.next().value
    while (key && values.length > 0) {
      row.set(key, values.shift())
      key = i.next().value
    }

    // 當 values 的數量比目前的 column 多時，用現在時間作為新的 column key
    if (values.length > 0) {
      let newColumnKey = Date.now()
      while (values.length > 0) {
        this.set(rowKey, String(newColumnKey), values.shift())
        newColumnKey++
      }
    }
    return this
  }

  /**
   * 所有元素的加總。如果矩陣是空的，會回傳 undefined。
   * @return {*}
   * @example
   * let m = new DynamicMatrix()
   * m.setRow(1, [1, 1, 1])
   * m.setRow(2, [1, 1, 1])
   * m.setRow(3, [1, 1, 1])
   * console.log(m.sum()) // 9
   *
   * m.setRow(1, ['a', 'b', 'c'])
   * m.setRow(2, ['d', 'e', 'f'])
   * m.setRow(3, ['g', 'h', 'i'])
   * console.log(m.sum()) // abcdefghi
   */
  sum () {
    if (this.#rows.size === 0) {
      return undefined
    }
    let result = this.#config.defaultValue
    this.forEach(value => result += value)
    return result
  }

  /**
   * 將矩陣轉為 2 維陣列。
   * @return {*[]}
   * @example
   * let m = new DynamicMatrix()
   * m.setRow(1, [1, 2, 3])
   * m.setRow(2, [4, 5, 6])
   * m.setRow(3, [7, 8, 9])
   * console.log(m.toArray()) // [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
   */
  toArray () {
    let result = []
    this.forEachRow(values => result.push(values))
    return result
  }
}

module.exports = { DynamicMatrix }
