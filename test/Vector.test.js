const Vector = require('../src/Vector')

describe('測試 constructor', function () {
  test('傳入數字，length 應等於數字', function () {
    const v = new Vector(4)
    expect(v.length).toBe(4)
  })

  test('傳入數字，每一個元素應等於 undefined', function () {
    const v = new Vector(4)
    expect(v[0]).toBe(undefined)
    expect(v[1]).toBe(undefined)
    expect(v[2]).toBe(undefined)
    expect(v[3]).toBe(undefined)
  })

  test('傳入陣列，length 應等於陣列長度', function () {
    const v = new Vector([1, 2, 3])
    expect(v.length).toBe(3)
  })

  test('傳入陣列，內容應與陣列相同', function () {
    const v = new Vector([1, 2, 3])
    expect(v[0]).toBe(1)
    expect(v[1]).toBe(2)
    expect(v[2]).toBe(3)
  })

  test('傳入陣列、數字，內容應為參數的所有元素', function () {
    const v = new Vector([1, 2, 3], 4)
    expect(v[0]).toBe(1)
    expect(v[1]).toBe(2)
    expect(v[2]).toBe(3)
    expect(v[3]).toBe(4)
  })

  test('傳入陣列、數字陣列，內容應為參數的所有元素', function () {
    const v = new Vector([1, 2, 3], 4, [5, 6, 7])
    expect(v[0]).toBe(1)
    expect(v[1]).toBe(2)
    expect(v[2]).toBe(3)
    expect(v[3]).toBe(4)
    expect(v[4]).toBe(5)
    expect(v[5]).toBe(6)
    expect(v[6]).toBe(7)
  })

  test('沒有傳入參數，length 應等於 0', function () {
    const v = new Vector()
    expect(v.length).toBe(0)
  })
})

describe('測試 add', function () {
  test('[1,2,3]+[4,5,6] 應等於 [5,7,9]', function () {
    const v = new Vector([1, 2, 3]).add(new Vector([4, 5, 6]))
    expect(v[0]).toBe(5)
    expect(v[1]).toBe(7)
    expect(v[2]).toBe(9)
  })
})

describe('測試 cross', function () {
  test('[3,4,1]x[3,7,5] 應等於 [13,-12,9]', function () {
    const result = new Vector([3, 4, 1]).cross(new Vector([3, 7, 5]))
    expect(result[0]).toBe(13)
    expect(result[1]).toBe(-12)
    expect(result[2]).toBe(9)
  })
})

describe('測試 dot', function () {
  test('[3,4,1]·[3,7,5] 應等於 42', function () {
    const result = new Vector([3, 4, 1]).dot(new Vector([3, 7, 5]))
    expect(result).toBe(42)
  })
})

describe('測試 norm', function () {
  test('[1,3] norm 應等於 3.1622776601683795', function () {
    const result = new Vector([1, 3]).norm()
    expect(result).toBe(3.1622776601683795)
  })
})

describe('測試 scaleBy', function () {
  test('[1,2,3]x3 應等於 [3,6,9]', function () {
    const v = new Vector([1, 2, 3]).scaleBy(3)
    expect(v[0]).toBe(3)
    expect(v[1]).toBe(6)
    expect(v[2]).toBe(9)
  })
})

describe('測試 subtract', function () {
  test('傳入長度相同的陣列，應將自身的元素加上陣列元素', function () {
    const v = new Vector([1, 2, 3]).subtract(new Vector([4, 5, 6]))
    expect(v[0]).toBe(-3)
    expect(v[1]).toBe(-3)
    expect(v[2]).toBe(-3)
  })
})

describe('測試 sum', function () {
  test('[1,2,3] 加總應等於 6', function () {
    const result = new Vector([1, 2, 3]).sum()
    expect(result).toBe(6)
  })
})
