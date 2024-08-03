type StateType = {
    age: number
    name: string
    childrenCount: number
}

type ActionType = {
    type: string
    [key: string]: any

}

export const userReduser = (state :StateType, action:ActionType) => {
    switch (action.type) {
        case "IncrementAge":
       let newState = {...state};
            newState.age = state.age + 1;
            return newState;
        case "IncrementChildrenCount":
            return {
                ...state,
                childrenCount: state.childrenCount + 1
            }
        case "ChangeName":
            return {
                ...state,
                name: action.newName
            }
        default:
            throw new Error("Bad action type");
    }
}
