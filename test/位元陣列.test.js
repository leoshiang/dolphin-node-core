const 位元陣列 = require('../src/位元陣列')
const {
    型別錯誤,
    參數錯誤,
    索引超出範圍錯誤,
} = require('../src/例外')

describe('測試 constructor', function () {
    test('未指定長度，位元數應為 0', () => {
        let bits = new 位元陣列()
        expect(bits.位元數).toBe(0)
    })

    test('位元數小於零，應拋出TypeError', () => {
        expect(() => new 位元陣列(-1)).toThrow(型別錯誤)
    })

    test('位元數0，應配置0頁', () => {
        let bits = new 位元陣列(0)
        expect(bits.分頁數目).toBe(0)
        expect(bits.位元數).toBe(0)
    })

    test('位元數24，應配置1頁', () => {
        let bits = new 位元陣列(24)
        expect(bits.分頁數目).toBe(1)
        expect(bits.位元數).toBe(24)
    })

    test('位元數25，應配置2頁', () => {
        let bits = new 位元陣列(25)
        expect(bits.分頁數目).toBe(2)
        expect(bits.位元數).toBe(25)
    })

    test('二進位字串 01010101，應能解析為 01010101', () => {
        let bits = new 位元陣列('01010101')
        expect(bits.取得二進位字串()).toBe('01010101')
    })

    test('1010101010101010101010101，應能解析為1010101010101010101010101', () => {
        const bits = new 位元陣列('1010101010101010101010101')
        expect(bits.取得二進位字串()).toBe('1010101010101010101010101')
    })
})

describe('測試【取得狀態】', function () {
    test('位元編號不是數值，應拋出TypeError例外', () => {
        const bits = new 位元陣列(24)
        expect(() => bits.取得狀態()).toThrow(型別錯誤)
    })

    test('位元數 24，取得位元編號 -1 的狀態，應拋出IndexOutOfRangeError', () => {
        const bits = new 位元陣列(24)
        expect(() => bits.取得狀態(-1)).toThrow(索引超出範圍錯誤)
    })

    test('位元數 24，取得位元編號 24 的狀態，應拋出IndexOutOfRangeError', () => {
        const bits = new 位元陣列(24)
        expect(() => bits.取得狀態(24)).toThrow(索引超出範圍錯誤)
    })

    test('位元數 24，取得位元編號 25 的狀態，應拋出IndexOutOfRangeError', () => {
        const bits = new 位元陣列(24)
        expect(() => bits.取得狀態(25)).toThrow(索引超出範圍錯誤)
    })

    test('位元數 24，取得位元編號 1 的狀態，應取得false', () => {
        const bits = new 位元陣列(24)
        expect(bits.取得狀態(1)).toBe(false)
    })
})

describe('測試【設定狀態】', function () {
    test('位元編號不是數值，應拋出TypeError例外', () => {
        const bits = new 位元陣列(24)
        expect(() => bits.設定狀態()).toThrow(型別錯誤)
    })

    test('位元數 24，設定位元編號 -1 的狀態，應拋出IndexOutOfRangeError', () => {
        const bits = new 位元陣列(24)
        expect(() => bits.設定狀態(-1)).toThrow(索引超出範圍錯誤)
    })

    test('位元數 24，設定位元編號 24 的狀態，應拋出IndexOutOfRangeError', () => {
        const bits = new 位元陣列(24)
        expect(() => bits.設定狀態(24)).toThrow(索引超出範圍錯誤)
    })

    test('位元數 24，設定位元編號 25 的狀態，應拋出IndexOutOfRangeError', () => {
        const bits = new 位元陣列(24)
        expect(() => bits.設定狀態(25)).toThrow(索引超出範圍錯誤)
    })

    test('位元數 24，設定位元編號 1 的狀態，應回傳本身', () => {
        const bits = new 位元陣列(24)
        expect(bits.設定狀態(1, true)).toBe(bits)
    })

    test('9個位元，狀態從true改為false，應等於 000000000', () => {
        const bits = new 位元陣列(9)
        bits.設定狀態(1, true)
        bits.設定狀態(3, true)
        bits.設定狀態(5, true)
        bits.設定狀態(7, true)
        bits.設定狀態(1, false)
        bits.設定狀態(3, false)
        bits.設定狀態(5, false)
        bits.設定狀態(7, false)
        expect(bits.取得二進位字串()).toBe('000000000')
    })
    test('9個位元，位元1-8設為true，應等於 111111110', () => {
        const bits = new 位元陣列(9)
        bits.設定狀態(1, true)
        bits.設定狀態(2, true)
        bits.設定狀態(3, true)
        bits.設定狀態(4, true)
        bits.設定狀態(5, true)
        bits.設定狀態(6, true)
        bits.設定狀態(7, true)
        bits.設定狀態(8, true)
        expect(bits.取得二進位字串()).toBe('111111110')
    })
})

describe('測試【解析二進位字串】', function () {
    test('10101010，應能解析為10101010', () => {
        const bits = new 位元陣列(0).解析二進位字串('10101010')
        expect(bits.取得二進位字串()).toBe('10101010')
    })

    test('1010101010101010101010101，應能解析為1010101010101010101010101', () => {
        const bits = new 位元陣列(0).解析二進位字串('1010101010101010101010101')
        expect(bits.取得二進位字串()).toBe('1010101010101010101010101')
    })
})

describe('測試【and】', function () {
    test('如果傳入的陣列長度不一樣，應拋出InvalidParameterError', () => {
        const b1 = new 位元陣列('10101010')
        const b2 = new 位元陣列('010101011')
        expect(() => b1.and(b2)).toThrow(參數錯誤)
    })

    test('10101010 與 01010101 做 and 運算，結果應為 00000000', () => {
        const b1 = new 位元陣列('10101010')
        const b2 = new 位元陣列('01010101')
        expect(b1.and(b2).取得二進位字串()).toBe('00000000')
    })

    test('11110000 與 11110000 做 and 運算，結果應為 11110000', () => {
        const b1 = new 位元陣列('11110000')
        const b2 = new 位元陣列('11110000')
        expect(b1.and(b2).取得二進位字串()).toBe('11110000')
    })

    test(
        '1111000011110000111100001 與 0000111100001111000011111 做 and 運算，結果應為 0000000000000000000000001',
        () => {
            const b1 = new 位元陣列('1111000011110000111100001')
            const b2 = new 位元陣列('0000111100001111000011111')
            expect(b1.and(b2).取得二進位字串()).toBe('0000000000000000000000001')
        })
})

describe('測試【or】', function () {
    test('如果傳入的陣列長度不一樣，應拋出InvalidParameterError', () => {
        const b1 = new 位元陣列('10101010')
        const b2 = new 位元陣列('010101011')
        expect(() => b1.or(b2)).toThrow(參數錯誤)
    })

    test('10101010 與 01010101 做 or 運算，結果應為 11111111', () => {
        const b1 = new 位元陣列('10101010')
        const b2 = new 位元陣列('01010101')
        expect(b1.or(b2).取得二進位字串()).toBe('11111111')
    })

    test('11110000 與 11110000 做 and 運算，結果應為 11110000', () => {
        const b1 = new 位元陣列('11110000')
        const b2 = new 位元陣列('11110000')
        expect(b1.or(b2).取得二進位字串()).toBe('11110000')
    })

    test(
        '1111000011110000111100001 與 0000111100001111000011111 做 or 運算，結果應為 1111111111111111111111111',
        () => {
            const b1 = new 位元陣列('1111000011110000111100001')
            const b2 = new 位元陣列('0000111100001111000011111')
            expect(b1.or(b2).取得二進位字串()).toBe('1111111111111111111111111')
        })
})

describe('測試【not】', function () {
    test('10101010 做 not 運算，應回傳 01010101', () => {
        const bits = new 位元陣列('10101010')
        const newBits = bits.not()
        expect(newBits.取得二進位字串()).toBe('01010101')
    })

    test('1111000011110000111100001 做 not 運算，結果應為 0000111100001111000011110',
        () => {
            const bits = new 位元陣列('1111000011110000111100001')
            const newBits = bits.not()
            expect(newBits.取得二進位字串()).toBe('0000111100001111000011110')
        })
})

describe('測試【xor】', function () {
    test('如果傳入的陣列長度不一樣，應拋出InvalidParameterError', () => {
        const b1 = new 位元陣列('10101010')
        const b2 = new 位元陣列('010101011')
        expect(() => b1.xor(b2)).toThrow(參數錯誤)
    })

    test('101 與 011 做 xor 運算，結果應為 110', () => {
        const b1 = new 位元陣列('101')
        const b2 = new 位元陣列('011')
        expect(b1.xor(b2).取得二進位字串()).toBe('110')
    })

    test(
        '1111000011110000111100001 與 0000111100001111000011111 做 xor 運算，結果應為 1111111111111111111111111',
        () => {
            const b1 = new 位元陣列('1111000011110000111100001')
            const b2 = new 位元陣列('0000111100001111000011111')
            expect(b1.xor(b2).取得二進位字串()).toBe('1111111111111111111111110')
        })
})

describe('測試【設定所有位元的狀態】', function () {
    test('位元數 25，設定所有位元的狀態 true，結果應為 1111111111111111111111111', () => {
        const bits = new 位元陣列(25).設定所有位元的狀態(true)
        expect(bits.取得二進位字串()).toBe('1111111111111111111111111')
    })

    test('位元數 25，設定所有位元的狀態 false，結果應為 0000000000000000000000000', () => {
        const bits = new 位元陣列(25).設定所有位元的狀態(false)
        expect(bits.取得二進位字串()).toBe('0000000000000000000000000')
    })
})

describe('測試【複製】', function () {
    test('1111000011110000111100001，複製結果應為 1111000011110000111100001', () => {
        const bits = new 位元陣列('1111000011110000111100001')
        const newBits = bits.複製()
        expect(newBits.取得二進位字串()).toBe('1111000011110000111100001')
    })
})
