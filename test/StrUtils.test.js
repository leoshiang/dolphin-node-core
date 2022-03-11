const StrUtils = require('../src/StrUtils')

describe('測試 contains', function () {
  test('兩個中文詞彙同時出現在句子，應回傳 true', function () {
    const words = ['今天', '很好']
    const sentence = '今天天氣很好'
    expect(StrUtils.includes(sentence, words)).toBe(true)
  })

  test('兩個中文詞彙只有一個出現在句子，應回傳 false', function () {
    const words = ['今天', '很好']
    const sentence = '天氣很好'
    expect(StrUtils.includes(sentence, words)).toBe(false)
  })

  test('兩個中文詞彙只有一個出現在句子，應回傳 false', function () {
    const words = ['便宜', '好吃']
    const sentence = '提供衛生與美味的食物雖然每次都要等很久但CP值超高便宜又好吃'
    expect(StrUtils.includes(sentence, words)).toBe(false)
  })
})
