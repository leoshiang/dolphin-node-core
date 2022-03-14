const 型別 = require('./型別')
const {
  型別錯誤,
  參數錯誤,
} = require('./例外')
const { 位元陣列 } = require('./位元陣列')

/**
 * @class
 * @classdesc 向量。
 */
class 向量 extends Array {

  /**
   * @constructor
   * @param {array|number}初始值
   * @example
   * const v1 = new 向量(4) // [undefined, undefined, undefined, undefined]
   * const v2 = new 向量([1, 2, 3]) // [1, 2, 3]
   * const v3 = new 向量([1, 2, 3], 4) // [1, 2, 3, 4]
   * const v4 = new 向量([1, 2, 3], 4, [5, 6, 7]) // [1, 2, 3, 4, 5, 6, 7]
   * const v5 = new 向量() // []
   *
   */
  constructor (初始值) {
    let 參數陣列 = Array.from(arguments)
    if (參數陣列.length === 1 && 型別.是數值(參數陣列[0])) {
      super(參數陣列[0])
      this.fill(0)
      return
    }
    let 展開的初始值 = 參數陣列.reduce((a, b) => {
      if (型別.是陣列(b)) {
        return [...a, ...b]
      } else {
        return [...a, b]
      }
    }, [])
    super(...展開的初始值)
  }

  static #檢查排除的項目是否有效 (排除的項目) {
    if (排除的項目 && !(排除的項目 instanceof 位元陣列)) {
      throw new 型別錯誤('排除的項目必須是位元陣列。')
    }
  }

  #找符合條件的元素 (排除的項目, 比較函數) {
    向量.#檢查排除的項目是否有效(排除的項目)
    if (this.length === 0) {
      return {
        位置: -1,
        元素: null,
      }
    }
    let 結果 = {
      位置: 0,
      元素: this[0],
    }
    let 位置 = 1
    while (位置 < this.length) {
      if (排除的項目 && 排除的項目.取得狀態(位置)) {
        位置++
        continue
      }
      let 目前的元素 = this[位置]
      if (比較函數(目前的元素, 結果.元素)) {
        結果 = {
          位置: 位置,
          元素: 目前的元素,
        }
      }
      位置++
    }
    return 結果
  }

  /**
   * 外積。
   * @param {向量} 對象
   * @return {向量} 傳回新向量。
   * @example
   * const v1 = new 向量([3, 4, 1])
   * const v2 = new 向量([3, 7, 5])
   * const v3 = v1.外積(v2) // [13, -12, 9]
   */
  外積 (對象) {
    return new 向量(this[1] * 對象[2] - this[2] * 對象[1],
                  this[2] * 對象[0] - this[0] * 對象[2],
                  this[0] * 對象[1] - this[1] * 對象[0])
  }

  /**
   * 內積
   * @param {向量} 對象
   * @return {number}
   * @example
   * const v1 = new Vector([3, 4, 1])
   * const v2 = new Vector([3, 7, 5])
   * const product = v1.dot(v2) // 42
   */
  內積 (對象) {
    return 對象.reduce((acc, curr, index) => acc + curr * this[index], 0)
  }

  #找第一個符合條件的元素 (數值, 排除的項目, 比較函數) {
    向量.#檢查排除的項目是否有效(排除的項目)
    let 位置 = 0
    while (位置 < this.length) {
      if (排除的項目 && 排除的項目.取得狀態(位置)) {
        位置++
        continue
      }
      let 目前的元素 = this[位置]
      if (比較函數(目前的元素, 數值)) {
        return {
          位置: 位置,
          元素: 目前的元素,
        }
      }
      位置++
    }
    return {
      位置: -1,
      元素: null,
    }
  }

  /**
   * 每一個元素乘上傳入的數值。
   * @param {number} 數值
   * @return {向量} 向量本身。
   * @throws {型別錯誤}
   */
  乘 (數值) {
    if (型別.不是數值(數值)) {
      throw new 型別錯誤('傳入的參數應為數值。')
    }
    for (let i = 0; i < this.length; i++) {
      this[i] *= 數值
    }
    return this
  }

  /**
   * 每個元素會被回呼函數回傳值取代。如果元素的索引在排除的項目中設為 true，便會被排除。
   * @param {位元陣列} 排除的項目
   * @param 回呼函數
   * @return {向量} 向量本身
   * @throws {型別錯誤} 如果排除的項目不是位元陣列會拋出此例外。
   */
  修改每個元素但是排除 (排除的項目, 回呼函數) {
    if (!(排除的項目 instanceof 位元陣列)) {
      throw new 型別錯誤('排除的項目必須是位元陣列。')
    }
    for (let i = 0; i < this.length; i++) {
      if (排除的項目.取得狀態(i)) {
        continue
      }
      this[i] = 回呼函數(this[i], i)
    }
    return this
  }

  /**
   * 每一個元素加上傳入的對象(數值或向量)。
   * @param {number|向量} 對象
   * @return {向量} 新向量。
   * @throws {參數錯誤}
   */
  加 (對象) {
    if (對象 instanceof 向量) {
      if (對象.length !== this.length) {
        throw new 參數錯誤('對象的長度必須與向量相同。')
      }
    } else if (型別.不是數值(對象)) {
      throw new 型別錯誤('對象必須是數值或向量。')
    }

    let 新向量 = new 向量(this.length)
    if (型別.是數值(對象)) {
      for (let i = 0; i < this.length; i++) {
        新向量[i] = this[i] + 對象
      }
    } else {
      for (let i = 0; i < this.length; i++) {
        新向量[i] = this[i] + 對象[i]
      }
    }
    return 新向量
  }

  /**
   * 加入元素。
   * @param {array|number} 元素 要加入的元素可以是單一數值或是陣列。
   * @return {向量} 新向量（包含加入的元素）。
   */
  加入 (元素) {
    let 新向量 = this.複製()
    let 參數陣列 = Array.from(arguments)
    參數陣列.forEach(x => {
      if (型別.是陣列(x)) {
        x.forEach(y => 新向量.push(y))
      } else {
        新向量.push(x)
      }
    })
    return 新向量
  }

  /**
   * 尋找最大值。
   * @return {{元素: number, 位置: number}}
   * @param {位元陣列} 排除的項目
   */
  最大值 (排除的項目) {
    return this.#找符合條件的元素(排除的項目, (目前的元素, 結果) => 目前的元素 > 結果)
  }

  /**
   * 尋找最小值。
   * @return {{元素: number, 位置: number}}
   * @param {位元陣列} 排除的項目
   */
  最小值 (排除的項目) {
    return this.#找符合條件的元素(排除的項目, (目前的元素, 結果) => 目前的元素 < 結果)
  }

  /**
   * 在元素中尋找是否有相鄰的兩個數字。
   * @param {number} a
   * @param {number} b
   * @return {boolean}
   */
  有相鄰的數字 (a, b) {
    if (this.length <= 1) {
      return false
    }
    const 第一個項目的位置 = this.indexOf(a)
    return 第一個項目的位置 < this.length - 1 && 型別.數值相等(this[第一個項目的位置 + 1], b)
  }

  /**
   * 與對象是否相等。當兩個數值差異小於 0.00000001 時，會被認為是相等。
   * @param {向量} 對象
   * @return {boolean}
   * @throws {型別錯誤} 如果對象不是向量會拋出此例外。
   */
  相等於 (對象) {
    if (!(對象 instanceof 向量)) {
      throw new 型別錯誤('對象必須是向量。')
    }
    if (對象.length !== this.length) {
      return false
    }
    for (let i = 0; i < this.length; i++) {
      if (!型別.數值相等(this[i], 對象[i])) {
        return false
      }
    }
    return true
  }

  /**
   * 第一個大於數值的元素。
   * @param {number} 數值
   * @param {位元陣列} [排除的項目]
   * @return {{元素: number, 位置: number}|{元素: null, 位置: number}}
   * @throws {型別錯誤} 如果傳入的參數不是位元陣列會拋出此例外。
   */
  第一個大於 (數值, 排除的項目) {
    return this.#找第一個符合條件的元素(數值, 排除的項目, (目前的元素, 數值) => 目前的元素 > 數值)
  }

  /**
   * 第一個小於數值的元素。
   * @param {number} 數值
   * @param {位元陣列} [排除的項目]
   * @return {{元素: number, 位置: number}|{元素: null, 位置: number}}
   * @throws {型別錯誤} 如果傳入的參數不是位元陣列會拋出此例外。
   */
  第一個小於 (數值, 排除的項目) {
    return this.#找第一個符合條件的元素(數值, 排除的項目, (目前的元素, 數值) => 目前的元素 < 數值)
  }

  /**
   * 所有的項目加總。
   * @param {位元陣列} 排除的項目
   * @return {number}
   * @throws {型別錯誤} 如果傳入的參數不是位元陣列會拋出此例外。
   */
  總和 (排除的項目) {
    向量.#檢查排除的項目是否有效(排除的項目)
    let 剩下的項目 = 排除的項目
      ? this.filter((x, index) => !排除的項目.取得狀態(index))
      : this
    return 剩下的項目.reduce((acc, curr) => acc + curr, 0)
  }

  /**
   * 複自己成為新向量。
   * @return {向量}
   */
  複製 () {
    let 新向量 = new 向量(this.length)
    for (let i = 0; i < this.length; i++) {
      新向量[i] = this[i]
    }
    return 新向量
  }

  /**
   * 遍歷每個元素，如果元素的索引在排除的項目中設為 true，便會被排除。
   * @param {位元陣列} 排除的項目
   * @param 回呼函數
   * @return {向量} 向量本身
   * @throws {型別錯誤} 如果排除的項目不是位元陣列會拋出此例外。
   */
  遍歷每個元素但是排除 (排除的項目, 回呼函數) {
    if (!(排除的項目 instanceof 位元陣列)) {
      throw new 型別錯誤('排除的項目必須是位元陣列。')
    }

    for (let i = 0; i < this.length; i++) {
      if (排除的項目.取得狀態(i)) {
        continue
      }
      回呼函數(this[i], i)
    }
    return this
  }
}

module.exports = { 向量 }
