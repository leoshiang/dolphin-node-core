/** @module Exceptions **/

/**
 * @class
 */
class KeyNotExistsException extends Error {
  constructor (message) {
    super(message)
    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
  }
}

/**
 * @class
 */
class IndexOutOfRangeException extends Error {
  constructor (message) {
    super(message)
    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
  }
}

/**
 * @class
 */
class InvalidParameterException extends Error {
  constructor (message) {
    super(message)
    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
  }
}

module.exports = {
  KeyNotExistsException,
  IndexOutOfRangeException,
  InvalidParameterException,
}
