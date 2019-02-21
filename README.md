[![npm (scoped)](https://img.shields.io/npm/v/@onedaycat/vue-test-actions.svg)](https://www.npmjs.com/package/@onedaycat/vue-test-actions)
[![GitHub](https://img.shields.io/github/license/onedaycat/vue-test-actions.svg)](LICENSE)
[![Coverage Status](https://coveralls.io/repos/github/onedaycat/vue-test-actions/badge.svg?branch=master)](https://coveralls.io/github/onedaycat/vue-test-actions?branch=master)
[![Build Status](https://travis-ci.org/onedaycat/vue-test-actions.svg?branch=master)](https://travis-ci.org/onedaycat/vue-test-actions)

# vue-test-actions
A utility to unit test Vuex actions

## Install
```sh
npm install @onedaycat/vue-test-actions
```
or
```sh
yarn add @onedaycat/vue-test-actions
```

## Usage
```typescript
import testAction from '@onedaycat/vue-test-actions'

const value = await testAction(ACTION, EXPECTED_MUTATIONS, EXPECTED_DISPATCHS, ACTION_PAYLOAD, STORE)
```

## Example
#### constants.ts
```typescript
export FETCH_PRODUCT_BEGIN = 'FETCH_PRODUCT_BEGIN'
export FETCH_PRODUCT_SUCCESS = 'FETCH_PRODUCT_SUCCESS'
export FETCH_PRODUCT_FAILURE = 'FETCH_PRODUCT_FAILURE'
```

#### actions.ts
```typescript
import { ActionTree } from 'vuex'
import * as constants from './constants'

const actions: ActionTree<Store.Product, Store.Root> = {
  async fetchProduct(context, payload: number) {
    context.commit(constants.FETCH_PRODUCT_BEGIN)
    try {
      context.commit(constants.FETCH_PRODUCT_SUCCESS, payload)
    } catch (e) {
      context.commit(constants.FETCH_PRODUCT_FAILURE, e)
    }
  },
}

export default actions
```

#### actions.test.ts
```typescript
import testAction from '@onedaycat/vue-test-actions'
import actions from './actions'
import * as constants from './constants'

it('should fetch product success', async () => {
  const actionPayload = 1
  const expectedMutations = [{
    type: constants.FETCH_PRODUCT_BEGIN,
  }, {
    type: constants.FETCH_PRODUCT_SUCCESS,
    payload: actionPayload,
  }]

  const expectedDispatchs = []

  await testAction(actions.fetchProduct, expectedMutations, expectedDispatchs, actionPayload)
})
```

## Contributing
1. Fork this repository.
2. Create new branch with feature name in format `feature/FEATURE_NAME`
3. Run `npm install` or `yarn`
3. Create your feature.
4. Commit and set commit message with feature name.
5. Push your code to your fork repository.
6. Create pull request.

## Licence
[MIT](LICENSE)