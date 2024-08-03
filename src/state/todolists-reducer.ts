import {FilterValuesType, TodolistType} from "../App";

// type ActionType = {
//     type: string
//     [key: string]: any
//
// }

type RemoveTodolistActionType = {
    type: "REMOVE-TODOLIST"
    id: string
}

type AddTodolistActionType = {
    type: "ADD-TODOLIST"
    todolist: TodolistType
}

type ChangeTodolistTitleActionType = {
    type: "CHANGE-TODOLIST-TITLE"
    id: string
    title: string
}

export type ChangeTodolistFilterActionType = {
    type: "CHANGE-TODOLIST-FILTER"
    id: string
    filter: FilterValuesType
}

type ActionType = RemoveTodolistActionType | AddTodolistActionType
    | ChangeTodolistTitleActionType | ChangeTodolistFilterActionType

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

export const RemoveTodolistAC = (id: string): RemoveTodolistActionType => {
    return {type: "REMOVE-TODOLIST", id}
}

export const AddTodolistAC = (todolist: TodolistType): AddTodolistActionType => {
    return {type: "ADD-TODOLIST", todolist}
}

export const ChangeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return {type: "CHANGE-TODOLIST-TITLE", id, title}
}
export const  ChangeToloListFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {type: "CHANGE-TODOLIST-FILTER", id, filter}
}