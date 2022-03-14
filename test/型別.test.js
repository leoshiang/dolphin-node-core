const 型別 = require('../src/型別')

describe('測試【取得型別】', () => {
  test('應能正確取得陣列的型別', () => expect(型別.取得型別([])).toBe(型別.型別常數.Array))

  test('應能正確取得物件的型別', () => expect(型別.取得型別({})).toBe(型別.型別常數.Object))

  test('應能正確取得字串的型別', () => expect(型別.取得型別('sss')).toBe(型別.型別常數.String))

  test('應能正確取得日期的型別', () => expect(型別.取得型別(new Date())).toBe(型別.型別常數.Date))

  test('應能正確取得 RegExp 的型別', () => expect(型別.取得型別(/^.*/)).toBe(型別.型別常數.RegExp))

  test('應能正確取得函數的型別',
       () => expect(型別.取得型別(function () {})).toBe(型別.型別常數.Function))

  test('應能正確取得 Boolean 的型別',
       () => expect(型別.取得型別(1 === 1)).toBe(型別.型別常數.Boolean))

  test('應能正確取得數字的型別', () => expect(型別.取得型別(1)).toBe(型別.型別常數.Number))

  test('應能正確取得 Null 的型別', () => expect(型別.取得型別(null)).toBe(型別.型別常數.Null))

  test('應能正確取得 Undefined 的型別',
       () => expect(型別.取得型別(undefined)).toBe(型別.型別常數.Undefined))
})

describe('測試【是陣列】', () => {
  test('不是傳入陣列應該回傳 false', () => expect(型別.是陣列(1)).toBe(false))

  test('傳入陣列應該回傳 true', () => expect(型別.是陣列([])).toBe(true))
})

describe('測試【是物件】', () => {
  test('不是傳入物件應該回傳 false', () => expect(型別.是物件(1)).toBe(false))

  test('傳入物件應該回傳 true', () => expect(型別.是物件({})).toBe(true))
})

describe('測試【是字串】', () => {
  test('不是傳入字串應該回傳 false', () => expect(型別.是字串(1)).toBe(false))

  test('傳入字串應該回傳 true', () => expect(型別.是字串('')).toBe(true))
})

describe('測試【是日期】', () => {
  test('不是傳入日期應該回傳 false', () => expect(型別.是日期(1)).toBe(false))

  test('傳入日期應該回傳 true', () => expect(型別.是日期(new Date())).toBe(true))
})

describe('測試【是正規表示式】', () => {
  test('不是傳入 RegExp 應該回傳 false', () => expect(型別.是正規表示式(1)).toBe(false))

  test('傳入 RegExp 應該回傳 true', () => expect(型別.是正規表示式(/^.*/)).toBe(true))
})

describe('測試【是函數】', () => {
  test('不是傳入函數應該回傳 false', () => expect(型別.是函數(1)).toBe(false))

  test('傳入函數應該回傳 true', () => expect(型別.是函數(function () {})).toBe(true))
})

describe('測試【是布林值】', () => {
  test('不是傳入函數應該回傳 false', () => expect(型別.是布林值(1)).toBe(false))

  test('傳入函數應該回傳 true', () => expect(型別.是布林值(true)).toBe(true))
})

describe('測試【是數值】', () => {
  test('不是傳入數字應該回傳 false', () => expect(型別.是數值('')).toBe(false))

  test('傳入數字應該回傳 true', () => expect(型別.是數值(1)).toBe(true))
})

describe('測試【是空值】', () => {
  test('不是傳入 null 應該回傳 false', () => expect(型別.是空值(1)).toBe(false))

  test('傳入 null 應該回傳 true', () => expect(型別.是空值(null)).toBe(true))
})

describe('測試【未定義】', () => {
  test('不是傳入 undefined 應該回傳 false', () => expect(型別.未定義(1)).toBe(false))
})

describe('測試【不是陣列】', () => {
  test('不是傳入陣列應該回傳 true', () => expect(型別.不是陣列(1)).toBe(true))

  test('傳入陣列應該回傳 false', () => expect(型別.不是陣列([])).toBe(false))
})

describe('測試【不是物件】', () => {
  test('不是傳入物件應該回傳 true', () => expect(型別.不是物件(1)).toBe(true))

  test('傳入物件應該回傳 false', () => expect(型別.不是物件({})).toBe(false))
})

describe('測試【不是字串】', () => {
  test('不是傳入字串應該回傳 true', () => expect(型別.不是字串(1)).toBe(true))

  test('傳入字串應該回傳 false', () => expect(型別.不是字串('')).toBe(false))
})

describe('測試【不是日期】', () => {
  test('不是傳入日期應該回傳 true', () => expect(型別.不是日期(1)).toBe(true))

  test('傳入日期應該回傳 false', () => expect(型別.不是日期(new Date())).toBe(false))
})

describe('測試【不是正規表示式】', () => {
  test('不是傳入 RegExp 應該回傳 true', () => expect(型別.不是正規表示式(1)).toBe(true))

  test('傳入 RegExp 應該回傳 false', () => expect(型別.不是正規表示式(/^.*/)).toBe(false))
})

describe('測試【不是函數】', () => {
  test('不是傳入函數應該回傳 true', () => expect(型別.不是函數(1)).toBe(true))

  test('傳入函數應該回傳 false', () => expect(型別.不是函數(function () {})).toBe(false))
})

describe('測試【不是布林值】', () => {
  test('不是傳入函數應該回傳 true', () => expect(型別.不是布林值(1)).toBe(true))

  test('傳入函數應該回傳 false', () => expect(型別.不是布林值(false)).toBe(false))
})

describe('測試【不是數值】', () => {
  test('不是傳入數字應該回傳 true', () => expect(型別.不是數值('')).toBe(true))

  test('傳入數字應該回傳 false', () => expect(型別.不是數值(1)).toBe(false))
})

describe('測試【不是空值】', () => {
  test('不是傳入 null 應該回傳 true', () => expect(型別.不是空值(1)).toBe(true))

  test('傳入 null 應該回傳 false', () => expect(型別.不是空值(null)).toBe(false))
})

describe('測試【型別相同】', () => {
  test('傳入兩個物件應該回傳 true', () => expect(型別.型別相同({}, {})).toBe(true))

  test('傳入兩個整數應該回傳 true', () => expect(型別.型別相同(1, 2)).toBe(true))

  test('傳入兩個浮點數應該回傳 true', () => expect(型別.型別相同(1.1, 1.2)).toBe(true))

  test('傳入整數和浮點數應該回傳 true', () => expect(型別.型別相同(1, 1.2)).toBe(true))

  test('傳入兩個字串應該回傳 true', () => expect(型別.型別相同('a', 'b')).toBe(true))

  test('傳入兩個陣列應該回傳 true', () => expect(型別.型別相同([1, 2], [3, 4])).toBe(true))
})
