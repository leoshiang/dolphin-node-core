/** @module 字串工具 **/

/**
 * 判斷詞彙是否同時出現在句子中。
 * @param {*} 詞彙陣列 詞彙陣列，["new", "york"]
 * @param {string} 句子 句子。
 * @return {boolean}
 */
const 詞彙是否同時出現 = (句子, 詞彙陣列) => {
    for (let 詞彙 = 0; 詞彙 < 詞彙陣列.length; 詞彙++) {
        if (句子.indexOf(詞彙陣列[詞彙]) === -1) {
            return false
        }
    }
    return true
}

module.exports = {
    詞彙是否同時出現,
}
