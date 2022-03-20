const 矩陣 = require('./src/矩陣')
const a = new 矩陣([1, 2], [3, 4])
const b = new 矩陣([4, 5], [6, 7])
console.log(a.乘(b).相等(b.乘(a)))
