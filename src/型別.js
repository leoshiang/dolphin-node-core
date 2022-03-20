/** @module 型別 **/

const 型別常數 = {
    Array: 'Array',
    Boolean: 'Boolean',
    Date: 'Date',
    Function: 'Function',
    Null: 'Null',
    Number: 'Number',
    Object: 'Object',
    RegExp: 'RegExp',
    String: 'String',
    Undefined: 'Undefined',
}

const 取得型別 = (obj) => Object.prototype.toString.call(obj).slice(8, -1)
const 是陣列 = (obj) => 取得型別(obj) === 型別常數.Array
const 是布林值 = (obj) => 取得型別(obj) === 型別常數.Boolean
const 是日期 = (obj) => 取得型別(obj) === 型別常數.Date
const 是函數 = (obj) => 取得型別(obj) === 型別常數.Function
const 是空值 = (obj) => 取得型別(obj) === 型別常數.Null
const 是數值 = (obj) => 取得型別(obj) === 型別常數.Number
const 是物件 = (obj) => 取得型別(obj) === 型別常數.Object
const 是正規表示式 = (obj) => 取得型別(obj) === 型別常數.RegExp
const 是字串 = (obj) => 取得型別(obj) === 型別常數.String
const 未定義 = (obj) => 取得型別(obj) === 型別常數.Undefined
const 不是陣列 = (obj) => 取得型別(obj) !== 型別常數.Array
const 不是布林值 = (obj) => 取得型別(obj) !== 型別常數.Boolean
const 不是日期 = (obj) => 取得型別(obj) !== 型別常數.Date
const 不是函數 = (obj) => 取得型別(obj) !== 型別常數.Function
const 不是空值 = (obj) => 取得型別(obj) !== 型別常數.Null
const 不是數值 = (obj) => 取得型別(obj) !== 型別常數.Number
const 不是物件 = (obj) => 取得型別(obj) !== 型別常數.Object
const 不是正規表示式 = (obj) => 取得型別(obj) !== 型別常數.RegExp
const 不是字串 = (obj) => 取得型別(obj) !== 型別常數.String
const 型別相同 = (obj, other) => 取得型別(obj) === 取得型別(other)

const 容許值 = 1.0E-8 // 1.0E-150

const 數值相等 = (a, b) => Math.abs(a - b) <= 容許值
const 極小值 = (x) => Math.abs(x) < 容許值
const 去除小數部分連續的0 = (x) => parseFloat( x.toFixed(8).toString())

module.exports = {
    型別常數,
    取得型別,
    是陣列,
    是布林值,
    是日期,
    是函數,
    是空值,
    是數值,
    是物件,
    是正規表示式,
    是字串,
    未定義,
    不是陣列,
    不是布林值,
    不是日期,
    不是函數,
    不是空值,
    不是數值,
    不是物件,
    不是正規表示式,
    不是字串,
    型別相同,
    數值相等,
    極小值,
    去除小數部分連續的0
}
