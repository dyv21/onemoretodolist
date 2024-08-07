import {v1} from "uuid";
import {TasksStateType} from "../App";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

export type RemoveTaskActionType = {
  type: 'REMOVE-TASK'
  payload: {
    id: string
    todolistId: string
  }
}
export type AddTaskActionType = {
  type: 'ADD-TASK'
  payload: {
    title: string
    todolistId: string
  }
}
export type ChangeTaskStatusActionType = {
  type: 'CHANGE-TASK-STATUS'
  payload: {
    id: string
    isDone: boolean
    todolistId: string
  }
}
export type ChangeTaskTitleActionType = {
  type: 'CHANGE-TASK-TITLE'
  payload: {
    id: string
    title: string
    todolistId: string
  }
}

export type TasksActionsType =
  | RemoveTaskActionType
  | AddTaskActionType
  | ChangeTaskStatusActionType
  | ChangeTaskTitleActionType
  | AddTodolistActionType
  | RemoveTodolistActionType


const initialState: TasksStateType = {}

export const removeTaskAC = (id: string, todolistId: string): RemoveTaskActionType => {
  return {type: 'REMOVE-TASK', payload: {id, todolistId}} as const
}
export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
  return {type: 'ADD-TASK', payload: {title, todolistId}} as const
}
export const changeTaskStatusAC = (id: string, isDone: boolean, todolistId: string): ChangeTaskStatusActionType => {
  return {type: 'CHANGE-TASK-STATUS', payload: {id, isDone, todolistId}} as const
}
export const changeTaskTitleAC = (id: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
  return {type: 'CHANGE-TASK-TITLE', payload: {id, title, todolistId}} as const
}

export const tasksReducer = (state = initialState, action: TasksActionsType): TasksStateType => {
  switch (action.type) {
    case 'REMOVE-TASK': {
      const todoListId = action.payload.todolistId
      return {
        ...state,
        [todoListId]: state[todoListId].filter(t => t.id !== action.payload.id)
      }
    }
    case 'ADD-TASK': {
      const todoListId = action.payload.todolistId
      const newTaskList = state[todoListId]
      const newTaskTemplate = {id: v1(), title: action.payload.title, isDone: false}

      return {
        ...state,
        [todoListId]: Array(newTaskTemplate, ...newTaskList)
      }
    }
    case 'CHANGE-TASK-STATUS': {
      const todoListId = action.payload.todolistId
      return {
        ...state,
        [todoListId]: state[todoListId]
          .map(t => t.id === action.payload.id ? {...t, isDone: action.payload.isDone} : t)
      }
    }
    case 'CHANGE-TASK-TITLE': {
      const todoListId = action.payload.todolistId
      return {
        ...state,
        [todoListId]: state[todoListId]
          .map(t => t.id === action.payload.id ? {...t, title: action.payload.title} : t)
      }
    }
    case 'ADD-TODOLIST': {
      return {
        ...state,
        [action.payload.todoListId]: []
      }
    }
    case 'REMOVE-TODOLIST': {
      let copyState = {...state}
      delete copyState[action.payload.id]
      return copyState
    }

    default:
      return state
  }
}