const 向量 = require('./src/向量')
const 矩陣 = require('./src/矩陣')
const {文字檔案} = require('./src/文字檔案')
const 型別 = require('./src/型別')
const 字串工具 = require('./src/字串工具')
const {
    索引超出範圍錯誤,
    型別錯誤,
    參數錯誤
} = require('./src/例外')

module.exports = {
    向量,
    矩陣,
    文字檔案,
    型別,
    字串工具,
    索引超出範圍錯誤,
    型別錯誤,
    參數錯誤
}
