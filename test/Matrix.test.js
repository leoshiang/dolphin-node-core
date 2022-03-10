const { Matrix } = require('../src/Matrix')

describe('測試 constructor', () => {
  test('沒指定初始的 rows & columns，columnCount 與 rowCount 應為 0', () => {
    let m = new Matrix()
    expect(m.columns).toBe(0)
    expect(m.rows).toBe(0)
  })

  test('傳入初始的 rows & columns，columnCount 與 rowCount 應相等', () => {
    let m = new Matrix(5, 10)
    expect(m.columns).toBe(10)
    expect(m.rows).toBe(5)
  })

  test('傳入多個陣列，每個元素應該與陣列元素相同', () => {
    const m = new Matrix([2, 3, 1], [4, 7, 2], [3, 1, 1])
    expect(m[0]).toEqual([2, 3, 1])
    expect(m[1]).toEqual([4, 7, 2])
    expect(m[2]).toEqual([3, 1, 1])
  })

  test('傳入多個陣列，中間穿插非陣列的資料，非陣列的資料應被忽略', () => {
    const m = new Matrix([2, 3, 1], 1, [3, 1, 1])
    expect(m.rows).toStrictEqual(2)
    expect(m.columns).toStrictEqual(3)
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

describe('測試 forEachColumn', () => {
  test('3x3 矩陣用 1 填滿，每一個 column 傳 [1,1,1] 給 callback', () => {
    new Matrix(3, 3).fill(1).forEachColumn((x) => {
      expect(x).toEqual([1, 1, 1])
    })
  })

  test('3x3 矩陣，應將 column 編號傳給 callback', () => {
    let currentColumn = 0
    new Matrix(3, 3)
      .fill(1)
      .forEachColumn((x, Column) => {
        expect(Column).toBe(currentColumn++)
      })
  })

  test('應回傳自己', () => {
    let m = new Matrix(3, 3)
    expect(m.forEachColumn(() => {})).toBe(m)
  })
})

describe('測試 forEachRow', () => {
  test('3x3 矩陣用 1 填滿，每一個 row 傳 [1,1,1] 給 callback', () => {
    new Matrix(3, 3).fill(1).forEachRow((x) => {
      expect(x).toEqual([1, 1, 1])
    })
  })

  test('3x3 矩陣，應將 row 編號傳給 callback', () => {
    let currentRow = 0
    new Matrix(3, 3)
      .fill(1)
      .forEachRow((x, row) => {
        expect(row).toBe(currentRow++)
      })
  })

  test('應回傳自己', () => {
    let m = new Matrix(3, 3)
    expect(m.forEachRow(() => {})).toBe(m)
  })
})

describe('測試 identity', () => {
  test('3x3矩陣，對角線應為1，其餘為0', () => {
    const m = new Matrix(3, 3).identity()
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
    const m = new Matrix(2, 3)
    expect(m.identity()).toBe(m)
  })

  test('對角線元素為 1 ，其餘元素為 0', () => {
    const m = new Matrix(3, 3).fill(1).identity()
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

describe('測試 multiply', () => {
  test('傳入 undefined，應拋出例外 TypeError', () => {
    let m = new Matrix(3, 3)
    expect(() => m.multiply()).toThrow(TypeError)
  })

  test('兩個矩陣大小不同，應不會相乘', () => {
    let m = new Matrix([1, 2, 3], [2, 3, 4], [3, 4, 5])
    let n = new Matrix(1, 2)
    n.fill(1)

    let result = n.multiply(m)
    expect(result[0]).toEqual([1, 1])
  })

  test('兩個矩陣相乘', () => {
    let m = new Matrix([1, 2], [3, 4], [5, 6])
    let n = new Matrix([1, 2, 3, 4], [5, 6, 7, 8])
    let result = m.multiply(n)
    expect(result.rows).toBe(3)
    expect(result.columns).toBe(4)
    expect(result[0]).toEqual([11, 14, 17, 20])
    expect(result[1]).toEqual([23, 30, 37, 44])
    expect(result[2]).toEqual([35, 46, 57, 68])
  })
})

describe('測試 row', () => {
  test('建立[1,2][3,4]矩陣，row(0) 應等於 [1,2]', () => {
    let m = new Matrix(2, 2)
    m[0][0] = 1
    m[0][1] = 2
    m[1][0] = 3
    m[1][1] = 4
    let expected = m.row(0)
    expect(expected[0]).toBe(1)
    expect(expected[1]).toBe(2)
  })

  test('建立[1,2][3,4]矩陣，row(1) 應等於 [3,4]', () => {
    let m = new Matrix(2, 2)
    m[0][0] = 1
    m[0][1] = 2
    m[1][0] = 3
    m[1][1] = 4
    let expected = m.row(1)
    expect(expected[0]).toBe(3)
    expect(expected[1]).toBe(4)
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

describe('測試 sum', () => {
  test('[1,2][3,4] + [1,2][3,4] 應等於[2,4][6,8]', () => {
    let m1 = new Matrix(2, 2)
    m1[0][0] = 1
    m1[0][1] = 2
    m1[1][0] = 3
    m1[1][1] = 4
    expect(m1.sum()).toBe(10)
  })
})
