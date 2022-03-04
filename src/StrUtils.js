/**
 * 判斷詞彙是否同時出現在句子中。
 * @param {[string]} words 詞彙陣列，["new", "york"]
 * @param {string} sentence 句子。
 * @return {boolean}
 */
const contains = (sentence, words) => {
  let count = 0
  words.forEach(x => {
    let regex = new RegExp(`(^|\\W)${x}($|\\W)`)
    if (sentence.match(regex)) {
      count++
    }
  })
  return count >= words.length
}

module.exports = {
  contains,
}
