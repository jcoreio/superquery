// @flow

import {describe, it} from 'mocha'
import {expect} from 'chai'
import 'url-search-params-polyfill'
import createQuery from '../src'

/* global URLSearchParams */

const Query = createQuery({
  parse: search => {
    const result = {}
    for (let [key, value] of new URLSearchParams(search)) {
      result[key] = value
    }
    return result
  },
  stringify: obj => new URLSearchParams(obj).toString(),
})

describe('Query', () => {
  it('handles multiple arguments to constructor', () => {
    expect(Query('a=1%20a&c=2', {hello: 'world'}, 'foo=bar')).to.deep.equal({
      a: '1 a',
      c: '2',
      hello: 'world',
      foo: 'bar',
    })
  })
  it('handles a Query passed to constructor', () => {
    expect(Query(Query('a=1%20a&c=2'), {hello: 'world'}, 'foo=bar')).to.deep.equal({
      a: '1 a',
      c: '2',
      hello: 'world',
      foo: 'bar',
    })
  })
  it("throws an error if an argument isn't a string or object", () => {
    // $FlowFixMe
    expect(() => Query([])).to.throw(Error)
    // $FlowFixMe
    expect(() => Query(2)).to.throw(Error)
    function foo() {}
    expect(() => Query(foo)).to.throw(Error)
  })
  it('supports new operator', () => {
    expect(new Query('a=1&c=2', {hello: 'world'}, 'foo=bar')).to.deep.equal({
      a: '1',
      c: '2',
      hello: 'world',
      foo: 'bar',
    })
  })
  it('has proper toString method', () => {
    // $FlowFixMe
    expect('' + Query('a=1&c=2', {hello: 'world'}, 'foo=bar')).to.equal('a=1&c=2&hello=world&foo=bar')
    // $FlowFixMe
    expect(`http://localhost?${Query('a=1&c=2', {hello: 'world'}, 'foo=bar')}`).to.equal(
      'http://localhost?a=1&c=2&hello=world&foo=bar'
    )
  })
})

