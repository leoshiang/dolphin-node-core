const { Matrix } = require('../src/Matrix')
const {
  IndexOutOfRangeException,
  InvalidParameterException,
  TypeError,
} = require('../src/Exceptions')

describe('測試寫入不同型別的資料', () => {
  test('測試寫入不同型別的資料', () => {
    const log = (x) => console.log(x)
    const now = new Date()
    const m = new Matrix(['a', 1, now], [log, 4, 'c'])
    expect(m.get(0, 0)).toBe('a')
    expect(m.get(0, 1)).toBe(1)
    expect(m.get(0, 2)).toBe(now)
    expect(m.get(1, 0)).toBe(log)
    expect(m.get(1, 1)).toBe(4)
    expect(m.get(1, 2)).toBe('c')
  })
})

describe('測試 add', () => {
  test('傳入 undefined，應拋出例外 TypeError', () => {
    let m = new Matrix(3, 3)
    expect(() => m.add()).toThrow(TypeError)
  })

  test('傳入數值，每一個元素應加上傳入的數值', () => {
    let m = new Matrix(3, 3).fill(1).add(1)
    expect(m.row(0)).toStrictEqual([2, 2, 2])
    expect(m.row(1)).toStrictEqual([2, 2, 2])
    expect(m.row(2)).toStrictEqual([2, 2, 2])
  })

  test('兩個矩陣相加，結果應該是每一個元素相加', () => {
    let m = new Matrix(3, 3).fill(1)
    let n = new Matrix(3, 3).fill(-1)
    let result = n.add(m)
    expect(result.row(0)).toStrictEqual([0, 0, 0])
    expect(result.row(1)).toStrictEqual([0, 0, 0])
    expect(result.row(2)).toStrictEqual([0, 0, 0])
  })

  test('兩個矩陣相加，結果應該是每一個元素相加', () => {
    let m = new Matrix(3, 3)
    m.setRow(0, [1, 2, 3])
    m.setRow(1, [2, 3, 4])
    m.setRow(2, [3, 4, 5])

    let n = new Matrix(3, 3)
    n.fill(1)

    let result = n.add(m)

    expect(result.row(0)).toStrictEqual([2, 3, 4])
    expect(result.row(1)).toStrictEqual([3, 4, 5])
    expect(result.row(2)).toStrictEqual([4, 5, 6])
  })

  test('兩個矩陣大小不同，應不會相加', () => {
    let m = new Matrix(3, 3)
    m.setRow(0, [1, 2, 3])
    m.setRow(1, [2, 3, 4])
    m.setRow(2, [3, 4, 5])

    let n = new Matrix(1, 3)
    n.fill(1)

    let result = n.add(m)

    expect(result.row(0)).toStrictEqual([1, 1, 1])
  })
})

describe('測試 clone', () => {
  test('3x3 矩陣，每個元素應相同', () => {
    let m = new Matrix(3, 2)
    m.setRow(0, [1, 2])
    m.setRow(1, [3, 4])
    m.setRow(2, [5, 6])
    let n = m.clone()
    expect(n.row(0)).toStrictEqual([1, 2])
    expect(n.row(1)).toStrictEqual([3, 4])
    expect(n.row(2)).toStrictEqual([5, 6])
  })
})

describe('測試 column', () => {
  test('3x3 矩陣，column(0) 應等於 [1,2,3]', () => {
    let m = new Matrix(3, 3)
    m.set(0, 0, 1)
    m.set(1, 0, 2)
    m.set(2, 0, 3)
    expect(m.column(0)).toStrictEqual([1, 2, 3])
  })

  test('索引超出範圍，應回傳 undefined', () => {
    let m = new Matrix([1, 2, 3])
    expect(m.column(3)).toBe(undefined)
  })

  test('索引非數字，應回傳 undefined', () => {
    let m = new Matrix([1, 2, 3])
    expect(m.column('a')).toBe(undefined)
  })
})

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
    expect(m.row(0)).toStrictEqual([2, 3, 1])
    expect(m.row(1)).toStrictEqual([4, 7, 2])
    expect(m.row(2)).toStrictEqual([3, 1, 1])
  })

  test('傳入多個陣列，中間穿插非陣列的資料，非陣列的資料應被忽略', () => {
    const m = new Matrix([2, 3, 1], 1, [3, 1, 1])
    expect(m.rows).toStrictEqual(2)
    expect(m.columns).toStrictEqual(3)
  })
})

describe('測試 columns', () => {
  test('建立時沒有指定，應等於 0', () => {
    let m = new Matrix()
    expect(m.columns).toBe(0)
  })

  test('3x3 矩陣，應等於 3', () => {
    let m = new Matrix(3, 3)
    m.set(0, 0, 1)
    m.set(0, 1, 2)
    m.set(0, 2, 3)
    expect(m.columns).toBe(3)
  })
})

describe('測試 columnSum', () => {
  test('3x3 矩陣，用 1 填滿，加總應等於3', () => {
    expect(new Matrix(3, 3, 0).fill(1).columnSum(0)).toBe(3)
  })

  test('傳入非數值的 column，應回傳 undefined', () => {
    expect(new Matrix(3, 3, 0).fill(1).columnSum('a')).toBe(undefined)
  })

  test('column 超出範圍，應回傳 undefined', () => {
    expect(new Matrix(3, 3, 0).fill(1).columnSum(4)).toBe(undefined)
  })
})

describe('測試 fill', () => {
  test('3x3 矩陣，用 1 填滿，每一個 cell 應該都是 1', () => {
    let m = new Matrix(3, 3)
    m.fill(1)
    expect(m.get(0, 0)).toBe(1)
    expect(m.get(0, 1)).toBe(1)
    expect(m.get(0, 2)).toBe(1)
    expect(m.get(1, 0)).toBe(1)
    expect(m.get(1, 1)).toBe(1)
    expect(m.get(1, 2)).toBe(1)
    expect(m.get(2, 0)).toBe(1)
    expect(m.get(2, 1)).toBe(1)
    expect(m.get(2, 2)).toBe(1)
  })

  test('呼叫之後應回傳自己', () => {
    let m = new Matrix(5, 10)
    expect(m.fill(1)).toBe(m)
  })
})

describe('測試 forEach', () => {
  test('callback 不是 function，應拋出例外 TypeError', () => {
    expect(() => {
      new Matrix(3, 3).fill(1).forEach()
    }).toThrow(TypeError)
  })

  test('3x3 矩陣，應呼叫 callback 9 次', () => {
    const callback = jest.fn()
    new Matrix(3, 3).fill(1).forEach(callback)
    expect(callback).toHaveBeenCalledTimes(9)
  })

  test('3x3 矩陣用 1 填滿，每一個 cell 應該被回傳', () => {
    let sum = 0
    new Matrix(3, 3).fill(1).forEach(x => sum += x)
    expect(sum).toBe(9)
  })

  test('每一個 cell 的 row, column 應該被回傳', () => {
    let columns = []
    let rows = []
    new Matrix(3, 3).fill(1).forEach((x, row, column) => {
      columns.push(column)
      rows.push(row)
    })
    expect(columns).toStrictEqual([0, 1, 2, 0, 1, 2, 0, 1, 2])
    expect(rows).toStrictEqual([0, 0, 0, 1, 1, 1, 2, 2, 2])
  })
})

describe('測試 forEachColumn', () => {
  test('3x3 矩陣用 1 填滿，每一個 column 傳 [1,1,1] 給 callback', () => {
    new Matrix(3, 3).fill(1).forEachColumn((x) => {
      expect(x).toStrictEqual([1, 1, 1])
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

  test('callback 不是 function，應拋出例外 TypeError', () => {
    expect(() => {
      new Matrix(3, 3).fill(1).forEachColumn()
    }).toThrow(TypeError)
  })

  test('應回傳自己', () => {
    let m = new Matrix(3, 3)
    expect(m.forEachColumn(() => {})).toBe(m)
  })
})

describe('測試 forEachRow', () => {
  test('3x3 矩陣用 1 填滿，每一個 row 傳 [1,1,1] 給 callback', () => {
    new Matrix(3, 3).fill(1).forEachRow((x) => {
      expect(x).toStrictEqual([1, 1, 1])
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

  test('callback 不是 function，應拋出例外 InvalidParameterException', () => {
    expect(() => {
      new Matrix(3, 3).fill(1).forEachRow()
    }).toThrow(InvalidParameterException)
  })

  test('應回傳自己', () => {
    let m = new Matrix(3, 3)
    expect(m.forEachRow(() => {})).toBe(m)
  })
})

describe('測試 get', () => {
  test('30x30矩陣，應能讀取 (1,27)', () => {
    let m = new Matrix(30, 30)
    expect(m.get(1, 27)).toBe(0)
  })

  test('3x3 矩陣，讀取 column A，應回傳 undefined', () => {
    let m = new Matrix(3, 3)
    expect(m.get(1, 'A')).toBe(undefined)
  })

  test('3x3 矩陣，讀取 column 3，應回傳 undefined', () => {
    let m = new Matrix(3, 3)
    expect(m.get(1, 3)).toBe(undefined)
  })

  test('3x3 矩陣，讀取 column -1，應回傳 undefined', () => {
    let m = new Matrix(3, 3)
    expect(m.get(1, -1)).toBe(undefined)
  })
})

describe('測試 identity', () => {
  test('3x3矩陣，對角線應為1，其餘為0', () => {
    const m = new Matrix(3, 3).identity()
    expect(m.get(0, 0)).toBe(1)
    expect(m.get(0, 1)).toBe(0)
    expect(m.get(0, 2)).toBe(0)
    expect(m.get(1, 0)).toBe(0)
    expect(m.get(1, 1)).toBe(1)
    expect(m.get(1, 2)).toBe(0)
    expect(m.get(2, 0)).toBe(0)
    expect(m.get(2, 1)).toBe(0)
    expect(m.get(2, 2)).toBe(1)
  })

  test('非方形矩陣，應回傳自己', () => {
    const m = new Matrix(2, 3)
    expect(m.identity()).toBe(m)
  })

  test('對角線元素為 1 ，其餘元素為 0', () => {
    const m = new Matrix(3, 3).fill(1).identity()
    expect(m.get(0, 0)).toBe(1)
    expect(m.get(0, 1)).toBe(0)
    expect(m.get(0, 2)).toBe(0)
    expect(m.get(1, 0)).toBe(0)
    expect(m.get(1, 1)).toBe(1)
    expect(m.get(1, 2)).toBe(0)
    expect(m.get(2, 0)).toBe(0)
    expect(m.get(2, 1)).toBe(0)
    expect(m.get(2, 2)).toBe(1)
  })
})

describe('測試 mul', () => {
  test('傳入 undefined，應拋出例外 TypeError', () => {
    let m = new Matrix(3, 3)
    expect(() => m.multiply()).toThrow(TypeError)
  })

  test('兩個矩陣大小不同，應不會相乘', () => {
    let m = new Matrix(3, 3)
    m.setRow(0, [1, 2, 3])
    m.setRow(1, [2, 3, 4])
    m.setRow(2, [3, 4, 5])

    let n = new Matrix(1, 2)
    n.fill(1)

    let result = n.multiply(m)
    expect(result.row(0)).toStrictEqual([1, 1])
  })

  test('兩個矩陣相乘', () => {
    let m = new Matrix([1, 2], [3, 4], [5, 6])
    let n = new Matrix([1, 2, 3, 4], [5, 6, 7, 8])
    let result = m.multiply(n)
    expect(result.rows).toBe(3)
    expect(result.columns).toBe(4)
    expect(result.row(0)).toStrictEqual([11, 14, 17, 20])
    expect(result.row(1)).toStrictEqual([23, 30, 37, 44])
    expect(result.row(2)).toStrictEqual([35, 46, 57, 68])
  })
})

describe('測試 resize', () => {
  test('指定初始大小 10x10，改為 3x3，columnCount 與 rowCount 應為 3', () => {
    let m = new Matrix(10, 10)
    m.resize(3, 3)
    expect(m.columns).toBe(3)
    expect(m.rows).toBe(3)
  })

  test('指定初始大小 3x3，改為 10x10，columnCount 與 rowCount 應為 10', () => {
    let m = new Matrix(3, 3)
    m.resize(10, 10)
    expect(m.columns).toBe(10)
    expect(m.rows).toBe(10)
  })

  test('columns 不是數值，應拋出例外 TypeError', () => {
    let m = new Matrix(3, 3)
    expect(() => m.resize(2, 'a')).toThrow(TypeError)
  })

  test('rows 不是數值，應拋出例外 TypeError', () => {
    let m = new Matrix(3, 3)
    expect(() => m.resize('a', 0)).toThrow(TypeError)
  })

  test('rows 小於 0，應拋出例外 InvalidParameterException', () => {
    let m = new Matrix(3, 3)
    expect(() => m.resize(-1, 0)).toThrow(InvalidParameterException)
  })

  test('columns 小於 0，應拋出例外 InvalidParameterException', () => {
    let m = new Matrix(3, 3)
    expect(() => m.resize(0, -1)).toThrow(InvalidParameterException)
  })
})

describe('測試 row', () => {
  test('3x3 矩陣，row(0) 應等於 [1,2,3]', () => {
    let m = new Matrix(3, 3)
    m.set(0, 0, 1)
    m.set(0, 1, 2)
    m.set(0, 2, 3)
    expect(m.row(0)).toStrictEqual([1, 2, 3])
  })

  test('3x3 矩陣，取得 row A，應拋出例外 TypeError', () => {
    let m = new Matrix(3, 3)
    expect(() => m.row('A')).toThrow(TypeError)
  })

  test('3x3 矩陣，取得 row 3，應拋出例外 IndexOutOfRangeException', () => {
    let m = new Matrix(3, 3)
    expect(() => m.row(3)).toThrow(IndexOutOfRangeException)
  })

  test('3x3 矩陣，取得 row -1，應拋出例外 IndexOutOfRangeException', () => {
    let m = new Matrix(3, 3)
    expect(() => m.row(-1)).toThrow(IndexOutOfRangeException)
  })
})

describe('測試 rows', () => {
  test('建立時沒有指定，應等於 0', () => {
    let m = new Matrix()
    expect(m.rows).toBe(0)
  })

  test('3x3 矩陣，應等於 3', () => {
    let m = new Matrix(3, 3)
    m.set(0, 0, 1)
    m.set(0, 1, 2)
    m.set(0, 2, 3)
    expect(m.rows).toBe(3)
  })
})

describe('測試 rowSum', () => {
  test('3x3 矩陣，用 1 填滿，加總應等於3', () => {
    expect(new Matrix(3, 3).fill(1).rowSum(0)).toBe(3)
  })

  test('3x3 矩陣，計算 column A 加總，應拋出例外 TypeError', () => {
    let m = new Matrix(3, 3)
    expect(() => m.rowSum('A')).toThrow(TypeError)
  })

  test('3x3 矩陣，計算 column 3 加總，應拋出例外 IndexOutOfRangeException', () => {
    let m = new Matrix(3, 3)
    expect(() => m.rowSum(3)).toThrow(IndexOutOfRangeException)
  })

  test('3x3 矩陣，計算 column -1 加總，應拋出例外 IndexOutOfRangeException', () => {
    let m = new Matrix(3, 3)
    expect(() => m.rowSum(-1)).toThrow(IndexOutOfRangeException)
  })
})

describe('測試 set', () => {
  test('行列編號不是數值，應不更動內容', () => {
    let m = new Matrix(3, 3).fill(1)
    m.set('a', 'a', 3)
    expect(m.row(0)).toStrictEqual([1, 1, 1])
    expect(m.row(1)).toStrictEqual([1, 1, 1])
    expect(m.row(2)).toStrictEqual([1, 1, 1])
  })

  test('3x3 矩陣，寫入 (2,2) 之後應回傳自己', () => {
    let m = new Matrix(3, 3)
    expect(m.set(2, 2, 1)).toBe(m)
  })

  test('30x30矩陣，應能寫入 (1,27)', () => {
    let m = new Matrix(30, 30)
    m.set(1, 27, 5)
    expect(m.get(1, 27)).toBe(5)
  })
})

describe('測試 setColumn', () => {
  test('3x3 矩陣，設定 column A，應回傳自己', () => {
    let m = new Matrix(3, 3)
    expect(m.setColumn('A', [1, 2, 3])).toBe(m)
  })

  test('3x3 矩陣，設定 column 3，應回傳自己', () => {
    let m = new Matrix(3, 3)
    expect(m.setColumn(3, [1, 2, 3])).toBe(m)
  })

  test('3x3 矩陣，設定 column -1，應回傳自己', () => {
    let m = new Matrix(3, 3)
    expect(m.setColumn(-1, [1, 2, 3])).toBe(m)
  })

  test('values 是數字，column應被設定成同一個數字', () => {
    let m = new Matrix(3, 3)
    m.setColumn(2, 1)
    expect(m.get(0, 2)).toBe(1)
    expect(m.get(1, 2)).toBe(1)
    expect(m.get(2, 2)).toBe(1)
  })

  test('3x3 矩陣，設定 column 2 為 [1]，應回傳自己', () => {
    let m = new Matrix(3, 3)
    expect(m.setColumn(2, [1])).toBe(m)
  })

  test('3x3 矩陣，設定 column 2 為 [1,2,3,4]，應回傳自己', () => {
    let m = new Matrix(3, 3)
    expect(m.setColumn(2, [1, 2, 3, 4])).toBe(m)
  })

  test('values 長度與 rows 不同，應回傳自己', () => {
    let m = new Matrix(3, 3)
    expect(m.setColumn(2, [1])).toBe(m)
  })

  test('3x3 矩陣，第 2 column 設為 [1,2,3],第 2 column 內容應為 [1,2,3]', () => {
    let m = new Matrix(3, 3)
    m.setColumn(2, [1, 2, 3])
    expect(m.column(2)).toStrictEqual([1, 2, 3])
  })

  test('應回傳自己', () => {
    let m = new Matrix(3, 3)
    expect(m.setColumn(2, [1, 2, 3])).toBe(m)
  })
})

describe('測試 setRow', () => {
  test('3x3 矩陣，設定 row A，應拋出例外 TypeError', () => {
    let m = new Matrix(3, 3)
    expect(() => m.setRow('A', [1, 2, 3])).toThrow(TypeError)
  })

  test('3x3 矩陣，設定 row 3，應拋出例外 IndexOutOfRangeException', () => {
    let m = new Matrix(3, 3)
    expect(() => m.setRow(3, [1, 2, 3])).toThrow(IndexOutOfRangeException)
  })

  test('3x3 矩陣，設定 row -1，應拋出例外 IndexOutOfRangeException', () => {
    let m = new Matrix(3, 3)
    expect(() => m.setRow(-1, [1, 2, 3])).toThrow(IndexOutOfRangeException)
  })

  test('values 不是陣列，應拋出例外 InvalidParameterException', () => {
    let m = new Matrix(3, 3)
    expect(() => m.setRow(2, 1)).toThrow(InvalidParameterException)
  })

  test('3x3 矩陣，設定 row 2 為 [1]，應拋出例外 InvalidParameterException', () => {
    let m = new Matrix(3, 3)
    expect(() => m.setRow(2, [1])).toThrow(InvalidParameterException)
  })

  test('3x3 矩陣，設定 row 2 為 [1,2,3,4]，應拋出例外 InvalidParameterException', () => {
    let m = new Matrix(3, 3)
    expect(() => m.setRow(2, [1, 2, 3, 4])).toThrow(InvalidParameterException)
  })

  test('values 長度與 columns 不同，應拋出例外 InvalidParameterException', () => {
    let m = new Matrix(3, 3)
    expect(() => m.setRow(2, [1])).toThrow(InvalidParameterException)
  })

  test('3x3 矩陣，第 2 row 設為 [1,2,3],第 2 row 內容應為 [1,2,3]', () => {
    let m = new Matrix(3, 3)
    m.setRow(2, [1, 2, 3])
    expect(m.row(2)).toStrictEqual([1, 2, 3])
  })

  test('應回傳自己', () => {
    let m = new Matrix(3, 3)
    expect(m.setRow(2, [1, 2, 3])).toBe(m)
  })
})

describe('測試 subtract', () => {
  test('傳入 undefined，應拋出例外 TypeError', () => {
    let m = new Matrix(3, 3)
    expect(() => m.subtract()).toThrow(TypeError)
  })

  test('兩個矩陣相減，結果應該是每一個元素相減', () => {
    let m = new Matrix(3, 3).fill(-1)
    let n = new Matrix(3, 3).fill(1)
    let result = n.subtract(m)
    expect(result.row(0)).toStrictEqual([2, 2, 2])
    expect(result.row(1)).toStrictEqual([2, 2, 2])
    expect(result.row(2)).toStrictEqual([2, 2, 2])
  })

  test('兩個矩陣相減，結果應該是每一個元素相減', () => {
    let m = new Matrix(3, 3)
    m.setRow(0, [1, 2, 3])
    m.setRow(1, [2, 3, 4])
    m.setRow(2, [3, 4, 5])

    let n = new Matrix(3, 3)
    n.fill(1)

    let result = n.subtract(m)

    expect(result.row(0)).toStrictEqual([0, -1, -2])
    expect(result.row(1)).toStrictEqual([-1, -2, -3])
    expect(result.row(2)).toStrictEqual([-2, -3, -4])
  })

  test('兩個矩陣大小不同，應不會相減', () => {
    let m = new Matrix(3, 3)
    m.setRow(0, [1, 2, 3])
    m.setRow(1, [2, 3, 4])
    m.setRow(2, [3, 4, 5])
    let n = new Matrix(1, 3, 1)
    let result = n.subtract(m)
    expect(result).toBe(n)
  })

  test('應回傳新物件', () => {
    let m = new Matrix([1, 2, 3], [2, 3, 4], [4, 5, 6])
    let n = new Matrix(3, 3).fill(1)
    let result = n.subtract(m)
    expect(result).not.toBe(n)
  })

  test('傳入數值，應將每一個元素減去傳入的值', () => {
    let m = new Matrix(3, 3, 1).subtract(1)
    expect(m.row(0)).toStrictEqual([0, 0, 0])
    expect(m.row(1)).toStrictEqual([0, 0, 0])
    expect(m.row(2)).toStrictEqual([0, 0, 0])
  })
})

describe('測試 sum', () => {
  test('3x3 矩陣用 1 填滿，加總應等於9', () => {
    expect(new Matrix(3, 3).fill(1).sum()).toBe(9)
  })

  test('3x3 矩陣用 a-i 填滿，加總應等於 "abcdefghi"', () => {
    let m = new Matrix(3, 3, '')
    m.setRow(0, ['a', 'b', 'c'])
    m.setRow(1, ['d', 'e', 'f'])
    m.setRow(2, ['g', 'h', 'i'])
    expect(m.sum()).toBe('abcdefghi')
  })
})

describe('測試 dup', () => {
  test('3x3 矩陣用 1 填滿，加總應等於9', () => {
    expect(new Matrix(3, 3).fill(1).sum()).toBe(9)
  })

  test('3x3 矩陣用 a-i 填滿，加總應等於 "abcdefghi"', () => {
    let outputData = "";
    log = inputs => (outputData += inputs);
    console["log"] = jest.fn(log);
    let m = new Matrix(3, 3, '')
    m.setRow(0, ['a', 'b', 'c'])
    m.setRow(1, ['d', 'e', 'f'])
    m.setRow(2, ['g', 'h', 'i'])
    m.dump()
    expect(outputData).toBe('a,b,cd,e,fg,h,i');
  })
})
