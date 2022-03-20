const 矩陣 = require('../src/矩陣')
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

    test('[1,2][3,4]乘2，應等於[2,4][6,8]', () => {
        let m = new 矩陣([1, 2], [3, 4]).乘(2)
        expect(m.橫列數).toBe(2)
        expect(m.直行數).toBe(2)
        expect(m.橫列(0)).toEqual([2, 4])
        expect(m.橫列(1)).toEqual([6, 8])
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

    test('A(BC)=(AB)C', () => {
        const a = new 矩陣([1, 2], [3, 4])
        const b = new 矩陣([4, 5], [6, 7])
        const c = new 矩陣([8, 3], [9, 0])
        expect(a.乘(b.乘(c))).toEqual(a.乘(b).乘(c))
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
        const m = 矩陣.單位矩陣(3)
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
})

describe('測試【轉置】', () => {
    test('空矩陣應拋出例外。', () => {
        const m = new 矩陣([])
        expect(() => m.轉置()).toThrow(Error)
    })

    test('[1,2,3][4,5,6]，轉置之後應為[1,4][2,5][3,6]', () => {
        const m = new 矩陣([1, 2, 3], [4, 5, 6])
        const t = m.轉置()
        expect(t.直行數).toBe(2)
        expect(t.橫列數).toBe(3)
        expect(t.橫列(0)).toEqual([1, 4])
        expect(t.橫列(1)).toEqual([2, 5])
        expect(t.橫列(2)).toEqual([3, 6])
    })

    test('矩陣的轉置矩陣的行列式等於這個矩陣的行列式。', () => {
        const m = new 矩陣([1, 2, 3], [4, 5, 6], [7, 9, 8])
        expect(m.轉置().行列式()).toBe(m.行列式())
    })

    test('純量的轉置是同樣的純量。', () => {
        const m = new 矩陣([1, 2, 3], [4, 5, 6], [7, 9, 8])
        expect(m.乘(3).轉置()).toEqual(m.轉置().乘(3))
    })

    test('轉置是自身逆運算。', () => {
        const m = new 矩陣([1, 2, 3], [4, 5, 6], [7, 9, 8])
        expect(m.轉置().轉置()).toEqual(m)
    })

    test('轉置是從m × n矩陣的向量空間到所有n × m矩陣的向量空間的線性映射。', () => {
        const A = new 矩陣([1, 2, 3], [4, 5, 6], [7, 9, 8])
        const B = new 矩陣([3, 2, 1], [9, 1, 2], [5, 0, 3])

        expect(A.加(B).轉置()).toEqual(A.轉置().加(B.轉置()))
    })
})

describe('測試【複製】', () => {
    test('[1,2,3][4,5,6]，複製之後應為[1,2,3][4,5,6]', () => {
        const m = new 矩陣([1, 2, 3], [4, 5, 6])
        const c = m.複製()
        expect(c.直行數).toBe(3)
        expect(c.橫列數).toBe(2)
        expect(c.橫列(0)).toEqual([1, 2, 3])
        expect(c.橫列(1)).toEqual([4, 5, 6])
    })
})

describe('測試【行列式】', () => {
    test('[2,2,3,4][5,6,7,8][9,19,11,1][34,4,3,0]，應為-262', () => {
        const m = new 矩陣([2, 2, 3, 4], [5, 6, 7, 8], [9, 19, 11, 1], [34, 4, 3, 0])
        expect(m.行列式()).toBe(-262)
    })

    test('[0,2,3,4][5,0,7,8][9,19,0,1][34,4,3,0]，應為362', () => {
        const m = new 矩陣([0, 2, 3, 4], [5, 0, 7, 8], [9, 19, 0, 1], [34, 4, 3, 0])
        expect(m.行列式()).toBe(362)
    })
})

describe('測試【逆矩陣】', () => {
    test('行列式為0，應拋出例外', () => {
        const m = new 矩陣([1, 0], [0, 0])
        expect(() => m.逆矩陣()).toThrow(Error)
    })

    test('空矩陣應拋出例外', () => {
        const m = new 矩陣()
        expect(() => m.逆矩陣()).toThrow(Error)
    })

    test('不是方陣，應拋出例外', () => {
        const m = new 矩陣([2, 2, 3, 1], [4, 5, 6, 3])
        expect(() => m.逆矩陣()).toThrow(Error)
    })

    test('[1,2][3,4]', () => {
        const m = new 矩陣([1, 2], [3, 4])
        const r = m.逆矩陣()
        expect(r.橫列數).toBe(m.橫列數)
        expect(r.直行數).toBe(m.直行數)
        expect(r.橫列(0)).toEqual([-2, 1])
        expect(r.橫列(1)).toEqual([1.5, -0.5])
    })

    test('M x M-1 = [1]', () => {
        const m = new 矩陣([1, 2], [3, 4])
        const r = m.逆矩陣().乘(m)
        expect(r).toEqual(矩陣.單位矩陣(2))
    })

    test('[2,2,3,1][4,5,6,3][7,8,3,3][2,2,2,0]', () => {
        const m = new 矩陣([2, 2, 3, 1], [4, 5, 6, 3], [7, 8, 3, 3], [2, 2, 2, 0])
        const r = m.逆矩陣()
        expect(r.橫列數).toBe(m.橫列數)
        expect(r.直行數).toBe(m.直行數)
        expect(r.橫列(0)).toEqual([3, -1.3333333333333335, 0.33333333333333337, -1])
        expect(r.橫列(1)).toEqual([-3, 1.1666666666666667, -0.16666666666666666, 1.25])
        expect(r.橫列(2)).toEqual([0, 0.16666666666666666, -0.16666666666666666, 0.25])
        expect(r.橫列(3)).toEqual([1, -0.16666666666666666, 0.16666666666666666, -1.25])
    })

    test('[2,2,3,1][4,5,6,3][7,8,3,3][2,2,2,0]', () => {
        const m = new 矩陣([2, 2, 3, 1], [4, 5, 6, 3], [7, 8, 3, 3], [2, 2, 2, 0])
        const r = m.逆矩陣().乘(m)
        expect(r).toEqual(矩陣.單位矩陣(4))
    })
})

describe('測試【上三角矩陣】', () => {
    test('[2,2,3,1][4,5,6,3][7,8,3,3][2,2,2,0]', () => {
        const m = new 矩陣([2, 2, 3, 1], [4, 5, 6, 3], [7, 8, 3, 3], [2, 2, 2, 0])
        const r = m.上三角矩陣()
        expect(r.橫列數).toBe(m.橫列數)
        expect(r.直行數).toBe(m.直行數)
        expect(r.橫列(0)).toEqual([2, 2, 3, 1])
        expect(r.橫列(1)).toEqual([0, 1, 0, 1])
        expect(r.橫列(2)).toEqual([0, 0, -7.5, -1.5])
        expect(r.橫列(3)).toEqual([0, 0, 0, -0.8])
    })
})

describe('測試【列秩】', () => {
    test('[2,2,3,1][4,5,6,3][7,8,3,3][2,2,2,0]，列秩等於4', () => {
        const m = new 矩陣([2, 2, 3, 1], [4, 5, 6, 3], [7, 8, 3, 3], [2, 2, 2, 0])
        expect(m.列秩()).toBe(4)
    })
})

describe('測試【列秩】', () => {
    test('[2,2,3,1][4,5,6,3][7,8,3,3][2,2,2,0]，列秩等於4', () => {
        const m = new 矩陣([2, 2, 3, 1], [4, 5, 6, 3], [7, 8, 3, 3], [2, 2, 2, 0])
        expect(m.列秩()).toBe(4)
    })
})

describe('測試【相等】', () => {
    test('[1,2][3,4]與[7,8,3,3][2,2,2,0]應不相等', () => {
        const m1 = new 矩陣([1, 2], [3, 4])
        const m2 = new 矩陣([7, 8, 3, 3], [2, 2, 2, 0])
        expect(m1.相等(m2)).toBe(false)
    })

    test('[1,2][3,2]與[1,2][3,4]應不相等', () => {
        const m1 = new 矩陣([1, 2], [3, 2])
        const m2 = new 矩陣([1, 2], [3, 4])
        expect(m1.相等(m2)).toBe(false)
    })

    test('[1.00000001,2][3,2]與[1,2][3,4]應不相等', () => {
        const m1 = new 矩陣([1.00000001, 2], [3, 2])
        const m2 = new 矩陣([1, 2], [3, 4])
        expect(m1.相等(m2)).toBe(false)
    })

    test('[1.000000001,2][3,2]與[1,2][3,4]應相等', () => {
        const m1 = new 矩陣([1.000000001, 2], [3, 2])
        const m2 = new 矩陣([1, 2], [3, 2])
        expect(m1.相等(m2)).toBe(true)
    })

    test('[1,2][3,4]與[1,2][3,4]應相等', () => {
        const m1 = new 矩陣([1, 2], [3, 4])
        const m2 = new 矩陣([1, 2], [3, 4])
        expect(m1.相等(m2)).toBe(true)
    })
})

describe('測試交換律', () => {
    test('A+B=B+A', () => {
        const a = new 矩陣([1, 2], [3, 4])
        const b = new 矩陣([4, 5], [6, 7])
        expect(a.加(b)).toEqual(b.加(a))
    })

    test('A-B <> B-A', () => {
        const a = new 矩陣([1, 2], [3, 4])
        const b = new 矩陣([4, 5], [6, 7])
        expect(a.減(b)).not.toEqual(b.減(a))
    })

    test('(A+B)+C=A+(B+C(', () => {
        const a = new 矩陣([1, 2], [3, 4])
        const b = new 矩陣([4, 5], [6, 7])
        const c = new 矩陣([8, 3], [9, 0])
        expect(a.加(b).加(c)).toEqual(a.加(b.加(c)))
    })
})

describe('是反對稱矩陣', () => {
    test('At=-A', () => {
        const m = new 矩陣([0, 2, -1], [-2, 0, -4], [1, 4, 0])
        expect(m.是反對稱矩陣()).toBe(true)
    })

    test('At=-A', () => {
        const m = new 矩陣([0, 1, -1], [-2, 0, -4], [1, 4, 0])
        expect(m.是反對稱矩陣()).toBe(false)
    })
})

describe('是對稱矩陣', () => {
    test('At=A', () => {
        const m = new 矩陣([1, 2, 3], [2, 4, -5], [3, -5, 6])
        expect(m.是對稱矩陣()).toBe(true)
    })
})
