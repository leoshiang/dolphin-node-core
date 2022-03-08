const type = require('../src/Type')

describe('測試 getType',
         () => {
           test('應能正確取得陣列的型別',
                () => expect(type.getType([])).toBe(type.Types.Array))

           test('應能正確取得物件的型別',
                () => expect(type.getType({})).toBe(type.Types.Object))

           test('應能正確取得字串的型別',
                () => expect(type.getType('sss')).toBe(type.Types.String))

           test('應能正確取得日期的型別',
                () => expect(type.getType(new Date())).toBe(type.Types.Date))

           test('應能正確取得 RegExp 的型別',
                () => expect(type.getType(/^.*/)).toBe(type.Types.RegExp))

           test('應能正確取得函數的型別',
                () => expect(type.getType(function () {})).toBe(type.Types.Function))

           test('應能正確取得 Boolean 的型別',
                () => expect(type.getType(1 === 1)).toBe(type.Types.Boolean))

           test('應能正確取得數字的型別',
                () => expect(type.getType(1)).toBe(type.Types.Number))

           test('應能正確取得 Null 的型別',
                () => expect(type.getType(null)).toBe(type.Types.Null))

           test('應能正確取得 Undefined 的型別',
                () => expect(type.getType(undefined)).toBe(type.Types.Undefined))
         })

describe('測試 isArray',
         () => {
           test('不是傳入陣列應該回傳 false',
                () => expect(type.isArray(1)).toBe(false))

           test('傳入陣列應該回傳 true',
                () => expect(type.isArray([])).toBe(true))
         })

describe('測試 isObject',
         () => {
           test('不是傳入物件應該回傳 false',
                () => expect(type.isObject(1)).toBe(false))

           test('傳入物件應該回傳 true',
                () => expect(type.isObject({})).toBe(true))
         })

describe('測試 isString',
         () => {
           test('不是傳入字串應該回傳 false',
                () => expect(type.isString(1)).toBe(false))

           test('傳入字串應該回傳 true',
                () => expect(type.isString('')).toBe(true))
         })

describe('測試 isDate',
         () => {
           test('不是傳入日期應該回傳 false',
                () => expect(type.isDate(1)).toBe(false))

           test('傳入日期應該回傳 true',
                () => expect(type.isDate(new Date())).toBe(true))
         })

describe('測試 isRegExp',
         () => {
           test('不是傳入 RegExp 應該回傳 false',
                () => expect(type.isRegExp(1)).toBe(false))

           test('傳入 RegExp 應該回傳 true',
                () => expect(type.isRegExp(/^.*/)).toBe(true))
         })

describe('測試 isFunction',
         () => {
           test('不是傳入函數應該回傳 false',
                () => expect(type.isFunction(1)).toBe(false))

           test('傳入函數應該回傳 true',
                () => expect(type.isFunction(function () {})).toBe(true))
         })

describe('測試 isBoolean',
         () => {
           test('不是傳入函數應該回傳 false',
                () => expect(type.isBoolean(1)).toBe(false))

           test('傳入函數應該回傳 true',
                () => expect(type.isBoolean(true)).toBe(true))
         })

describe('測試 isNumber',
         () => {
           test('不是傳入數字應該回傳 false',
                () => expect(type.isNumber('')).toBe(false))

           test('傳入數字應該回傳 true',
                () => expect(type.isNumber(1)).toBe(true))
         })

describe('測試 isNull',
         () => {
           test('不是傳入 null 應該回傳 false',
                () => expect(type.isNull(1)).toBe(false))

           test('傳入 null 應該回傳 true',
                () => expect(type.isNull(null)).toBe(true))
         })

describe('測試 isUndefined',
         () => {
           test('不是傳入 undefined 應該回傳 false',
                () => expect(type.isUndefined(1)).toBe(false))
         })

describe('測試 isNotArray',
         () => {
           test('不是傳入陣列應該回傳 true',
                () => expect(type.isNotArray(1)).toBe(true))

           test('傳入陣列應該回傳 false',
                () => expect(type.isNotArray([])).toBe(false))
         })

describe('測試 isNotObject',
         () => {
           test('不是傳入物件應該回傳 true',
                () => expect(type.isNotObject(1)).toBe(true))

           test('傳入物件應該回傳 false',
                () => expect(type.isNotObject({})).toBe(false))
         })

describe('測試 isNotObject',
         () => {
           test('不是傳入字串應該回傳 true',
                () => expect(type.isNotString(1)).toBe(true))

           test('傳入字串應該回傳 false',
                () => expect(type.isNotString('')).toBe(false))
         })

describe('測試 isNotObject',
         () => {
           test('不是傳入日期應該回傳 true',
                () => expect(type.isNotDate(1)).toBe(true))

           test('傳入日期應該回傳 false',
                () => expect(type.isNotDate(new Date())).toBe(false))
         })

describe('測試 isNotRegExp',
         () => {
           test('不是傳入 RegExp 應該回傳 true',
                () => expect(type.isNotRegExp(1)).toBe(true))

           test('傳入 RegExp 應該回傳 false',
                () => expect(type.isNotRegExp(/^.*/)).toBe(false))
         })

describe('測試 isNotFunction',
         () => {
           test('不是傳入函數應該回傳 true',
                () => expect(type.isNotFunction(1)).toBe(true))

           test('傳入函數應該回傳 false',
                () => expect(type.isNotFunction(function () {})).toBe(false))
         })

describe('測試 isNotBoolean',
         () => {
           test('不是傳入函數應該回傳 true',
                () => expect(type.isNotBoolean(1)).toBe(true))

           test('傳入函數應該回傳 false',
                () => expect(type.isNotBoolean(false)).toBe(false))
         })

describe('測試 isNotNumber',
         () => {
           test('不是傳入數字應該回傳 true',
                () => expect(type.isNotNumber('')).toBe(true))

           test('傳入數字應該回傳 false',
                () => expect(type.isNotNumber(1)).toBe(false))
         })

describe('測試 isNotNull',
         () => {
           test('不是傳入 null 應該回傳 true',
                () => expect(type.isNotNull(1)).toBe(true))

           test('傳入 null 應該回傳 false',
                () => expect(type.isNotNull(null)).toBe(false))
         })

describe('測試 isNotUndefined',
         () => {
           test('不是傳入 undefined 應該回傳 true',
                () => expect(type.isNotUndefined(1)).toBe(true))
         })

describe('測試 isZero',
         () => {
           test('傳入非數值應該回傳 false',
                () => expect(type.isZero({})).toBe(false))

           test('傳入非數值應該回傳 false',
                () => expect(type.isZero('0')).toBe(false))

           test('傳入非零數值應該回傳 false',
                () => expect(type.isZero(2)).toBe(false))

           test('傳入數值零應該回傳 true',
                () => expect(type.isZero(0)).toBe(true))
         })

describe('測試 sameType',
         () => {
           test('傳入兩個物件應該回傳 true',
                () => expect(type.sameType({},
                                           {})).toBe(true))

           test('傳入兩個整數應該回傳 true',
                () => expect(type.sameType(1,
                                           2)).toBe(true))

           test('傳入兩個浮點數應該回傳 true',
                () => expect(type.sameType(1.1,
                                           1.2)).toBe(true))

           test('傳入整數和浮點數應該回傳 true',
                () => expect(type.sameType(1,
                                           1.2)).toBe(true))

           test('傳入兩個字串應該回傳 true',
                () => expect(type.sameType('a',
                                           'b')).toBe(true))

           test('傳入兩個陣列應該回傳 true',
                () => expect(type.sameType([1,2],
                                           [3,4])).toBe(true))
         })
