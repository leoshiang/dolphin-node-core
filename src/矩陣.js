const {向量} = require('./向量')
const {
    型別錯誤,
    參數錯誤,
} = require('./例外')
const 型別 = require('./型別')

/**
 * 此 callback 會在遍歷每一個 直行 時被呼叫一次。
 *
 * @callback 每一個直行回呼函式
 * @param {*} value 向量。
 * @param {*} 直行編號  直行 編號。
 */

/**
 * 此 callback 會在遍歷每一個元素時被呼叫一次。
 *
 * @callback forEachCallback
 * @param {*} value 值。
 * @param {*} 橫列  橫列 編號。
 * @param {*} 直行  直行 編號。
 */

/**
 * 此 callback 會在遍歷每一個 橫列 時被呼叫一次。
 *
 * @callback 每一個橫列回呼函式
 * @param {*} value 值。
 * @param {*} 橫列編號  橫列 編號。
 */

/**
 * @class
 * @classdesc 二維陣列。
 */
class 矩陣 extends Array {

    #橫列數
    #直行數
    #預設值

    /**
     * @constructor
     * @param {number|Array} [橫列數] 列數。
     * @param {number|Array} [直行數]
     * @param {number} [預設值]
     * @example
     * let m1 = new 矩陣() // []
     * let m2 = new 矩陣(2, 2) // [[0, 0], [0, 0]]
     * let m3 = new 矩陣([2, 3, 1],
     *                     [4, 7, 2],
     *                     [3, 1, 1]) // [[2, 3, 1], [4, 7, 2], [3, 1, 1]]
     * let m4 = new 矩陣([2, 3, 1], 1, [3, 1, 1]) // [[2, 3, 1], [3, 1, 1]]
     */
    constructor(橫列數 = 0, 直行數 = 0, 預設值) {
        super()
        this.清除內容()
        this.#預設值 = 型別.未定義(預設值)
            ? 0
            : 預設值
        if (型別.是陣列(橫列數)) {
            this.#以陣列值做初始化(Array.from(arguments))
        } else {
            this.設定維度(橫列數 || 0, 直行數 || 0)
            this.填滿(this.#預設值)
        }
    }

    /**
     * 取得 橫列數。
     * @return {*}
     */
    get 橫列數() {
        return this.#橫列數
    }

    /**
     * 取得 直行數。
     * @return {*}
     */
    get 直行數() {
        return this.#直行數
    }

    #以陣列值做初始化(arrayList) {
        let 維度 = this.#取得維度(arrayList)
        this.length = 0
        arrayList.forEach(x => {
            if (型別.不是陣列(x)) {
                return
            }
            let newRow = new Array(維度.直行數)
            let 直行 = 0
            while (直行 < 維度.直行數) {
                newRow[直行] = x[直行]
                直行++
            }
            this.push(newRow)
        })
        this.#橫列數 = 維度.橫列數
        this.#直行數 = 維度.直行數
    }

    #加減運算(對象, 數值運算, 矩陣運算) {
        let 運算式
        if (型別.是數值(對象)) {
            運算式 = 數值運算
        } else if (對象 instanceof 矩陣) {
            運算式 = 矩陣運算
        } else {
            throw new 型別錯誤('對象必須是數值或是矩陣。')
        }

        let 新矩陣 = new 矩陣(this.#橫列數, this.#直行數)
        for (let 橫列 = 0; 橫列 < this.#橫列數; 橫列++) {
            for (let 直行 = 0; 直行 < this.#直行數; 直行++) {
                運算式(橫列, 直行, 新矩陣)
            }
        }
        return 新矩陣
    }

    /**
     * 找出最長的陣列長度當作直行數，有效的陣列數目當作橫列數。
     * @param {*} arrayList 陣列串列。
     * @return {{直行數: number, 橫列數: number}}
     */
    #取得維度(arrayList) {
        let 直行數 = 0
        let 橫列數 = 0
        arrayList.forEach(x => {
            if (型別.不是陣列(x)) {
                return
            }
            直行數 = Math.max(直行數, x.length)
            橫列數++
        })
        return {
            直行數: 直行數,
            橫列數: 橫列數,
        }
    }

    /**
     * 與另一個矩陣或數值乘。
     * @param {矩陣} 對象
     * @return {矩陣} 新矩陣。
     * @throws {型別錯誤} 當參數 對象 不是 矩陣 時，會拋出此例外。
     * @example
     * let m = new 矩陣([1, 2], [3, 4], [5, 6])
     * let n = new 矩陣([1, 2, 3, 4], [5, 6, 7, 8])
     * let result = m.multiply(n)
     */
    乘(對象) {
        if (!(對象 instanceof 矩陣)) {
            throw new 型別錯誤('對象必須是矩陣。')
        }
        if (this.#直行數 !== 對象.橫列數) {
            throw new 參數錯誤('對象的橫列數必須與此陣列的直行數相同。')
        }

        let 新矩陣 = new 矩陣(this.橫列數, 對象.直行數)
        for (let 橫列 = 0; 橫列 < this.橫列數; 橫列++) {
            let 新矩陣的橫列 = 新矩陣[橫列]
            for (let 直行 = 0; 直行 < 對象.直行數; 直行++) {
                let 加總 = 0
                for (let c = 0; c < this.#直行數; c++) {
                    加總 += this[橫列][c] * 對象[c][直行]
                }
                新矩陣的橫列[直行] = 加總
            }
        }
        return 新矩陣
    }

    /**
     * 與另一個矩陣相加或是加上一個數值。
     * @param {矩陣|number} 對象
     * @return {矩陣} 新矩陣。
     * @throws {型別錯誤}
     * @example
     * let m1 = new 矩陣([1, 2], [3, 4])
     * let m2 = new 矩陣([5, 6], [7, 8])
     * let m3 = m1.add(m2) // [[6, 8],[10, 12]]
     */
    加(對象) {
        const 加上數值 = (橫列, 直行, 新矩陣) => 新矩陣[橫列][直行] = this[橫列][直行] + 對象
        const 矩陣相加 = (橫列, 直行, 新矩陣) => 新矩陣[橫列][直行] = this[橫列][直行] + 對象[橫列][直行]
        return this.#加減運算(對象, 加上數值, 矩陣相加)
    }

    /**
     * 填入數值。
     * @param {number} 數值 要填入的數值。
     * @return {矩陣} 矩陣本身。
     * @example
     * let m = new 矩陣(2, 2).填滿(2)
     */
    填滿(數值) {
        this.forEach(橫列 => 橫列.fill(數值))
        return this
    }

    是正方矩陣() {
        return this.#橫列數 === this.#直行數
    }

    /**
     * 取得橫列的值。
     * @param {number} 橫列編號 從 0 開始的橫列編號。
     * @return {向量} 回傳向量。
     * @example
     * let m = new 矩陣(2, 2)
     * m[0][0] = 1
     * m[0][1] = 2
     * m[1][0] = 3
     * m[1][1] = 4
     * console.log(m.橫列(0))
     */
    橫列(橫列編號) {
        return new 向量(this[橫列編號])
    }

    /**
     * 遍歷每一列（橫列）。
     * @param {每一個橫列回呼函式} callback 回呼函數。
     * @return {矩陣} 矩陣本身。
     * @example
     * new 矩陣(3, 3).fill(1).forEachRow((x) => console.log(x))
     */
    每一個橫列(callback) {
        for (let 橫列編號 = 0; 橫列編號 < this.#橫列數; 橫列編號++) {
            callback(this[橫列編號], 橫列編號)
        }
        return this
    }

    /**
     * 遍歷每一行（直行）。
     * @param {每一個直行回呼函式} callback 回呼函數。
     * @return {矩陣} 矩陣本身。
     * @example
     * new 矩陣(3, 3).fill(1).forEachColumn((x) => console.log(x))
     */
    每一個直行(callback) {
        for (let 直行編號 = 0; 直行編號 < this.#直行數; 直行編號++) {
            callback(this.直行(直行編號), 直行編號)
        }
        return this
    }

    /**
     * 清除矩陣。
     * @return {矩陣} 矩陣本身。
     * @example
     * let m = new 矩陣(2, 2).清除內容()
     */
    清除內容() {
        this.length = 0
        this.#橫列數 = 0
        this.#直行數 = 0
        return this
    }

    /**
     * 與另一個矩陣相減或是減去一個數值。
     * @param {矩陣|number} 對象
     * @return {矩陣} 新矩陣。
     * @throws {型別錯誤}
     * @example
     * let m1 = new 矩陣([1, 2], [3, 4])
     * let m2 = new 矩陣([5, 6], [7, 8])
     * let m3 = m1.減(m2) // [[6, 8],[10, 12]]
     */
    減(對象) {
        const 減去數值 = (橫列, 直行, 新矩陣) => 新矩陣[橫列][直行] = this[橫列][直行] - 對象
        const 矩陣相減 = (橫列, 直行, 新矩陣) => 新矩陣[橫列][直行] = this[橫列][直行] - 對象[橫列][直行]
        return this.#加減運算(對象, 減去數值, 矩陣相減)
    }

    /**
     * 取得直行的值。
     * @param {number} 直行編號 從 0 開始的直行編號。
     * @return {向量} 回傳向量。
     * @example
     * let m = new 矩陣([1, 2], [3, 4])
     * console.log(m.直行(0)) // [2, 4]
     */
    直行(直行編號) {
        let 新向量 = new 向量(this.#橫列數)
        this.forEach((橫列, 橫列編號) => 新向量[橫列編號] = 橫列[直行編號])
        return 新向量
    }

    /**
     * 所有元素的加總。
     * @return {number}
     * @example
     * let m1 = new 矩陣(2, 2)
     * m1[0][0] = 1
     * m1[0][1] = 2
     * m1[1][0] = 3
     * m1[1][1] = 4
     * console.log(m1.總和())
     */
    總和() {
        let 結果 = 0
        for (let 橫列 = 0; 橫列 < this.#橫列數; 橫列++) {
            let 列資料 = this[橫列]
            for (let 直行 = 0; 直行 < this.#直行數; 直行++) {
                結果 += 列資料[直行]
            }
        }
        return 結果
    }

    /**
     * 設定維度，所有資料會被清除，並以預設值填滿。
     * @param {number} 橫列數 橫列數。
     * @param {number} 直行數 直行數。
     * @return {矩陣} 矩陣本身。
     * @example
     * let m = new 矩陣(2, 2).填滿(2).設定維度(3, 3)
     */
    設定維度(橫列數, 直行數) {
        this.length = 0
        this.#橫列數 = 橫列數
        this.#直行數 = 直行數
        for (let 橫列 = 0; 橫列 < this.#橫列數; 橫列++) {
            this.push(new Array(this.#直行數).fill(this.#預設值))
        }
        return this
    }

    /**
     * 將矩陣設為單位矩陣（對角線元素為 1 ，其餘元素為 0）
     * @return {矩陣}
     * @example
     * let m = new 矩陣(3, 3).identity()
     */
    設為單位矩陣() {
        if (!this.是正方矩陣()) {
            return this
        }
        this.填滿(0)
        for (let 橫列 = 0; 橫列 < this.#橫列數; 橫列++) {
            this[橫列][橫列] = 1
        }
        return this
    }
}

module.exports = {矩陣}
