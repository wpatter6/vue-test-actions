export type Action = any
export type Mutations = Mutation[]

export interface Mutation {
  type: string,
  payload?: any,
}

export interface Store {
  state: {},
  getter?: {},
}

const testAction = async (action: Action, expectedMutations: Mutations = [], actionPayload?: any, store?: Store) => {
  let countMutation: number = 0

  // mock commit
  const commit = async (type: string, payload?: any) => {
    try {
      if (expectedMutations.length !== 0) {
        const mutation = expectedMutations[countMutation]
        countMutation++
        await expect(type).toEqual(mutation.type)

        if (payload) {
          expect(payload).toEqual(mutation.payload)
        }
      }
    } catch (e) {
      console.error(`[COMMIT ${type} FAIL] \n`, e)
    }
  }

  // call the action with mocked store
  let result: any
  try {
    result = await action({commit, ...store}, actionPayload)
  } catch (e) {
    console.error(`[ACTION '${action.name}' FAIL] \n`, e)
  }

  if (expectedMutations.length === 0) {
    expect(countMutation).toEqual(0)
  } else {
    expect(countMutation).toEqual(expectedMutations.length)
  }

  if (result !== undefined) {
    return result
  }
}

export default testAction
