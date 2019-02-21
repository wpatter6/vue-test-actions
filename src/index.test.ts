import testAction from './'

enum Type {
  FAKE_ACTION = 'FAKE_ACTION',
}

describe('test action', () => {
  it('should test action successfully', async () => {
    const actions = {
      async fakeAction(context: any, payload: any) {
        context.commit(Type.FAKE_ACTION, payload)
        context.dispatch(Type.FAKE_ACTION, payload)
        return payload
      },
    }

    const actionPayload = 1
    const expectedMutation = [{
      type: Type.FAKE_ACTION,
      payload: actionPayload,
    }]

    const expectedDispatchs = [{
      type: Type.FAKE_ACTION,
      payload: actionPayload,
    }]

    const value = await testAction(actions.fakeAction, expectedMutation, expectedDispatchs, actionPayload)
    expect(value).toEqual(actionPayload)
  })

  it('should show error message when mutation payload mismatched', () => {
    const actions = {
      async fakeAction(context: any) {
        context.commit(Type.FAKE_ACTION, 10)
      },
    }
    const expectedMutation = [{
      type: Type.FAKE_ACTION,
      payload: 20,
    }]

    testAction(actions.fakeAction, expectedMutation)
  })

  it('should show error message when dispatch payload mismatched', () => {
    const actions = {
      async fakeAction(context: any) {
        context.dispatch(Type.FAKE_ACTION, 10)
      },
    }
    const expectedDispatch = [{
      type: Type.FAKE_ACTION,
      payload: 20,
    }]

    testAction(actions.fakeAction, [], expectedDispatch)
  })

  it('should test action success althrough there are no expected mutations', () => {
    const actions = {
      async fakeAction(context: any) {
        context.commit(Type.FAKE_ACTION)
      },
    }

    testAction(actions.fakeAction)
  })

  it('should test action success althrough there are no expected dispatchs', () => {
    const actions = {
      async fakeAction(context: any) {
        context.dispatch(Type.FAKE_ACTION)
      },
    }

    testAction(actions.fakeAction)
  })

  it('should test action success althrough there are no mutation payload', () => {
    const actions = {
      async fakeAction(context: any) {
        context.commit(Type.FAKE_ACTION)
      },
    }

    const expectedMutation = [{
      type: Type.FAKE_ACTION,
    }]

    testAction(actions.fakeAction, expectedMutation)
  })

  it('should test action success althrough there are no dispatch payload', () => {
    const actions = {
      async fakeAction(context: any) {
        context.dispatch(Type.FAKE_ACTION)
      },
    }

    const expectedDispatchs = [{
      type: Type.FAKE_ACTION,
    }]

    testAction(actions.fakeAction, [], expectedDispatchs)
  })

  it('should show error message when call action error', () => {
    const actions = {
      async fakeAction() {
        throw new Error()
      },
    }

    testAction(actions.fakeAction)
  })
})
