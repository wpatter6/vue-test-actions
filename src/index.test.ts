import testAction from './'

describe('test action', () => {
  it('should test action success', async () => {
    const actions = {
      async fakeAction(context: any, payload: any) {
        context.commit('FAKE_ACTION_BEGIN')
        context.commit('FAKE_ACTION_SUCCESS', payload)
        return payload
      },
    }
    const actionPayload = 1
    const expectedMutation = [{
      type: 'FAKE_ACTION_BEGIN',
    }, {
      type: 'FAKE_ACTION_SUCCESS',
      payload: actionPayload,
    }]

    const value = await testAction(actions.fakeAction, expectedMutation, actionPayload)
    expect(value).toEqual(actionPayload)
  })

  it('should show error log if expected failed', () => {
    const actions = {
      async fakeAction(context: any) {
        context.commit('FAKE_ACTION_BEGIN')
        context.commit('FAKE_ACTION_SUCCESS', 10)
      },
    }
    const expectedMutation = [{
      type: 'FAKE_ACTION_BEGIN',
    }, {
      type: 'FAKE_ACTION_SUCCESS',
      payload: 20,
    }]

    testAction(actions.fakeAction, expectedMutation)
  })

  it('should test action success althrough there are no mutations', () => {
    const actions = {
      async fakeAction(context: any) {
        context.commit('FAKE_ACTION_BEGIN')
        context.commit('FAKE_ACTION_SUCCESS')
      },
    }

    testAction(actions.fakeAction)
  })

  it('should show error log if run action failed', () => {
    const actions = {
      async fakeAction(context: any) {
        throw new Error()
      },
    }

    testAction(actions.fakeAction)
  })
})
