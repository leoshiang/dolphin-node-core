const Matrix = require('../src/Matrix')

describe('測試 constructor', () => {
  test('建立2x2矩陣，dimensions.rows 和 columns 應等於 2', () => {
    let m = new Matrix(2, 2)
    expect(m.rows).toBe(2)
    expect(m.columns).toBe(2)
  })

  test('建立2x2矩陣，每一個元素應等於 0', () => {
    let m = new Matrix(2, 2)
    expect(m[0][0]).toBe(0)
    expect(m[0][1]).toBe(0)
    expect(m[1][0]).toBe(0)
    expect(m[1][1]).toBe(0)
  })
})

describe('測試 add', () => {
  test('[1,2][3,4] + [1,2][3,4] 應等於[2,4][6,8]', () => {
    let m1 = new Matrix(2, 2)
    m1[0][0] = 1
    m1[0][1] = 2
    m1[1][0] = 3
    m1[1][1] = 4
    let m2 = new Matrix(2, 2)
    m2[0][0] = 1
    m2[0][1] = 2
    m2[1][0] = 3
    m2[1][1] = 4
    let m3 = m1.add(m2)
    expect(m3[0][0]).toBe(2)
    expect(m3[0][1]).toBe(4)
    expect(m3[1][0]).toBe(6)
    expect(m3[1][1]).toBe(8)
  })
})

describe('測試 clear', () => {
  test('建立2x2矩陣，clear 之後 rows 和 columns 應等於0', () => {
    let m = new Matrix(2, 2).clear()
    expect(m.rows).toBe(0)
    expect(m.columns).toBe(0)
  })
})

describe('測試 column', () => {
  test('建立[1,2][3,4]矩陣，column(0) 應等於 [1,3]', () => {
    let m = new Matrix(2, 2)
    m[0][0] = 1
    m[0][1] = 2
    m[1][0] = 3
    m[1][1] = 4
    let expected = m.column(0)
    expect(expected[0]).toBe(1)
    expect(expected[1]).toBe(3)
  })

  test('建立[1,2][3,4]矩陣，column(1) 應等於 [2,4]', () => {
    let m = new Matrix(2, 2)
    m[0][0] = 1
    m[0][1] = 2
    m[1][0] = 3
    m[1][1] = 4
    let expected = m.column(1)
    expect(expected[0]).toBe(2)
    expect(expected[1]).toBe(4)
  })
})

describe('測試 fill', () => {
  test('建立2x2矩陣，fill(2)，每一個元素應等於2', () => {
    let m = new Matrix(2, 2).fill(2)
    expect(m[0][0]).toBe(2)
    expect(m[0][1]).toBe(2)
    expect(m[1][0]).toBe(2)
    expect(m[1][1]).toBe(2)
  })
})

describe('測試 resize', () => {
  test('建立2x2矩陣 fill(2)，resize(3,3) 新的元素應等於0', () => {
    let m = new Matrix(2, 2).fill(2).resize(3, 3)
    expect(m[0][0]).toBe(2)
    expect(m[0][1]).toBe(2)
    expect(m[1][0]).toBe(2)
    expect(m[1][1]).toBe(2)
    expect(m[0][2]).toBe(0)
    expect(m[1][2]).toBe(0)
    expect(m[2][1]).toBe(0)
    expect(m[2][2]).toBe(0)
  })

  test('建立2x2矩陣，resize(1,1) 原本的元素應不變', () => {
    let m = new Matrix(2, 2).fill(2).resize(1, 1)
    expect(m[0][0]).toBe(2)
  })

  test('建立2x2矩陣，resize(1,1) 之後 rows 和 columns 應等於1', () => {
    let m = new Matrix(2, 2).fill(2).resize(1, 1)
    expect(m.rows).toBe(1)
    expect(m.columns).toBe(1)
  })
})

describe('測試 subtract', () => {
  test('[1,2][3,4] + [1,2][3,4] 應等於[2,4][6,8]', () => {
    let m1 = new Matrix(2, 2)
    m1[0][0] = 1
    m1[0][1] = 2
    m1[1][0] = 3
    m1[1][1] = 4
    let m2 = new Matrix(2, 2)
    m2[0][0] = 1
    m2[0][1] = 2
    m2[1][0] = 3
    m2[1][1] = 4
    let m3 = m1.subtract(m2)
    expect(m3[0][0]).toBe(0)
    expect(m3[0][1]).toBe(0)
    expect(m3[1][0]).toBe(0)
    expect(m3[1][1]).toBe(0)
  })
})
