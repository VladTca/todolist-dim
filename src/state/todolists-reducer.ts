import {TodolistType} from "../App";

type ActionType = {
    type: string
    [key: string]: any

}

export const todolistsReducer = (state :TodolistType[], action:ActionType):TodolistType[] => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter((tl) => tl.id != action.id);
        case "ADD-TODOLIST":
            return [...state, action.todolist];
        case "CHANGE-TODOLIST-TITLE":
            return state.map((tl) => tl.id === action.id ? {...tl, title: action.title} : tl);
        case "CHANGE-TODOLIST-FILTER":
            return state.map((tl) => tl.id === action.id ? {...tl, filter: action.filter} : tl);

        default:
            throw new Error("Bad action type");
    }
}
