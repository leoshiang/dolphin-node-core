const 向量 = require('./向量')
const {
    型別錯誤,
    參數錯誤,
    索引超出範圍錯誤
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

    /**
     * 將矩陣設為單位矩陣（對角線元素為 1 ，其餘元素為 0）
     * @return {矩陣}
     * @example
     * let m = new 矩陣(3, 3).identity()
     */
    static 單位矩陣(橫列數) {
        let 結果 = new 矩陣(橫列數, 橫列數)
        for (let 橫列 = 0; 橫列 < 橫列數; 橫列++) {
            結果[橫列][橫列] = 1
        }
        return 結果
    }

    #以陣列值做初始化(陣列集合) {
        let 維度 = this.#從陣列集合找出維度(陣列集合)
        this.length = 0
        陣列集合
            .filter(陣列 => 型別.是陣列(陣列))
            .forEach(陣列 => {
                let 橫列 = new Array(維度.直行數)
                let 直行 = 0
                while (直行 < 維度.直行數) {
                    橫列[直行] = 陣列[直行] || 0
                    直行++
                }
                this.push(橫列)
            })
        this.#橫列數 = 維度.橫列數
        this.#直行數 = 維度.直行數
    }

    #加減運算(m, 數值運算, 矩陣運算) {
        let 運算式
        if (型別.是數值(m)) {
            運算式 = 數值運算
        } else if (m instanceof 矩陣) {
            運算式 = 矩陣運算
        } else {
            throw new 型別錯誤('m 必須是數值或是矩陣。')
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
     * @param {*} 陣列集合 陣列串列。
     * @return {{直行數: number, 橫列數: number}}
     */
    #從陣列集合找出維度(陣列集合) {
        let 直行數 = 0
        let 橫列數 = 0
        陣列集合.forEach(x => {
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

    #高斯約旦消去法計算反矩陣(矩陣) {
        for (let 對角線編號 = 0; 對角線編號 < 矩陣.橫列數; 對角線編號++) {
            let 橫列 = 矩陣.橫列(對角線編號).乘(1 / 矩陣[對角線編號][對角線編號])
            矩陣.設定橫列(對角線編號, 橫列)
            for (let r = 對角線編號 + 1; r < 矩陣.橫列數; r++) {
                矩陣.設定橫列(r, 矩陣.橫列(r).加(橫列.乘(-1 * 矩陣[r][對角線編號])))
            }
        }

        for (let 對角線編號 = 矩陣.橫列數 - 1; 對角線編號 > 0; 對角線編號--) {
            for (let r = 對角線編號; r > 0; r--) {
                if (矩陣[r - 1][對角線編號] === 0) {
                    continue
                }
                let v1 = 矩陣.橫列(對角線編號).乘(-1 * 矩陣[r - 1][對角線編號])
                let v2 = 矩陣.橫列(r - 1)
                let 橫列向量 = v2.加(v1)
                矩陣.設定橫列(r - 1, 橫列向量)
            }
        }
        return 矩陣.複製範圍(0, this.直行數, this.橫列數, this.直行數)
    }

    上三角矩陣() {
        let 結果 = this.複製()
        for (let 對角線編號 = 0; 對角線編號 < 結果.橫列數; 對角線編號++) {
            let 橫列 = 結果.橫列(對角線編號)
            for (let 橫列編號 = 對角線編號 + 1; 橫列編號 < 結果.橫列數; 橫列編號++) {
                let m = -結果[橫列編號][對角線編號] / 結果[對角線編號][對角線編號]
                結果.設定橫列(橫列編號, 結果.橫列(橫列編號).加(橫列.乘(m)))
            }
        }
        return 結果
    }

    /**
     * 與另一個矩陣或數值乘。
     * @param {矩陣|number} m
     * @return {矩陣} 新矩陣。
     * @throws {型別錯誤} 當參數 m 不是矩陣或數值時，會拋出此例外。
     * @example
     * let m = new 矩陣([1, 2], [3, 4], [5, 6])
     * let n = new 矩陣([1, 2, 3, 4], [5, 6, 7, 8])
     * let result = m.multiply(n)
     */
    乘(m) {
        let 新矩陣

        if (型別.是數值(m)) {
            新矩陣 = new 矩陣(this.橫列數, this.直行數)
            for (let 橫列 = 0; 橫列 < this.橫列數; 橫列++) {
                for (let 直行 = 0; 直行 < this.直行數; 直行++) {
                    新矩陣[橫列][直行] = this[橫列][直行] * m
                }
            }
            return 新矩陣
        }

        if (!(m instanceof 矩陣)) {
            throw new 型別錯誤('m 必須是矩陣。')
        }
        if (this.#直行數 !== m.橫列數) {
            throw new 參數錯誤('矩陣橫列數目應等於 m 矩陣直行數目。')
        }
        新矩陣 = new 矩陣(this.橫列數, m.直行數)
        for (let 橫列 = 0; 橫列 < this.橫列數; 橫列++) {
            let 新矩陣的橫列 = 新矩陣[橫列]
            for (let 直行 = 0; 直行 < m.直行數; 直行++) {
                let 加總 = 0
                for (let c = 0; c < this.#直行數; c++) {
                    加總 += this[橫列][c] * m[c][直行]
                }
                新矩陣的橫列[直行] = 加總
            }
        }
        return 新矩陣
    }

    交換橫列(橫列1, 橫列2) {
        if (橫列1 < 0 || 橫列1 >= this.#直行數) {
            throw new 索引超出範圍錯誤(`橫列1編號超出範圍(0,${this.#橫列數 - 1}`)
        }
        if (橫列2 < 0 || 橫列2 >= this.#直行數) {
            throw new 索引超出範圍錯誤(`橫列2編號超出範圍(0,${this.#橫列數 - 1}`)
        }
        let temp = this[橫列1]
        this[橫列1] = this[橫列2]
        this[橫列2] = temp
        return this
    }

    交換直行(直行1, 直行2) {
        if (直行1 < 0 || 直行1 >= this.#直行數) {
            throw new 索引超出範圍錯誤(`直行1編號超出範圍(0,${this.#直行數 - 1}`)
        }
        if (直行2 < 0 || 直行2 >= this.#直行數) {
            throw new 索引超出範圍錯誤(`直行2編號超出範圍(0,${this.#直行數 - 1}`)
        }
        for (let r = 0; r < this.#橫列數; r++) {
            let temp = this[r][直行1]
            this[r][直行1] = this[r][直行2]
            this[r][直行2] = temp
        }
        return this
    }

    冪(次方) {
        if (次方 === 0) return 矩陣.單位矩陣(this.橫列數)
        if (次方 === 1) return this.複製()
        let 結果 = this.乘(this)
        for (let i = 3; i <= 次方; i++) {
            結果 = 結果.乘(this)
        }
        return 結果
    }

    列秩() {
        let 非零的橫列數目 = 0
        let 上三角矩陣 = this.上三角矩陣()
        for (let 橫列編號 = 0; 橫列編號 < 上三角矩陣.橫列數; 橫列編號++) {
            if (this.橫列(橫列編號).非零()) 非零的橫列數目++
        }
        return 非零的橫列數目
    }

    /**
     * 與另一個矩陣相加或是加上一個數值。
     * @param {矩陣|number} m
     * @return {矩陣} 新矩陣。
     * @throws {型別錯誤}
     * @example
     * let m1 = new 矩陣([1, 2], [3, 4])
     * let m2 = new 矩陣([5, 6], [7, 8])
     * let m3 = m1.add(m2) // [[6, 8],[10, 12]]
     */
    加(m) {
        const 加上數值 = (橫列, 直行, 新矩陣) => 新矩陣[橫列][直行] = this[橫列][直行] + m
        const 矩陣相加 = (橫列, 直行, 新矩陣) => 新矩陣[橫列][直行] = this[橫列][直行] + m[橫列][直行]
        return this.#加減運算(m, 加上數值, 矩陣相加)
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

    擴展(m) {
        let 新矩陣 = new 矩陣(this.橫列數, this.直行數 + m.直行數)
        for (let 橫列編號 = 0; 橫列編號 < 新矩陣.橫列數; 橫列編號++) {
            for (let 直行編號 = 0; 直行編號 < this.直行數; 直行編號++) {
                新矩陣[橫列編號][直行編號] = this[橫列編號][直行編號]
            }
            for (let 直行編號 = 0; 直行編號 < m.直行數; 直行編號++) {
                新矩陣[橫列編號][直行編號 + this.直行數] = m[橫列編號][直行編號]
            }
        }
        return 新矩陣
    }

    是反對稱矩陣() {
        return this.轉置().相等(this.乘(-1))
    }

    是對稱矩陣() {
        return this.轉置().相等(this)
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
     * @param {矩陣|number} m
     * @return {矩陣} 新矩陣。
     * @throws {型別錯誤}
     * @example
     * let m1 = new 矩陣([1, 2], [3, 4])
     * let m2 = new 矩陣([5, 6], [7, 8])
     * let m3 = m1.減(m2) // [[6, 8],[10, 12]]
     */
    減(m) {
        const 減去數值 = (橫列, 直行, 新矩陣) => 新矩陣[橫列][直行] = this[橫列][直行] - m
        const 矩陣相減 = (橫列, 直行, 新矩陣) => 新矩陣[橫列][直行] = this[橫列][直行] - m[橫列][直行]
        return this.#加減運算(m, 減去數值, 矩陣相減)
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
     * 此矩陣與 m 是否相等。
     * @param {矩陣} m
     * @return {boolean} 如果兩個矩陣的維度和每一個元素都相同便回傳 true，否則回傳 false。
     * @throws {型別錯誤} 如果傳入的參數不是矩陣會拋出此例外。
     */
    相等(m) {
        if (!(m instanceof 矩陣)) {
            throw new 型別錯誤('參數必須是矩陣。')
        }
        if (this.#橫列數 !== m.橫列數 || this.#直行數 !== m.直行數) return false
        for (let 橫列編號 = 0; 橫列編號 < this.#橫列數; 橫列編號++) {
            for (let 直行編號 = 0; 直行編號 < this.#直行數; 直行編號++) {
                if (!型別.數值相等(this[橫列編號][直行編號], m[橫列編號][直行編號])) return false
            }
        }
        return true
    }

    /**
     * 所有元素的總和。
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
        const 橫列每個元素加總 = (加總, 元素) => 加總 + 元素
        const 每個橫列加總 = (加總, 橫列) => 加總 + (橫列.reduce(橫列每個元素加總, 0))
        return this.reduce(每個橫列加總, 0);
    }

    行列式() {
        let 暫存矩陣 = this.複製()
        for (let 對角線編號 = 0; 對角線編號 < 暫存矩陣.#橫列數 - 1; 對角線編號++) {
            for (let 橫列編號 = 對角線編號 + 1; 橫列編號 < 暫存矩陣.#橫列數; 橫列編號++) {
                let 對角線元素 = 暫存矩陣[對角線編號][對角線編號]
                if (對角線元素 === 0) {
                    暫存矩陣.交換橫列(對角線編號, 橫列編號)
                    暫存矩陣.設定橫列(橫列編號, 暫存矩陣.橫列(橫列編號).乘(-1))
                    continue
                }
                let m = -1 * 暫存矩陣[橫列編號][對角線編號] / 對角線元素
                let 橫列向量 = 暫存矩陣.橫列(橫列編號)
                橫列向量 = 橫列向量.加(暫存矩陣.橫列(對角線編號).乘(m))
                暫存矩陣.設定橫列(橫列編號, 橫列向量)
            }
        }

        let 結果 = 暫存矩陣[0][0]
        for (let 對角線編號 = 1; 對角線編號 < 暫存矩陣.#橫列數; 對角線編號++) {
            結果 = 結果 * 暫存矩陣[對角線編號][對角線編號]
        }
        return 結果
    }

    複製() {
        let 新矩陣 = new 矩陣(this.#橫列數, this.#直行數)
        for (let 橫列 = 0; 橫列 < this.#橫列數; 橫列++) {
            for (let 直行 = 0; 直行 < this.#直行數; 直行++) {
                新矩陣[橫列][直行] = this[橫列][直行]
            }
        }
        return 新矩陣
    }

    複製範圍(開始橫列, 開始直行, 橫列數, 直行數) {
        let 結果 = new 矩陣(橫列數, 直行數)
        for (let 橫列 = 0; 橫列 < 橫列數; 橫列++) {
            for (let 直行 = 0; 直行 < 直行數; 直行++) {
                結果[橫列][直行] = this[開始橫列 + 橫列][開始直行 + 直行]
            }
        }
        return 結果
    }

    /**
     * 設定某一橫列的值。
     * @param {number} 橫列編號
     * @param {向量|array} 值
     */
    設定橫列(橫列編號, 值) {
        if (橫列編號 < 0 || 橫列編號 >= this.#橫列數) {
            throw new 索引超出範圍錯誤(`橫列編號超出範圍(0,${this.#橫列數 - 1}`)
        }
        if (!(值 instanceof 向量) || 型別.不是陣列(值)) {
            throw new 型別錯誤('參數值必須是向量或矩陣。')
        }
        for (let 直行 = 0; 直行 < this.#直行數; 直行++) {
            this[橫列編號][直行] = 值[直行]
        }
        return this
    }

    /**
     * 設定某一直行的值。
     * @param {number} 直行編號
     * @param {向量|array} 值
     */
    設定直行(直行編號, 值) {
        if (直行編號 < 0 || 直行編號 >= this.#直行數) {
            throw new 索引超出範圍錯誤(`直行編號超出範圍(0,${this.#直行數 - 1}`)
        }
        if (!(值 instanceof 向量) || 型別.不是陣列(值)) {
            throw new 型別錯誤('參數值必須是向量或矩陣。')
        }
        for (let 橫列 = 0; 橫列 < this.#橫列數; 橫列++) {
            this[橫列][直行編號] = 值[橫列]
        }
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
     * 轉置矩陣。
     * @throws {Error} 如果矩陣的維度為0，則拋出此例外。
     * @return {矩陣}
     */
    轉置() {
        if (this.#直行數 === 0 || this.#橫列數 === 0) {
            throw new Error('因為矩陣的維度為0，此矩陣不可逆。')
        }
        let 新矩陣 = new 矩陣(this.#直行數, this.#橫列數)
        for (let 橫列 = 0; 橫列 < 新矩陣.#橫列數; 橫列++) {
            for (let 直行 = 0; 直行 < 新矩陣.#直行數; 直行++) {
                新矩陣[橫列][直行] = this[直行][橫列]
            }
        }
        return 新矩陣
    }

    /**
     * 計算逆矩陣。
     * @return {矩陣}
     * @throws {Error} 如果矩陣的行列式為0，則拋出此例外。
     */
    逆矩陣() {
        if (this.行列式() === 0) {
            throw new Error('因為矩陣的行列式為零，此矩陣不可逆。')
        }
        if (this.#直行數 === 0 || this.#橫列數 === 0) {
            throw new Error('因為矩陣的維度為0，此矩陣不可逆。')
        }
        if (this.#直行數 !== this.#橫列數) {
            throw new Error('因為不是方陣，此矩陣不可逆。')
        }
        let 暫存矩陣 = this.擴展(矩陣.單位矩陣(this.橫列數))
        return this.#高斯約旦消去法計算反矩陣(暫存矩陣)
    }

    文字表示() {
        let 結果 = '[\r\n'
        this.forEach((row) => {
            結果 += '  [' +
                row.reduce((acc, curr) => acc + ' ' + 型別.去除小數部分連續的0((型別.極小值(curr) ? 0 : curr)) + ' ', '')
            結果 += ']\r\n'
        })
        結果 += ']\r\n'
        return 結果
    }
}

module.exports = 矩陣
