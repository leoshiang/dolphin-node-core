const fs = require('fs')

const WriteMode = { flag: 'w+' }
const AppendMode = { flag: 'a' }

class TextFile {
  constructor (fileName) {
    this.fileName = fileName
    fs.writeFileSync(this.fileName, '', WriteMode)
  }

  readAll () {
    return fs.readFileSync(this.fileName).toString()
  }

  write (line) {
    fs.writeFileSync(this.fileName, line, AppendMode)
  }

  writeLine (line) {
    this.write(line + '\r\n')
  }
}

module.exports = { TextFile }
