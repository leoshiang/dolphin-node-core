/** @module Exceptions **/

/**
 * @class
 */
class IndexOutOfRangeError extends Error {
  constructor (message) {
    super(message)
    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
  }
}

/**
 * @class
 */
class InvalidParameterError extends Error {
  constructor (message) {
    super(message)
    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
  }
}

/**
 * @class
 */
class TypeError extends Error {
  constructor (message) {
    super(message)
    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
  }
}

module.exports = {
  IndexOutOfRangeError,
  TypeError,
  InvalidParameterError,
}
