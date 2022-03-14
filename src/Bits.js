const Type = require('./Type')
const {
  IndexOutOfRangeError,
  TypeError,
  InvalidParameterError,
} = require('./Exceptions')

/**
 * @class
 * @classdesc 位元陣列適合用來記錄大量的 boolean 值，其記憶體使用量為用單一 boolean(4 bytes)的 1/24。
 */
class Bits {
  #一頁的位元數 = 24
  #二進位編碼 = ['0000', '0001', '0010', '0011', '0100', '0101', '0110', '0111',
            '1000', '1001', '1010', '1011', '1100', '1101', '1110', '1111']
  #位元數 = 0
  #分頁陣列 = []

  /**
   * @constructor
   * @param {number|string} 初始值 如果傳入數值，代表要存放幾個位元。如果是字串，則會將字串視為二進位字串去解析。
   * @throws {TypeError} 如果位元數不是大於零的數值會拋出此例外。
   * @example
   * let bits1 = new Bits('01010101')
   * let bits2 = new Bits(3)
   */
  constructor (初始值) {
    if (Type.是字串(初始值)) {
      this.設定二進位字串(初始值)
    } else if (Type.是數值(初始值)) {
      this.#設定位元數(初始值)
    } else {
      this.#設定位元數(0)
    }
  }

  get 位元數 () {
    return this.#位元數
  }

  get 分頁數目 () {
    return this.#分頁陣列.length
  }

  /**
   * 根據位元編號計算它落在哪一個頁面。
   * @param {number} 位元編號 位元編號必須 >= 0 且小於位元數。
   * @return {number} 頁面編號，從 0 開始。
   */
  #取得分頁編號 (位元編號) {
    return Math.floor(位元編號 / this.#一頁的位元數)
  }

  /**
   * 檢查位元編號是否有效。
   * @param {number} 位元編號 位元編號必須 >= 0 且小於位元數
   * @throws {TypeError} 如果位元編號不是數值會拋出此例外。
   * @throws {IndexOutOfRangeError} 如果位元編號超出範圍會拋出此例外。
   */
  #檢查位元編號是否有效 (位元編號) {
    if (Type.不是數值(位元編號)) {
      throw new TypeError(`位元編號必須是數值。`)
    }
    if (位元編號 < 0 || 位元編號 >= this.#位元數) {
      throw new IndexOutOfRangeError(`位元編號必須在(0,${this.#位元數 - 1})之間。`)
    }
  }

  /**
   * 計算要幾個頁面才能儲存需要的位元數。
   * @param {number} 位元數
   * @return {number} 頁面數。
   */
  #計算需要的頁數 (位元數) {
    return Math.floor((位元數 + this.#一頁的位元數 - 1) / this.#一頁的位元數)
  }

  /**
   * 設定這個陣列要儲存的位元數。
   * @param {number} 位元數
   * @throws {TypeError} 如位元數不是大於零的數值會拋出此例外。
   */
  #設定位元數 (位元數) {
    if (Type.不是數值(位元數) || 位元數 < 0) {
      throw new TypeError('位元數必須是大於零的數值!')
    }
    this.#分頁陣列.length = this.#計算需要的頁數(位元數)
    this.#分頁陣列.fill(0)
    this.#位元數 = 位元數
  }

  /**
   * 與傳入的陣列做 and 運算，並回傳新陣列。
   * @param {Bits} 對象
   * @throws {InvalidParameterError} 當對象的位元數不同時會拋出此例外。
   * @return {Bits} 新陣列。
   */
  and (對象) {
    if (對象.位元數 !== this.#位元數) {
      throw new InvalidParameterError('參數的位元數不同，無法進行運算。')
    }
    let result = new Bits(this.位元數)
    result.#分頁陣列 = this.#分頁陣列.map((x, index) => x & 對象.#分頁陣列[index])
    return result
  }

  /**
   * 陣列做 not 運算，並回傳新陣列。
   * @return {Bits} 新陣列。
   */
  not () {
    let result = new Bits(this.位元數)
    result.#分頁陣列 = this.#分頁陣列.map(x => ~x)
    return result
  }

  /**
   * 與傳入的陣列做 or 運算，並回傳新陣列。
   * @param {Bits} 對象
   * @throws {InvalidParameterError} 當對象的位元數不同時會拋出此例外。
   * @return {Bits} 新陣列。
   */
  or (對象) {
    if (對象.位元數 !== this.#位元數) {
      throw new InvalidParameterError('參數的位元數不同，無法進行運算。')
    }
    let result = new Bits(this.位元數)
    result.#分頁陣列 = this.#分頁陣列.map((x, index) => x | 對象.#分頁陣列[index])
    return result
  }

  /**
   * 與傳入的陣列做 xor 運算，並回傳新陣列。
   * @param {Bits} 對象
   * @throws {InvalidParameterError} 當對象的位元數不同時會拋出此例外。
   * @return {Bits} 新陣列。
   */
  xor (對象) {
    if (對象.位元數 !== this.#位元數) {
      throw new InvalidParameterError('參數的位元數不同，無法進行運算。')
    }
    let result = new Bits(this.位元數)
    result.#分頁陣列 = this.#分頁陣列.map((x, index) => x ^ 對象.#分頁陣列[index])
    return result
  }

  /**
   * 將整個陣列用 01 的字串表示。
   * @return {string} 長度等於位元數的 01 字串。
   */
  取得二進位字串 () {
    let result = ''
    let 半位元數 = this.#一頁的位元數 / 4
    this.#分頁陣列.forEach((x => {
      for (let i = 0; i < 半位元數; i++) {
        result = this.#二進位編碼[(x >> (i * 4)) & 0x0000000F] + result
      }
    }))
    return result.slice(result.length - this.#位元數)
  }

  /**
   * 取得編號位置的位元狀態。
   * @param {number} 位元編號 位元編號必須 >= 0 且小於位元數
   * @return {boolean} 如果編號位置的位元是1則回傳 true，否則回傳 false。
   * @throws {TypeError} 如果位元編號不是數值會拋出此例外。
   * @throws {IndexOutOfRangeError} 如果位元編號超出範圍會拋出此例外。
   */
  取得狀態 (位元編號) {
    this.#檢查位元編號是否有效(位元編號)
    let 頁面 = this.#分頁陣列[this.#取得分頁編號(位元編號)]
    return (頁面 & (1 << 位元編號 % this.#一頁的位元數)) !== 0
  }

  /**
   * 複製自己到新的陣列。
   * @return {Bits}
   */
  複製 () {
    let result = new Bits(this.位元數)
    result.#分頁陣列 = [].concat(this.#分頁陣列)
    return result
  }

  設定二進位字串 (二進位字串) {
    let 字串擷取結束位置 = 二進位字串.length
    let 字串擷取開始位置 = 字串擷取結束位置 - Math.min(this.#一頁的位元數, 二進位字串.length)
    this.#設定位元數(二進位字串.length)
    let 頁面編號 = 0
    while (頁面編號 < this.#分頁陣列.length) {
      let 部分字串 = 二進位字串.substring(字串擷取開始位置, 字串擷取結束位置)
      this.#分頁陣列[頁面編號] = parseInt(部分字串, 2)
      字串擷取結束位置 -= this.#一頁的位元數
      字串擷取開始位置 -= this.#一頁的位元數
      頁面編號++
    }
    return this
  }

  /**
   * 設定所有位元的狀態為 true 或 false。
   * @param {boolean} 狀態 true 或 false。
   * @return {Bits}
   */
  設定所有位元的狀態 (狀態) {
    this.#分頁陣列 = this.#分頁陣列.map(() => 狀態
      ? 0xFFFFFF
      : 0)
    return this
  }

  /**
   * 設定位元編號的狀態。
   * @param {number} 位元編號 位元編號必須 >= 0 且小於位元數
   * @param {boolean} 狀態 true or false。
   * @return {Bits}
   */
  設定狀態 (位元編號, 狀態) {
    this.#檢查位元編號是否有效(位元編號)
    let 分頁編號 = this.#取得分頁編號(位元編號)
    const 位元遮罩 = 1 << (位元編號 % this.#一頁的位元數)
    if (狀態) {
      this.#分頁陣列[分頁編號] |= 位元遮罩
    } else {
      this.#分頁陣列[分頁編號] &= ~位元遮罩
    }
    return this
  }
}

module.exports = { Bits }
