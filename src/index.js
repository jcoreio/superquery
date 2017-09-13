/* eslint-env commonjs */

import assign from 'lodash.assign'

function createQuery({parse, stringify}) {
  function Query(...args) {
    if (!(this instanceof Query)) return new Query(...args)
    args.forEach(arg => {
      if (typeof arg === 'string') assign(this, parse(arg))
      else if (arg instanceof Object && !Array.isArray(arg) && !(arg instanceof Function)) assign(this, arg)
      else throw new Error('invalid argument: ' + arg)
    })
  }
  Object.defineProperty(Query.prototype, 'toString', {
    value: function toString() {
      return stringify(this)
    }
  })

  return Query
}

module.exports = createQuery

