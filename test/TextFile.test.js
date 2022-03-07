const {
  TextFile,
  AppendMode,
  WriteMode,
} = require('../src/TextFile')
const os = require('os')
const fs = require('fs')

describe('測試 append', function () {
  test('檔案不存在時，會建立檔案。', function () {
    const tempDir = os.tmpdir()
    let tempFileName = tempDir + '/textfile-test.txt'
    if (fs.existsSync(tempFileName)) {
      fs.unlinkSync(tempFileName)
    }
    let textFile = new TextFile()
    textFile.append(tempFileName)
    expect(fs.existsSync(tempFileName)).toBe(true)
    try {
      fs.unlinkSync(tempFileName)
    } catch (e) {
    }
  })

  test('檔案存在時，內容會加上去。', function () {
    const tempDir = os.tmpdir()
    let tempFileName = tempDir + '/textfile-test.txt'
    if (fs.existsSync(tempFileName)) {
      fs.unlinkSync(tempFileName)
    }
    fs.writeFileSync(tempFileName, 'THIS IS LINE 1\n')

    let textFile = new TextFile()
    textFile.append(tempFileName)
    textFile.writeLine('THIS IS LINE 2')

    let lines = textFile.readAll()
    expect(lines).toBe('THIS IS LINE 1\n' + 'THIS IS LINE 2\n')
    try {
      fs.unlinkSync(tempFileName)
    } catch (e) {
    }
  })

  test('mode 應等於 AppendMode。', function () {
    const tempDir = os.tmpdir()
    let tempFileName = tempDir + '/textfile-test.txt'
    if (fs.existsSync(tempFileName)) {
      fs.unlinkSync(tempFileName)
    }
    fs.writeFileSync(tempFileName, 'THIS IS LINE 1\n')

    let textFile = new TextFile()
    textFile.append(tempFileName)

    expect(textFile.mode).toBe(AppendMode)
    try {
      fs.unlinkSync(tempFileName)
    } catch (e) {
    }
  })

  test('fileName 應等於 傳入的檔案名稱。', function () {
    const tempDir = os.tmpdir()
    let tempFileName = tempDir + '/textfile-test.txt'
    if (fs.existsSync(tempFileName)) {
      fs.unlinkSync(tempFileName)
    }
    fs.writeFileSync(tempFileName, 'THIS IS LINE 1\n')

    let textFile = new TextFile()
    textFile.append(tempFileName)

    expect(textFile.fileName).toBe(tempFileName)
    try {
      fs.unlinkSync(tempFileName)
    } catch (e) {
    }
  })
})

describe('測試 rewrite', function () {
  test('檔案不存在時，會建立檔案。', function () {
    const tempDir = os.tmpdir()
    let tempFileName = tempDir + '/textfile-test.txt'
    if (fs.existsSync(tempFileName)) {
      fs.unlinkSync(tempFileName)
    }

    let textFile = new TextFile()
    textFile.rewrite(tempFileName)
    expect(fs.existsSync(tempFileName)).toBe(true)
    try {
      fs.unlinkSync(tempFileName)
    } catch (e) {
    }
  })

  test('檔案存在時，內容會被清掉。', function () {
    const tempDir = os.tmpdir()
    let tempFileName = tempDir + '/textfile-test.txt'
    if (fs.existsSync(tempFileName)) {
      fs.unlinkSync(tempFileName)
    }
    fs.writeFileSync(tempFileName, 'THIS IS LINE 1\n')

    let textFile = new TextFile()
    textFile.rewrite(tempFileName)
    textFile.writeLine('THIS IS LINE 2')

    let lines = textFile.readAll()
    expect(lines).toBe('THIS IS LINE 2\n')
    try {
      fs.unlinkSync(tempFileName)
    } catch (e) {
    }
  })

  test('mode 應等於 WriteMode。', function () {
    const tempDir = os.tmpdir()
    let tempFileName = tempDir + '/textfile-test.txt'
    if (fs.existsSync(tempFileName)) {
      fs.unlinkSync(tempFileName)
    }
    fs.writeFileSync(tempFileName, 'THIS IS LINE 1\n')

    let textFile = new TextFile()
    textFile.rewrite(tempFileName)

    expect(textFile.mode).toBe(WriteMode)
    try {
      fs.unlinkSync(tempFileName)
    } catch (e) {
    }
  })

  test('fileName 應等於 傳入的檔案名稱。', function () {
    const tempDir = os.tmpdir()
    let tempFileName = tempDir + '/textfile-test.txt'
    if (fs.existsSync(tempFileName)) {
      fs.unlinkSync(tempFileName)
    }
    fs.writeFileSync(tempFileName, 'THIS IS LINE 1\n')

    let textFile = new TextFile()
    textFile.rewrite(tempFileName)

    expect(textFile.fileName).toBe(tempFileName)
    try {
      fs.unlinkSync(tempFileName)
    } catch (e) {
    }
  })
})

describe('測試 write', function () {
  test('如果傳入 undefined，會用空字串取代。', function () {
    const tempDir = os.tmpdir()
    let tempFileName = tempDir + '/textfile-test.txt'
    if (fs.existsSync(tempFileName)) {
      fs.unlinkSync(tempFileName)
    }

    let textFile = new TextFile()
    textFile.rewrite(tempFileName)
    textFile.write()
    textFile.write('a')
    let lines = textFile.readAll()
    expect(lines).toBe('a')
    try {
      fs.unlinkSync(tempFileName)
    } catch (e) {
    }
  })

  test('傳入數字，會自動轉成字串。', function () {
    const tempDir = os.tmpdir()
    let tempFileName = tempDir + '/textfile-test.txt'
    if (fs.existsSync(tempFileName)) {
      fs.unlinkSync(tempFileName)
    }

    let textFile = new TextFile()
    textFile.rewrite(tempFileName)
    textFile.write()
    textFile.write(1234)
    let lines = textFile.readAll()
    expect(lines).toBe('1234')
    try {
      fs.unlinkSync(tempFileName)
    } catch (e) {
    }
  })
})

describe('測試 writeLine', function () {
  test('如果傳入 undefined，會用空字串取代。', function () {
    const tempDir = os.tmpdir()
    let tempFileName = tempDir + '/textfile-test.txt'
    if (fs.existsSync(tempFileName)) {
      fs.unlinkSync(tempFileName)
    }

    let textFile = new TextFile()
    textFile.rewrite(tempFileName)
    textFile.writeLine()
    textFile.writeLine('a')
    let lines = textFile.readAll()
    expect(lines).toBe('\na\n')
    try {
      fs.unlinkSync(tempFileName)
    } catch (e) {
    }
  })

  test('傳入數字，會自動轉成字串。', function () {
    const tempDir = os.tmpdir()
    let tempFileName = tempDir + '/textfile-test.txt'
    if (fs.existsSync(tempFileName)) {
      fs.unlinkSync(tempFileName)
    }

    let textFile = new TextFile()
    textFile.rewrite(tempFileName)
    textFile.writeLine()
    textFile.writeLine(1234)
    let lines = textFile.readAll()
    expect(lines).toBe('\n1234\n')
    try {
      fs.unlinkSync(tempFileName)
    } catch (e) {
    }
  })
})
