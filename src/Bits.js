const Type = require('./Type')
const { IndexOutOfRangeException } = require('./Exceptions')

/**
 * @callback forEachCallback
 * @param {boolean} value true or false。
 * @param {number} index 位元編號。
 */

/**
 * @class
 */
class Bits {
  #bitsPerPage = 32
  #length = 0
  #pages = []

  constructor (length) {
    this.#setLength(length || 0)
  }

  get length () {
    return this.#length
  }

  set length (value) {
    this.#setLength(value)
  }

  #checkIndex (index) {
    if (index < 0 || index >= this.#length) {
      throw new IndexOutOfRangeException(`參數 index 超出範圍(0,${this.#length - 1})`)
    }
  }

  #getNumberOfPages (bits) {
    return Math.floor((bits + this.#bitsPerPage - 1) / this.#bitsPerPage)
  }

  #getPageIndex (bitNumber) {
    return Math.floor(bitNumber / this.#bitsPerPage)
  }

  /**
   * 設定長度（幾個 bit）。
   * @param newLength
   */
  #setLength (newLength) {
    if (Type.isNotNumber(newLength)) {
      return
    }
    let pagesNeeded = this.#getNumberOfPages(this.#length)
    let differences = pagesNeeded - this.#pages.length
    if (differences > 0) {
      for (let i = 0; i < differences; i++) {
        this.#pages.push(0)
      }
    } else {
      this.#pages.length = pagesNeeded
    }
    this.#length = newLength

    return this
  }

  /**
   * 遍歷每一個 bit。
   * @param {forEachCallback} callback 回呼函數。
   * @return {Bits}
   */
  forEach (callback) {
    if (!Type.isFunction(callback)) {
      return this
    }

    let i
    for (i = 0; i < this.#length; i += 1) {
      callback(this.isOn(i), i)
    }

    return this
  }

  fromInt32 (value) {
    this.#length = this.#bitsPerPage
    this.#pages[0] = value | 0

    return this
  }

  isOn (index) {
    let page = this.#pages[this.#getPageIndex(index)]
    return (page & (1 << index % this.#bitsPerPage)) !== 0
  }

  off (index) {
    this.#checkIndex(index)
    this.#pages[this.#getPageIndex(index)] &= ~(1 << index % this.#bitsPerPage)
    return this
  }

  on (index) {
    this.#checkIndex(index)
    this.#pages[this.#getPageIndex(index)] |= 1 << index % this.#bitsPerPage
    return this
  }

  set (index, value) {
    if (value) {
      this.on(index)
    } else {
      this.off(index)
    }

    return this
  }

  toInt32 () {
    return this.#pages.length === 0
      ? 0
      : this.#pages[0] || 0
  }
}

module.exports = { Bits }
