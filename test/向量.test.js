const {向量} = require('../src/向量')
const {位元陣列} = require('../src/位元陣列')
const {
    型別錯誤,
    參數錯誤,
} = require('../src/例外')

describe('測試 constructor', function () {
    test('傳入數字，length 應等於數字', function () {
        const v = new 向量(4)
        expect(v.length).toBe(4)
    })

    test('傳入數字，每一個元素應等於0', function () {
        const v = new 向量(4)
        expect(v[0]).toBe(0)
        expect(v[1]).toBe(0)
        expect(v[2]).toBe(0)
        expect(v[3]).toBe(0)
    })

    test('傳入陣列，length 應等於陣列長度', function () {
        const v = new 向量([1, 2, 3])
        expect(v.length).toBe(3)
    })

    test('傳入陣列，內容應與陣列相同', function () {
        const v = new 向量([1, 2, 3])
        expect(v[0]).toBe(1)
        expect(v[1]).toBe(2)
        expect(v[2]).toBe(3)
    })

    test('傳入陣列、數字，內容應為參數的所有元素', function () {
        const v = new 向量([1, 2, 3], 4)
        expect(v[0]).toBe(1)
        expect(v[1]).toBe(2)
        expect(v[2]).toBe(3)
        expect(v[3]).toBe(4)
    })

    test('傳入陣列、數字陣列，內容應為參數的所有元素', function () {
        const v = new 向量([1, 2, 3], 4, [5, 6, 7])
        expect(v[0]).toBe(1)
        expect(v[1]).toBe(2)
        expect(v[2]).toBe(3)
        expect(v[3]).toBe(4)
        expect(v[4]).toBe(5)
        expect(v[5]).toBe(6)
        expect(v[6]).toBe(7)
    })

    test('沒有傳入參數，length 應等於0', function () {
        const v = new 向量()
        expect(v.length).toBe(0)
    })
})

describe('測試【加入】', function () {
    test('空向量，加入一個元素，length 應等於1', function () {
        const v1 = new 向量()
        const v2 = v1.加入(123)
        expect(v2.length).toBe(1)
        expect(v2[0]).toBe(123)
    })

    test('一個元素的向量，加入一個有三個元素的陣列，length 應等於4', function () {
        const v1 = new 向量([1])
        const v2 = v1.加入([2, 3, 4])
        expect(v2.length).toBe(4)
        expect(v2[1]).toBe(2)
        expect(v2[2]).toBe(3)
        expect(v2[3]).toBe(4)
    })

    test('一個元素的向量，加入兩個有三個元素的陣列，length 應等於7', function () {
        const v1 = new 向量([1])
        const v2 = v1.加入([2, 3, 4], [5, 6, 7])
        expect(v2.length).toBe(7)
        expect(v2[1]).toBe(2)
        expect(v2[2]).toBe(3)
        expect(v2[3]).toBe(4)
        expect(v2[4]).toBe(5)
        expect(v2[5]).toBe(6)
        expect(v2[6]).toBe(7)
    })
})

describe('測試【加】', function () {
    test('[1,2,3]加上1，應等於[2,3,4]', function () {
        const v = new 向量([1, 2, 3]).加(1)
        expect(v).toEqual([2, 3, 4])
    })

    test('[1,2,3]加上-1，應等於[0,1,2]', function () {
        const v = new 向量([1, 2, 3]).加(-1)
        expect(v).toEqual([0, 1, 2])
    })

    test('[1,2,3]加上[2,3,4]，應等於[3,5,7]', function () {
        const v = new 向量([1, 2, 3]).加(new 向量([2, 3, 4]))
        expect(v).toEqual([3, 5, 7])
    })

    test('[1,2,3]加上[2,3]，應拋出例外InvalidParameterError', function () {
        expect(() => new 向量([1, 2, 3]).加(new 向量([2, 3])))
            .toThrow(參數錯誤)
    })

    test('[1,2,3]加上"a"，應拋出例外TypeError', function () {
        expect(() => new 向量([1, 2, 3]).加('a')).toThrow(型別錯誤)
    })
})

describe('測試【乘】', function () {
    test('傳入的參數不是數值，應拋出TypeError例外', function () {
        const 測試向量 = new 向量([1, 2, 3, 4])
        expect(() => 測試向量.乘('a')).toThrow(型別錯誤)
    })

    test('[1,2,3]乘以2，應等於[2,4,6]', function () {
        const v = new 向量([1, 2, 3]).乘(2)
        expect(v).toEqual([2, 4, 6])
    })

    test('[1,2,3]乘以0.5，應等於[0.5,1,1.5]', function () {
        const v = new 向量([1, 2, 3]).乘(0.5)
        expect(v).toEqual([0.5, 1, 1.5])
    })
})

describe('測試【有相鄰的數字】', function () {
    test('[1]，[3,4]應不相鄰', function () {
        const v = new 向量([1])
        expect(v.有相鄰的數字(3, 4)).toBe(false)
    })

    test('[1,2,3,4]，[3,4]應相鄰', function () {
        const v = new 向量(1, 2, 3, 4)
        expect(v.有相鄰的數字(3, 4)).toBe(true)
    })

    test('[1,2,3,4]，[1,4]應不相鄰', function () {
        const v = new 向量(1, 2, 3, 4)
        expect(v.有相鄰的數字(1, 4)).toBe(false)
    })
})

describe('測試【遍歷每個元素但是排除】', function () {
    test('排除的項目不是Bits，應拋出TypeError例外', function () {
        const 五個數字的向量 = new 向量([1, 2, 3, 4, 5])
        expect(() => 五個數字的向量.遍歷每個元素但是排除()).toThrow(型別錯誤)
    })

    test('[1,2,3,4,5] 排除 [0,4]，回呼函數應收到[2,3,4]', function () {
        const 五個數字的向量 = new 向量([1, 2, 3, 4, 5])
        const 排除項目 = new 位元陣列(5).設定狀態(0, true).設定狀態(4, true)
        let 回呼函數收到的資料 = []
        const 回呼函數 = jest.fn(x => 回呼函數收到的資料.push(x))
        五個數字的向量.遍歷每個元素但是排除(排除項目, 回呼函數)
        expect(回呼函數).toBeCalledTimes(3)
        expect(回呼函數收到的資料).toStrictEqual([2, 3, 4])
    })
})

describe('測試【修改每個元素但是排除】', function () {
    test('排除的項目不是Bits，應拋出TypeError例外', function () {
        const 五個數字的向量 = new 向量([1, 2, 3, 4, 5])
        expect(() => 五個數字的向量.修改每個元素但是排除()).toThrow(型別錯誤)
    })

    test('[1,2,3,4,5]每個元素+1但是排除 [0,4]，最後向量應該是[1,3,4,5,5]', function () {
        const 五個數字的向量 = new 向量([1, 2, 3, 4, 5])
        const 排除項目 = new 位元陣列(5).設定狀態(0, true).設定狀態(4, true)
        五個數字的向量.修改每個元素但是排除(排除項目, x => x + 1)
        expect(五個數字的向量).toEqual([1, 3, 4, 5, 5])
    })
})

describe('測試【相等於】', function () {
    test('對象不是向量，應拋出TypeError例外', function () {
        const 測試向量 = new 向量([1, 2, 3, 4])
        expect(() => 測試向量.相等於('a')).toThrow(型別錯誤)
    })

    test('[1,2,3,4]應不等於[[1,2,3,4,5]', function () {
        const 測試向量 = new 向量([1, 2, 3, 4])
        const 向量2 = new 向量([1, 2, 3, 4, 5])
        expect(測試向量.相等於(向量2)).toBe(false)
    })

    test('[1,2,3,4,5]應等於[[1,2,3,4,5]', function () {
        const 測試向量 = new 向量([1, 2, 3, 4, 5])
        const 向量2 = new 向量([1, 2, 3, 4, 5])
        expect(測試向量.相等於(向量2)).toBe(true)
    })

    test('[1.00000001,2,3,4,5]應不等於[[1,2,3,4,5]', function () {
        const 測試向量 = new 向量([1.0000001, 2, 3, 4, 5])
        const 向量2 = new 向量([1, 2, 3, 4, 5])
        expect(測試向量.相等於(向量2)).toBe(false)
    })

    test('[1.000000001,2,3,4,5]應等於[[1,2,3,4,5]', function () {
        const 測試向量 = new 向量([1.00000001, 2, 3, 4, 5])
        const 向量2 = new 向量([1, 2, 3, 4, 5])
        expect(測試向量.相等於(向量2)).toBe(true)
    })
})

describe('測試【第一個大於】', function () {
    test('[1,2,3,4]第一個大於2的元素應為{Index:2,數值:3}', function () {
        const 測試向量 = new 向量([1, 2, 3, 4])
        expect(測試向量.第一個大於(2)).toStrictEqual({
            Index: 2,
            Value: 3,
        })
    })

    test('[1,2,3,4]第一個大於2的元素（排除位置1）應為{Index:2,數值:3}', function () {
        const 測試向量 = new 向量([1, 2, 3, 4])
        const 排除項目 = new 位元陣列('0010')
        expect(測試向量.第一個大於(2, 排除項目)).toStrictEqual({
            Index: 2,
            Value: 3,
        })
    })

    test('[1,2,3,4]第一個大於6的元素應為{Index:-1,Value:null}', function () {
        const 測試向量 = new 向量([1, 2, 3, 4])
        expect(測試向量.第一個大於(6)).toStrictEqual({
            Index: -1,
            Value: null,
        })
    })
})

describe('測試【第一個小於】', function () {
    test('[1,2,3,4]第一個小於3的元素應為{Index:0,數值:1}', function () {
        const 測試向量 = new 向量([1, 2, 3, 4])
        expect(測試向量.第一個小於(3)).toStrictEqual({
            Index: 0,
            Value: 1,
        })
    })

    test('[1,2,3,4]第一個小於4的元素（排除位置0）應為{Index:1,數值:2}', function () {
        const 測試向量 = new 向量([1, 2, 3, 4])
        const 排除項目 = new 位元陣列('0001')
        expect(測試向量.第一個小於(4, 排除項目)).toStrictEqual({
            Index: 1,
            Value: 2,
        })
    })
})

describe('測試【總和】', function () {
    test('[1,2,3,4]總和應為10', function () {
        const 測試向量 = new 向量([1, 2, 3, 4])
        expect(測試向量.總和()).toBe(10)
    })

    test('[1,2,3,4]（排除位置0）總和應為9', function () {
        const 測試向量 = new 向量([1, 2, 3, 4])
        const 排除項目 = new 位元陣列('0001')
        expect(測試向量.總和(排除項目)).toStrictEqual(9)
    })
})

describe('測試【最大值】', function () {
    test('效能測試：10000000個元素', function () {
        const 測試向量 = new 向量(10000000)
        expect(測試向量.最大值()).toStrictEqual({
            Index: 0,
            Value: 0,
        })
    })

    test('[]最大值應為{Value:null,Index:-1}', function () {
        const 測試向量 = new 向量()
        expect(測試向量.最大值()).toStrictEqual({
            Index: -1,
            Value: null,
        })
    })

    test('[1,2,3,4]最大值應為{Value:4,Index:3}', function () {
        const 測試向量 = new 向量([1, 2, 3, 4])
        expect(測試向量.最大值()).toStrictEqual({
            Value: 4,
            Index: 3,
        })
    })

    test('[1,2,3,4]排除4，應為{Value:3,Index:2}', function () {
        const 測試向量 = new 向量([1, 2, 3, 4])
        const 排除的項目 = new 位元陣列('1000')
        expect(測試向量.最大值(排除的項目)).toStrictEqual({
            Value: 3,
            Index: 2,
        })
    })

    test('[1,2,3,4]排除null，應拋出TypeError例外', function () {
        const 測試向量 = new 向量([1, 2, 3, 4])
        expect(() => 測試向量.最大值('a')).toThrow(型別錯誤)
    })
})

describe('測試【最小值】', function () {
    test('[4,3,2,1]最小值應為{Value:1,Index:3}', function () {
        const 測試向量 = new 向量([4, 3, 2, 1])
        expect(測試向量.最小值()).toStrictEqual({
            Value: 1,
            Index: 3,
        })
    })

    test('[4,3,2,1]排除4，應為{Value:1,Index:3}', function () {
        const 測試向量 = new 向量([4, 3, 2, 1])
        const 排除的項目 = new 位元陣列('0001')
        expect(測試向量.最小值(排除的項目)).toStrictEqual({
            Value: 1,
            Index: 3,
        })
    })
})

describe('測試【外積】', function () {
    test('[3,4,1]x[3,7,5]應等於[13,-12,9]', function () {
        const v1 = new 向量([3, 4, 1])
        const v2 = new 向量([3, 7, 5])
        const v3 = v1.外積(v2)
        expect(v3).toEqual([13, -12, 9])
    })
})

describe('測試【內積】', function () {
    test('[3,4,1].[3,7,5]應等於42', function () {
        const v1 = new 向量([3, 4, 1])
        const v2 = new 向量([3, 7, 5])
        expect(v1.內積(v2)).toBe(42)
    })
})
