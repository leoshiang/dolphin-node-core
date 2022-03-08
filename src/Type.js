/** @module Type **/

const Types = {
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

const getType = (obj) => Object.prototype.toString.call(obj)
  .slice(8, -1)
const isArray = (obj) => getType(obj) === Types.Array
const isBoolean = (obj) => getType(obj) === Types.Boolean
const isDate = (obj) => getType(obj) === Types.Date
const isFunction = (obj) => getType(obj) === Types.Function
const isNull = (obj) => getType(obj) === Types.Null
const isNumber = (obj) => getType(obj) === Types.Number
const isObject = (obj) => getType(obj) === Types.Object
const isRegExp = (obj) => getType(obj) === Types.RegExp
const isString = (obj) => getType(obj) === Types.String
const isUndefined = (obj) => getType(obj) === Types.Undefined
const isNotArray = (obj) => getType(obj) !== Types.Array
const isNotBoolean = (obj) => getType(obj) !== Types.Boolean
const isNotDate = (obj) => getType(obj) !== Types.Date
const isNotFunction = (obj) => getType(obj) !== Types.Function
const isNotNull = (obj) => getType(obj) !== Types.Null
const isNotNumber = (obj) => getType(obj) !== Types.Number
const isNotObject = (obj) => getType(obj) !== Types.Object
const isNotRegExp = (obj) => getType(obj) !== Types.RegExp
const isNotString = (obj) => getType(obj) !== Types.String
const isNotUndefined = (obj) => getType(obj) !== Types.Undefined
const isZero = (obj) => obj === 0
const sameType = (obj, other) => getType(obj) === getType(other)

module.exports = {
  Types,
  getType,
  isArray,
  isBoolean,
  isDate,
  isFunction,
  isNull,
  isNumber,
  isObject,
  isRegExp,
  isString,
  isUndefined,
  isNotArray,
  isNotBoolean,
  isNotDate,
  isNotFunction,
  isNotNull,
  isNotNumber,
  isNotObject,
  isNotRegExp,
  isNotString,
  isNotUndefined,
  isZero,
  sameType,
}
