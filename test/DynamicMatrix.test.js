const { DynamicMatrix } = require('../src/DynamicMatrix')
const {
  KeyNotExistsException,
  InvalidParameterException,
} = require('../src/Exceptions')

describe('測試 clear', () => {
  test('回傳物件本身', () => {
    let m = new DynamicMatrix()
    expect(m.clear()).toBe(m)
  })

  test('建立 3x3 矩陣，清除之後 columnCount & rowCount = 0', () => {
    let m = new DynamicMatrix()
      .setRow(1, [3, 4, 5])
      .setRow(1, [4, 5, 6])
      .setRow(1, [5, 6, 7])
      .clear()
    expect(m.columnCount()).toBe(0)
    expect(m.rowCount()).toBe(0)
  })
})

describe('測試 column', () => {
  test('columnKey 是 undefined，應回傳空陣列', () => {
    let m = new DynamicMatrix()
    m.set(1, 1, 1)
    m.set(2, 1, 2)
    m.set(3, 1, 3)
    expect(m.column()).toStrictEqual([undefined, undefined, undefined])
  })

  test('columnKey 不存在，應回傳空陣列', () => {
    let m = new DynamicMatrix()
    m.set(1, 1, 1)
    m.set(2, 1, 2)
    m.set(3, 1, 3)
    expect(m.column(2)).toStrictEqual([undefined, undefined, undefined])
  })

  test('column 寫入三個數字，應取回相同的三個數字', () => {
    let m = new DynamicMatrix()
    m.set(1, 1, 1)
    m.set(2, 1, 2)
    m.set(3, 1, 3)
    expect(m.column(1)).toStrictEqual([1, 2, 3])
  })

  test('column 寫入三個數字，其中一個 undefined，應取回2個數字', () => {
    let m = new DynamicMatrix()
    m.set(1, 1, 1)
    m.set(2, 1, undefined)
    m.set(3, 1, 3)
    expect(m.column(1)).toStrictEqual([1, undefined, 3])
  })
})

describe('測試 columnCount', () => {
  test('空矩陣，應回傳0', () => {
    let m = new DynamicMatrix()
    expect(m.columnCount()).toBe(0)
  })

  test('row 1 寫入[1,2,3]，應回傳3', () => {
    let m = new DynamicMatrix()
    m.set(1, 1, 1)
    m.set(2, 2, 2)
    m.set(3, 3, 3)
    expect(m.columnCount()).toBe(3)
  })
})

describe('測試 columnSum', () => {
  test('columnKey 是 undefined，應拋出例外 InvalidParameterException', () => {
    let m = new DynamicMatrix()
    expect(() => m.columnSum()).toThrow(InvalidParameterException)
  })

  test('columnKey 不存在，應拋出例外 InvalidParameterException', () => {
    let m = new DynamicMatrix()
    expect(() => m.columnSum(1)).toThrow(KeyNotExistsException)
  })

  test('column 為 [1,1,1]，應回傳3', () => {
    let m = new DynamicMatrix({ defaultValue: 0 })
    m.set(1, 1, 1)
    m.set(2, 1, 1)
    m.set(3, 1, 1)
    expect(m.columnSum(1)).toBe(3)
  })

  test('column 為 [4,5,6]，應回傳15', () => {
    let m = new DynamicMatrix()
    m.set(1, 1, 3)
    m.set(1, 2, 4)
    m.set(1, 3, 5)
    m.set(2, 1, 4)
    m.set(2, 2, 5)
    m.set(2, 3, 6)
    m.set(3, 1, 5)
    m.set(3, 2, 6)
    m.set(3, 3, 7)
    expect(m.columnSum(2)).toBe(15)
  })

  test('column 2 寫入[A,B,C]，應回傳ABC', () => {
    let m = new DynamicMatrix({ defaultValue: '' })
    m.set(1, 1, 3)
    m.set(1, 2, 'A')
    m.set(1, 3, 5)
    m.set(2, 1, 4)
    m.set(2, 2, 'B')
    m.set(2, 3, 6)
    m.set(3, 1, 5)
    m.set(3, 2, 'C')
    m.set(3, 3, 7)
    expect(m.columnSum(2)).toBe('ABC')
  })

  test('column 1 寫入[1,2,3]，應取回6', () => {
    let m = new DynamicMatrix()
    m.setColumn(1, [1, 2, 3])
    expect(m.columnSum(1)).toBe(6)
  })

  test('若有元素為 undefined，應用預設值取代', () => {
    let m = new DynamicMatrix()
    m.set(1, 1, 1)
    m.set(2, 1, undefined)
    m.set(3, 1, 1)
    expect(m.columnSum(1)).toBe(2)
  })
})

describe('測試 fill', () => {
  test('3x3 矩陣填入 1，每一個元素都應該是 1', () => {
    let m = new DynamicMatrix()
    m.setRow(1, [1, 2, 3])
      .setRow(2, [1, 2, 3])
      .setRow(3, [1, 2, 3])
    m.fill(1)
    expect(m.row(1)).toStrictEqual([1, 1, 1])
    expect(m.row(2)).toStrictEqual([1, 1, 1])
    expect(m.row(3)).toStrictEqual([1, 1, 1])
  })
})

describe('測試 forEach', () => {
  test('3x3 矩陣，應能取得每一個元素的加總', () => {
    let m = new DynamicMatrix()
    m.set(1, 1, 1)
      .set(2, 1, 2)
      .set(3, 1, 3)
      .set(1, 2, 2)
      .set(2, 2, 3)
      .set(3, 2, 4)
      .set(1, 3, 3)
      .set(2, 3, 4)
      .set(3, 3, 5)

    let sum = 0
    m.forEach((value) => sum += value)
    expect(sum).toBe(27)
  })

  test('回傳物件本身', () => {
    let m = new DynamicMatrix()
    expect(m.forEach(() => {})).toBe(m)
  })

  test('callback 不是函數，應拋出例外 InvalidParameterException', () => {
    let m = new DynamicMatrix()
    expect(() => m.forEach()).toThrow(InvalidParameterException)
  })
})

describe('測試 forEachColumnKey', () => {
  test('columns 寫入A,B,C，應依次取得A,B,C', () => {
    let m = new DynamicMatrix()
    m.set(1, 'A', 1)
    m.set(2, 'B', 2)
    m.set(3, 'C', 3)

    let keys = []
    m.forEachColumnKey((columnKey) => keys.push(columnKey))
    expect(keys).toStrictEqual(['A', 'B', 'C'])
  })

  test('回傳物件本身', () => {
    let m = new DynamicMatrix()
    expect(m.forEachColumnKey(() => {})).toBe(m)
  })

  test('callback 不是函數，應拋出例外 InvalidParameterException', () => {
    let m = new DynamicMatrix()
    expect(() => m.forEachColumnKey()).toThrow(InvalidParameterException)
  })
})

describe('測試 forEachColumnValues', () => {
  test('3x3矩陣，應能取得每一個元素的加總', () => {
    let m = new DynamicMatrix()
    m.set(1, 1, 1)
    m.set(2, 1, 2)
    m.set(3, 1, 3)

    m.set(1, 2, 2)
    m.set(2, 2, 3)
    m.set(3, 2, 4)

    m.set(1, 3, 3)
    m.set(2, 3, 4)
    m.set(3, 3, 5)

    let sum = 0
    m.forEachColumnValues((values) => {
      sum += values.reduce((previousValue, currentValue) => previousValue + currentValue, 0)
    })
    expect(sum).toBe(27)
  })

  test('回傳物件本身', () => {
    let m = new DynamicMatrix()
    expect(m.forEachColumnValues(() => {})).toBe(m)
  })

  test('callback 不是函數，應拋出例外 InvalidParameterException', () => {
    let m = new DynamicMatrix()
    expect(() => m.forEachColumnValues()).toThrow(InvalidParameterException)
  })
})

describe('測試 forEachRow', () => {
  test('3x3矩陣，應能取得每一個元素的加總', () => {
    let m = new DynamicMatrix()
    m.set(1, 1, 1)
    m.set(2, 1, 2)
    m.set(3, 1, 3)

    m.set(1, 2, 2)
    m.set(2, 2, 3)
    m.set(3, 2, 4)

    m.set(1, 3, 3)
    m.set(2, 3, 4)
    m.set(3, 3, 5)

    let sum = 0
    m.forEachRow((values) => {
      sum += values.reduce((previousValue, currentValue) => previousValue + currentValue, 0)
    })
    expect(sum).toBe(27)
  })

  test('回傳物件本身', () => {
    let m = new DynamicMatrix()
    expect(m.forEachRow(() => {})).toBe(m)
  })

  test('使用數字作為索引，應能正確讀寫字串', () => {
    let m = new DynamicMatrix()
    m.set(1, 1, 1)
    m.set(2, 1, 1)
    m.set(3, 1, 1)

    m.set(1, 2, 2)
    m.set(2, 2, 2)
    m.set(3, 2, 2)

    m.set(1, 3, 3)
    m.set(2, 3, 3)
    m.set(3, 3, 3)
    expect(m.get(3, 3)).toBe(3)
  })

  test('callback 不是函數，應拋出例外 InvalidParameterException', () => {
    let m = new DynamicMatrix()
    expect(() => m.forEachRow()).toThrow(InvalidParameterException)
  })
})

describe('測試 forEachRowKey', () => {

  test('columns 寫入A,B,C，應依次取得A,B,C', () => {
    let m = new DynamicMatrix()
    m.set('A', 1, 1)
    m.set('B', 2, 2)
    m.set('C', 3, 3)

    let keys = []
    m.forEachRowKey((rowKey) => keys.push(rowKey))
    expect(keys).toStrictEqual(['A', 'B', 'C'])
  })

  test('回傳物件本身', () => {
    let m = new DynamicMatrix()
    expect(m.forEachRowKey(() => {})).toBe(m)
  })

  test('callback 不是函數，應拋出例外 InvalidParameterException', () => {
    let m = new DynamicMatrix()
    expect(() => m.forEachRowKey()).toThrow(InvalidParameterException)
  })
})

describe('測試 get', () => {
  test('使用數字作為索引，應能正確讀寫數字', () => {
    let m = new DynamicMatrix()
    m.set(1, 1, 123)
    expect(m.get(1, 1)).toBe(123)
  })

  test('使用數字作為索引，應能正確讀寫物件', () => {
    let m = new DynamicMatrix()
    let obj = {
      name: 'test',
      age: 1,
    }
    m.set(1, 1, obj)
    expect(m.get(1, 1)).toBe(obj)
  })

  test('使用字串作為索引，應能正確讀寫物件', () => {
    let m = new DynamicMatrix()
    let obj = {
      name: 'test',
      age: 1,
    }
    m.set('a', 'a', obj)
    expect(m.get('a', 'a')).toBe(obj)
  })

  test('回傳物件本身', () => {
    let m = new DynamicMatrix()
    expect(m.set(1, 1, 1)).toBe(m)
  })

  test('傳入陣列，應可正常寫入', () => {
    let m = new DynamicMatrix()
    m.set(1, 1, [1, 2, 3])
    expect(m.get(1, 1)).toStrictEqual([1, 2, 3])
  })

  test('columnKey 不存在，應回傳預設值', () => {
    let m = new DynamicMatrix({defaultValue:0})
    m.set(1, 1, 123)
    expect(m.get(1, 2)).toBe(0)
  })

  test('rowKey 不存在，應回傳預設值', () => {
    let m = new DynamicMatrix()
    m.set(1, 1, 123)
    expect(m.get(2, 1)).toBe(0)
  })

  test('columnKey 為 undefined，應回傳預設值', () => {
    let m = new DynamicMatrix()
    m.set(1, 1, 123)
    expect(m.get(1, undefined)).toBe(0)
  })

  test('rowKey 為 undefined，應回傳預設值', () => {
    let m = new DynamicMatrix()
    m.set(1, 1, 123)
    expect(m.get(undefined, 1)).toBe(0)
  })

  test('row 與 column 為 undefined，應回傳預設值', () => {
    let m = new DynamicMatrix()
    m.set(1, 1, 123)
    expect(m.get()).toBe(0)
  })

  test('row 與 column 不存在，應回傳預設值', () => {
    let m = new DynamicMatrix()
    m.set(1, 1, 123)
    expect(m.get(2, 3)).toBe(0)
  })
})

describe('測試 row', () => {
  test('rowKey 是 undefined，應回傳預設值', () => {
    let m = new DynamicMatrix()
    m.set(1, 1, 1)
    m.set(1, 2, 2)
    m.set(1, 3, 3)
    expect(m.row()).toStrictEqual([0, 0, 0])
  })

  test('rowKey 不存在，應回傳預設值', () => {
    let m = new DynamicMatrix()
    m.set(1, 1, 1)
    m.set(1, 2, 2)
    m.set(1, 3, 3)
    expect(m.row(2)).toStrictEqual([0, 0, 0])
  })

  test('row 寫入三個數字，應取回相同的三個數字', () => {
    let m = new DynamicMatrix()
    m.set(1, 1, 1)
    m.set(1, 2, 2)
    m.set(1, 3, 3)
    expect(m.row(1)).toStrictEqual([1, 2, 3])
  })

  test('row 寫入三個數字，其中一個 undefined，應取回2個數字', () => {
    let m = new DynamicMatrix()
    m.set(1, 1, 1)
    m.set(1, 2, undefined)
    m.set(1, 3, 3)
    expect(m.row(1)).toStrictEqual([1, 0, 3])
  })
})

describe('測試 rowCount', () => {
  test('column 寫入1,2,3，應取回3', () => {
    let m = new DynamicMatrix()
    m.set(1, 1, 1)
    m.set(2, 2, 2)
    m.set(3, 3, 3)
    expect(m.rowCount()).toBe(3)
  })
})

describe('測試 rowSum', () => {
  test('rowKey 為 undefined，應拋出例外 InvalidParameterException', () => {
    let m = new DynamicMatrix()
    expect(() => m.rowSum()).toThrow(InvalidParameterException)
  })

  test('rowKey 不存在，應拋出例外 KeyNotExistsException', () => {
    let m = new DynamicMatrix()
    m.set(1, 1, 1)
    m.set(1, 2, 2)
    m.set(1, 3, 3)
    expect(() => m.rowSum(3)).toThrow(KeyNotExistsException)
  })

  test('1x3數字矩陣，應傳回數字加總結果', () => {
    let m = new DynamicMatrix()
    m.set(1, 1, 1)
    m.set(1, 2, 2)
    m.set(1, 3, 3)
    expect(m.rowSum(1)).toBe(6)
  })

  test('1x3字串矩陣，應傳回字串加總結果', () => {
    let m = new DynamicMatrix({ defaultValue: '' })
    m.set(1, 1, 'a')
    m.set(1, 2, 'b')
    m.set(1, 3, 'c')
    expect(m.rowSum(1)).toBe('abc')
  })
})

describe('測試 set', () => {
  test('使用數字作為索引，應能正確讀寫數字', () => {
    let m = new DynamicMatrix()
    m.set(1, 1, 123)
    expect(m.get(1, 1)).toBe(123)
  })

  test('使用數字作為索引，應能正確讀寫物件', () => {
    let m = new DynamicMatrix()
    let obj = {
      name: 'test',
      age: 1,
    }
    m.set(1, 1, obj)
    expect(m.get(1, 1)).toBe(obj)
  })

  test('使用字串作為索引，應能正確讀寫物件', () => {
    let m = new DynamicMatrix()
    let obj = {
      name: 'test',
      age: 1,
    }
    m.set('a', 'a', obj)
    expect(m.get('a', 'a')).toBe(obj)
  })

  test('回傳物件本身', () => {
    let m = new DynamicMatrix()
    expect(m.set(1, 1, 1)).toBe(m)
  })

  test('傳入陣列，應可正常寫入', () => {
    let m = new DynamicMatrix()
    m.set(1, 1, [1, 2, 3])
    expect(m.get(1, 1)).toStrictEqual([1, 2, 3])
  })

  test('row 為 undefined，不應拋出例外，直接回傳物件本身', () => {
    let m = new DynamicMatrix()
    expect(m.set(undefined, 2, '')).toBe(m)
  })

  test('column 為 undefined，不應拋出例外，直接回傳物件本身', () => {
    let m = new DynamicMatrix()
    expect(m.set(2)).toBe(m)
  })

  test('row 與 column 為 undefined，不應拋出例外，直接回傳物件本身', () => {
    let m = new DynamicMatrix()
    expect(m.set()).toBe(m)
  })
})

describe('測試 setColumn', () => {
  test('不是傳入陣列，拋出 InvalidParameterException', () => {
    let m = new DynamicMatrix()
    expect(() => m.setColumn(1, 1)).toThrow(InvalidParameterException)
  })

  test('傳入["A","B","C"]，位置1,2,3應該是"A","B","C"', () => {
    let m = new DynamicMatrix()
    m.setColumn(1, ['A', 'B', 'C'])
    expect(m.column(1)).toStrictEqual(['A', 'B', 'C'])
  })

  test('column 1 已經有資料[1,2,3,4,5]，傳入["D","E","F"]，最後應該是["D","E","F",4,5]', () => {
    let m = new DynamicMatrix()
    m.set(1, 1, 1)
      .set(2, 1, 2)
      .set(3, 1, 3)
      .set(4, 1, 4)
      .set(5, 1, 5)
      .setColumn(1, ['D', 'E', 'F'])
    expect(m.column(1)).toStrictEqual(['D', 'E', 'F', 4, 5])
  })
})

describe('測試 setRow', () => {
  test('不是傳入陣列，拋出 InvalidParameterException', () => {
    let m = new DynamicMatrix()
    expect(() => m.setRow(1, 1)).toThrow(InvalidParameterException)
  })

  test('傳入["A","B","C"]，位置1,2,3應該是"A","B","C"', () => {
    let m = new DynamicMatrix()
    m.setRow(1, ['A', 'B', 'C'])
    expect(m.row(1)).toStrictEqual(['A', 'B', 'C'])
  })

  test('已經有資料[1,2,3,4,5]，傳入["D","E","F"]，位置1,2,3應該是"D","E","F"', () => {
    let m = new DynamicMatrix()
    m.set(1, 1, 1)
      .set(1, 2, 2)
      .set(1, 3, 3)
      .set(1, 4, 4)
      .set(1, 5, 5)
      .setRow(1, ['D', 'E', 'F'])
    expect(m.row(1)).toStrictEqual(['D', 'E', 'F', 4, 5])
  })
})

describe('測試 sum', () => {
  test('空矩陣，應回傳undefined', () => {
    let m = new DynamicMatrix()
    expect(m.sum()).toBe(undefined)
  })

  test('空矩陣，有給預設值 9，應回傳9', () => {
    let m = new DynamicMatrix({ defaultValue: 9 })
    expect(m.sum()).toBe(undefined)
  })

  test('單位矩陣，應回傳9', () => {
    let m = new DynamicMatrix()
    m.setRow(1, [1, 1, 1])
    m.setRow(2, [1, 1, 1])
    m.setRow(3, [1, 1, 1])
    expect(m.sum()).toBe(9)
  })

  test('元素 a-i，應回傳abcdefghi', () => {
    let m = new DynamicMatrix({ defaultValue: '' })
    m.setRow(1, ['a', 'b', 'c'])
    m.setRow(2, ['d', 'e', 'f'])
    m.setRow(3, ['g', 'h', 'i'])
    expect(m.sum()).toBe('abcdefghi')
  })
})

describe('測試 toArray', () => {
  test('元素為[1,2,3][4,5,6][7,8,9]，應取回[[1,2,3],[4,5,6],[7,8,9]]', () => {
    let m = new DynamicMatrix()
    m.setRow(1, [1, 2, 3])
    m.setRow(2, [4, 5, 6])
    m.setRow(3, [7, 8, 9])
    const expected = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
    expect(m.toArray()).toStrictEqual(expected)
  })
})
