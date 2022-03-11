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
})
