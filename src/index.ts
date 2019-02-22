// tslint:disable:max-line-length

export type Action = any
export type Mutations = Mutation[]
export type Dispatchs = Dispatch[]

export interface Mutation {
  type: string
  payload?: any
}

export interface Dispatch {
  type: string
  payload?: any
}

export interface Store {
  state: {}
  getter?: {}
}

const testAction = async (action: Action, expectedMutations: Mutations = [], expectedDispatchs: Dispatchs = [], actionPayload?: any, store?: Store) => {
  let countMutation: number = 0
  let countDispatch: number = 0

  // mock commit
  const commit = async (type: string, payload?: any) => {
    try {
      if (expectedMutations.length !== 0) {
        const mutation = expectedMutations[countMutation]
        countMutation++
        await expect(type).toEqual(mutation.type)

        if (payload) {
          await expect(payload).toEqual(mutation.payload)
        }
      }
    } catch (e) {
      console.error(`[COMMIT ${type} FAIL] \n`, e)
    }
  }

  // mock dispatch
  const dispatch = (type: string, payload?: any) => {
    try {
      if (expectedDispatchs.length !== 0) {
        const dispatcher = expectedDispatchs[countDispatch]
        countDispatch++

        expect(dispatcher.type).toEqual(type)
        if (payload) {
          expect(payload).toEqual(dispatcher.payload)
        }
      }
    } catch (e) {
      console.error(`[DISPATCH ${type} FAIL] \n`, e)
    }
  }

  // call the action with mocked store
  let result: any
  try {
    result = await action({ commit, dispatch, ...store }, actionPayload)
  } catch (e) {
    console.error(`[ACTION '${action.name}' FAIL] \n`, e)
  }

  if (expectedMutations.length === 0) {
    expect(countMutation).toEqual(0)
  } else {
    expect(countMutation).toEqual(expectedMutations.length)
  }

  if (expectedDispatchs.length === 0) {
    expect(countDispatch).toEqual(0)
  } else {
    expect(countDispatch).toEqual(expectedDispatchs.length)
  }

  if (result !== undefined) {
    return result
  }
}

export default testAction
