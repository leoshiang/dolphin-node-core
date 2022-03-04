const { Bits } = require('../src/Bits')
const { IndexOutOfRangeException } = require('../src/Exceptions')

describe('測試 constructor', function () {
  test('未指定長度，length 應該等於 0', () => {
    let bits = new Bits()
    expect(bits.length).toBe(0)
  })

  test('傳入非數值的長度，length 應該等於 0', () => {
    let bits = new Bits('a')
    expect(bits.length).toBe(0)
  })

  test('傳入 33，長度應該等於 33', () => {
    let bits = new Bits(33)
    expect(bits.length).toBe(33)
  })
})

describe('測試 forEach', function () {
  test('如果 callback 不是函數，應不做動作，回傳本身', () => {
    let bits = new Bits(4)
    bits.on(0)
    bits.on(2)
    expect(bits.forEach()).toBe(bits)
  })

  test('設定 [1,0,1,0]，應該依次取得 [1,0,1,1]', () => {
    let bits = new Bits(4)
    bits.on(0)
    bits.on(2)

    let result = []
    bits.forEach((x) => result.push(x))

    expect(result).toStrictEqual([true, false, true, false])
  })

  test('執行完，應回傳本身', () => {
    let bits = new Bits(4)
    bits.on(0)
    bits.on(2)
    expect(bits.forEach(() => {})).toBe(bits)
  })
})

describe('測試 setLength', function () {
  test('指定長度 33，長度應該等於 33', () => {
    let bits = new Bits()
    bits.length = 33
    expect(bits.length).toBe(33)
  })

  test('指定非數值的長度，長度應該不變', () => {
    let bits = new Bits()
    bits.length = 33
    bits.length = 'a'
    expect(bits.length).toBe(33)
  })

  test('指定長度 65 之後指定長度 33，長度應等於 33', () => {
    let bits = new Bits()
    bits.length = 65
    bits.length = 33
    expect(bits.length).toBe(33)
  })
})

describe('測試 fromInt32', function () {
  test('指定 0xaaaaaaaa ，長度應該等於 32', () => {
    let bits = new Bits()
    bits.fromInt32(0xaaaaaaaa)
    expect(bits.length).toBe(32)
  })

  test('指定 0xaaaaaaaa ，奇數位元應等於 1', () => {
    let bits = new Bits()
    bits.fromInt32(0xaaaaaaaa)
    bits.forEach(function (value, index) {
      expect(value | 0).toBe(index % 2)
    })
  })
})

describe('測試 set', function () {
  test('set 指定長度 128 偶數位元設為 1，偶數位元應等於 1', () => {
    let bits = new Bits(128)
    for (let i = 0; i <= 127; i++) {
      bits.set(i, i % 2 !== 0)
    }

    for (let j = 0; j <= 127; j++) {
      expect(bits.isOn(j) | 0).toBe(j % 2)
    }
  })
})

describe('測試 索引', function () {
  test('索引超出範圍，應拋出例外', () => {
    let bits = new Bits(128)
    expect(() => bits.on(200)).toThrow(IndexOutOfRangeException)
  })
})


describe('測試 toInt32', function () {
  test('0應回傳0', () => {
    let bits = new Bits()
    expect(bits.toInt32()).toBe(0)
  })

  test('11110000應回傳240', () => {
    let bits = new Bits(8)
    bits.on(4)
    bits.on(5)
    bits.on(6)
    bits.on(7)
    expect(bits.toInt32()).toBe(240)
  })
})
