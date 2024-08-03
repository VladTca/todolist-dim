import {userReduser} from "./user_reduser";

test('user reducer should increment only age', () => {
    const startState = {
        age: 20,
        childrenCount: 2,
        name: 'Dimych'
    }
    const action = {type: 'IncrementAge'}
    const endState = userReduser(startState, action)
    expect(endState.age).toBe(21)
    expect(endState.childrenCount).toBe(2)
})

test('user reduxer should increment only childrenCount', () => {
    const startState = {
        age: 20,
        childrenCount: 2,
        name: 'Dimych'
    }
    const action = {type: 'IncrementChildrenCount'}
    const endState = userReduser(startState, action)
    expect(endState.age).toBe(20)
    expect(endState.childrenCount).toBe(3)
})

test('user reducer should change name of user', () => {
    const startState = {
        age: 20,
        childrenCount: 2,
        name: 'Dimych'
    }
    const newName = 'Viktor'

    const action = {type: 'ChangeName', newName: newName}
    const endState = userReduser(startState, action)
    expect(endState.name).toBe(newName)
})