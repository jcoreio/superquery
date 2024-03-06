# superquery

[![Build Status](https://travis-ci.org/jcoreio/superquery.svg?branch=master)](https://travis-ci.org/jcoreio/superquery)
[![Coverage Status](https://coveralls.io/repos/github/jcoreio/superquery/badge.svg?branch=master)](https://coveralls.io/github/jcoreio/superquery?branch=master)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

# DEPRECATED

This library is no longer being maintained.

## Usage

```sh
npm install --save superquery
```

```js
import createQuery from 'superquery'

// choose parse and stringify functions from whatever library you want and pass them in
import {parse, stringify} from 'qs'
const Query = createQuery({parse, stringify})
```

### `Query(...)` takes as many search strings or objects you want and merges them together

```js
const query = Query('strings=work', {objects: 'work too'}, 'arguments=are%20unlimited')
// query.strings === 'work'
// query.objects === 'work too'
// query.arguments === 'are unlimited'
```

### `Query(...).toString()` returns the query string, so it works inside template strings:

```
const newURL = `http://localhost?${Query('strings=work', {objects: 'work too'}, 'arguments=are%20unlimited')}`
// http://localhost?strings=work&objects=work%20too&arguments=are%20unlimited
```

### So `Query` is super convenient for merging extra values into the existing query:

```js
const Results = ({match, location}) => (
  <div>
    <table>...</table>
    ...
    <Link to={`${match.url}?${Query(location.search, {page: 1})}`}>
      Page 1
    </Link>
    <Link to={`${match.url}?${Query(location.search, {page: 2})}`}>
      Page 2
    </Link>
    ...
  </div>
)
```

