/** @module StrUtils **/

/**
 * 判斷詞彙是否同時出現在句子中。
 * @param {*} words 詞彙陣列，["new", "york"]
 * @param {string} sentence 句子。
 * @return {boolean}
 */
const includes = (sentence, words) => {
  for (let word = 0; word < words.length; word++) {
    if (sentence.indexOf(words[word]) === -1) {
      return false
    }
  }
  return true
}

module.exports = {
  includes,
}
