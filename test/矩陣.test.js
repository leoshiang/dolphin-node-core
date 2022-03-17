const {矩陣} = require('../src/矩陣')
const {
    參數錯誤,
    型別錯誤,
} = require('../src/例外')

describe('測試constructor', () => {
    test('沒指定初始的橫列數與直行數，橫列數與直行數應為0', () => {
        let m = new 矩陣()
        expect(m.直行數).toBe(0)
        expect(m.橫列數).toBe(0)
    })

    test('傳入初始的橫列數與直行數，橫列數與直行數應等於傳入的數值', () => {
        let m = new 矩陣(5, 10)
        expect(m.直行數).toBe(10)
        expect(m.橫列數).toBe(5)
    })

    test('傳入多個陣列，每個元素應該與陣列元素相同', () => {
        const m = new 矩陣([2, 3, 1], [4, 7, 2], [3, 1, 1])
        expect(m[0]).toEqual([2, 3, 1])
        expect(m[1]).toEqual([4, 7, 2])
        expect(m[2]).toEqual([3, 1, 1])
    })

    test('傳入多個陣列，中間穿插非陣列的資料，非陣列的資料應被忽略', () => {
        const m = new 矩陣([2, 3, 1], 1, [3, 1, 1])
        expect(m.橫列數).toStrictEqual(2)
        expect(m.直行數).toStrictEqual(3)
    })
})

describe('測試【乘】', () => {
    test('傳入undefined，應拋出例外型別錯誤', () => {
        let m = new 矩陣(3, 3)
        expect(() => m.乘()).toThrow(型別錯誤)
    })

    test('兩個矩陣維度不同，應拋出參數錯誤例外', () => {
        let m = new 矩陣([1, 2, 3], [2, 3, 4], [3, 4, 5])
        let n = new 矩陣(1, 2).填滿(1)
        expect(() => n.乘(m)).toThrow(參數錯誤)
    })

    test('兩個矩陣相乘', () => {
        let m = new 矩陣([1, 2], [3, 4], [5, 6])
        let n = new 矩陣([1, 2, 3, 4], [5, 6, 7, 8])
        let result = m.乘(n)
        expect(result.橫列數).toBe(3)
        expect(result.直行數).toBe(4)
        expect(result[0]).toEqual([11, 14, 17, 20])
        expect(result[1]).toEqual([23, 30, 37, 44])
        expect(result[2]).toEqual([35, 46, 57, 68])
    })
})

describe('測試【加】', () => {
    test('[1,2][3,4]加[5,6][7,8]應等於[6,8][10,12]', () => {
        let m1 = new 矩陣([1, 2], [3, 4])
        let m2 = new 矩陣([5, 6], [7, 8])
        let m3 = m1.加(m2)
        expect(m3[0][0]).toBe(6)
        expect(m3[0][1]).toBe(8)
        expect(m3[1][0]).toBe(10)
        expect(m3[1][1]).toBe(12)
    })

    test('[1,2][3,4]加3應等於[4,5][6,7]', () => {
        let m = new 矩陣([1, 2], [3, 4]).加(3)
        expect(m[0][0]).toBe(4)
        expect(m[0][1]).toBe(5)
        expect(m[1][0]).toBe(6)
        expect(m[1][1]).toBe(7)
    })

    test('對象不是數值或陣列，應拋出型別錯誤例外', () => {
        let m = new 矩陣([1, 2], [3, 4])
        expect(() => m.加('a')).toThrow(型別錯誤)
    })
})

describe('測試【總和】', () => {
    test('[1,2][3,4]加總應等於10', () => {
        let m1 = new 矩陣([1, 2], [3, 4])
        expect(m1.總和()).toBe(10)
    })
})

describe('測試【填滿】', () => {
    test('矩陣用2填滿，每一個元素應等於2', () => {
        let m = new 矩陣(2, 2).填滿(2)
        expect(m[0][0]).toBe(2)
        expect(m[0][1]).toBe(2)
        expect(m[1][0]).toBe(2)
        expect(m[1][1]).toBe(2)
    })
})

describe('測試【橫列】', () => {
    test('[1,2][3,4]，橫列(0)應等於[1,2]', () => {
        let m = new 矩陣([1, 2], [3, 4])
        let expected = m.橫列(0)
        expect(expected[0]).toBe(1)
        expect(expected[1]).toBe(2)
    })

    test('[1,2][3,4]，橫列(1)應等於[3,4]', () => {
        let m = new 矩陣([1, 2], [3, 4])
        let expected = m.橫列(1)
        expect(expected[0]).toBe(3)
        expect(expected[1]).toBe(4)
    })
})

describe('測試【每一個直行】', () => {
    test('3x3矩陣用1填滿，應傳[1,1,1]給回呼函式', () => {
        new 矩陣(3, 3).填滿(1).每一個直行((x) => {
            expect(x).toEqual([1, 1, 1])
        })
    })

    test('3x3矩陣，應將直行編號傳給回呼函式', () => {
        let 目前的直行編號 = 0
        new 矩陣(3, 3).每一個直行((元素, 直行編號) => {
            expect(直行編號).toBe(目前的直行編號++)
        })
    })

    test('應回傳自己', () => {
        let m = new 矩陣(3, 3)
        expect(m.每一個直行(() => {
        })).toBe(m)
    })
})

describe('測試【每一個橫列】', () => {
    test('3x3矩陣用1填滿，應傳[1,1,1]給回呼函式', () => {
        new 矩陣(3, 3).填滿(1).每一個橫列((x) => {
            expect(x).toEqual([1, 1, 1])
        })
    })

    test('3x3矩陣，應將橫列編號傳給回呼函式', () => {
        let 目前的橫列編號 = 0
        new 矩陣(3, 3).每一個橫列((x, 橫列編號) => {
            expect(橫列編號).toBe(目前的橫列編號++)
        })
    })

    test('應回傳自己', () => {
        let m = new 矩陣(3, 3)
        expect(m.每一個橫列(() => {
        })).toBe(m)
    })
})

describe('測試【清除內容】', () => {
    test('建立2x2矩陣，清除內容之後橫列數和直行數應等於0', () => {
        let m = new 矩陣(2, 2).清除內容()
        expect(m.橫列數).toBe(0)
        expect(m.直行數).toBe(0)
    })
})

describe('測試【減】', () => {
    test('[1,2][3,4]減[5,6][7,8]應等於[-4,-4][-4,-4]', () => {
        let m1 = new 矩陣([1, 2], [3, 4])
        let m2 = new 矩陣([5, 6], [7, 8])
        let m3 = m1.減(m2)
        expect(m3[0][0]).toBe(-4)
        expect(m3[0][1]).toBe(-4)
        expect(m3[1][0]).toBe(-4)
        expect(m3[1][1]).toBe(-4)
    })

    test('[1,2][3,4]減3應等於[-2,-1][0,1]', () => {
        let m = new 矩陣([1, 2], [3, 4]).減(3)
        expect(m[0][0]).toBe(-2)
        expect(m[0][1]).toBe(-1)
        expect(m[1][0]).toBe(0)
        expect(m[1][1]).toBe(1)
    })

    test('對象不是數值或陣列，應拋出型別錯誤例外', () => {
        let m = new 矩陣([1, 2], [3, 4])
        expect(() => m.減('a')).toThrow(型別錯誤)
    })
})

describe('測試【直行】', () => {
    test('[1,2][3,4]，直行(0)應等於[1,3]', () => {
        let m = new 矩陣([1, 2], [3, 4])
        expect(m.直行(0)).toEqual([1, 3])
    })

    test('[1,2][3,4]，直行(1)應等於[2,4]', () => {
        let m = new 矩陣([1, 2], [3, 4])
        expect(m.直行(1)).toEqual([2, 4])
    })
})

describe('測試【設定維度】', () => {
    test('矩陣設定維度之後，新的元素應等於0', () => {
        let m = new 矩陣(2, 2).填滿(2).設定維度(3, 3)
        expect(m[0][0]).toBe(0)
        expect(m[0][1]).toBe(0)
        expect(m[1][0]).toBe(0)
        expect(m[1][1]).toBe(0)
        expect(m[0][2]).toBe(0)
        expect(m[1][2]).toBe(0)
        expect(m[2][1]).toBe(0)
        expect(m[2][2]).toBe(0)
    })

    test('設定維度(1,1)之後，橫列數和直行數應等於1', () => {
        let m = new 矩陣(2, 2).填滿(2).設定維度(1, 1)
        expect(m.橫列數).toBe(1)
        expect(m.直行數).toBe(1)
    })
})

describe('測試【設為單位矩陣】', () => {
    test('3x3矩陣，對角線應為1，其餘為0', () => {
        const m = new 矩陣(3, 3).設為單位矩陣()
        expect(m[0][0]).toBe(1)
        expect(m[0][1]).toBe(0)
        expect(m[0][2]).toBe(0)
        expect(m[1][0]).toBe(0)
        expect(m[1][1]).toBe(1)
        expect(m[1][2]).toBe(0)
        expect(m[2][0]).toBe(0)
        expect(m[2][1]).toBe(0)
        expect(m[2][2]).toBe(1)
    })

    test('非方形矩陣，應回傳自己', () => {
        const m = new 矩陣(2, 3)
        expect(m.設為單位矩陣()).toBe(m)
    })
})
