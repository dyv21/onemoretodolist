import React from 'react';
import {AddInputForm} from "../AddInputForm";
import {TaskList, TaskType} from "../Task/TaskList";
import {FilterValuesType} from "../../App";
import EditableSpan from "../Task/EditableSpan";
import {Button, Grid, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";

export type TasksListPropsType = {
  tasks: Array<TaskType>,
  removeTask: (id: string, todolistId: string) => void,
  changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void,
  todoListId: string
  changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void,
}

export type TodoListPropsType = {
  tasks: Array<TaskType>,
  removeTask: (id: string, todolistId: string) => void,
  changeFilter: (todoListId: string, filter: FilterValuesType) => void,
  addTask: (title: string, todolistId: string) => void,
  changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void,
  filter: FilterValuesType,
  id: string,
  title: string
  removeTodolistHandler: (id: string) => void,
  changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void,
  changeTodoListTitle: (todolistId: string, newTitle: string) => void,
}

export const TodoList = (props: TodoListPropsType) => {

  const onChangeAllHandler = () => props.changeFilter(props.id, 'all')
  const onChangeActiveHandler = () => props.changeFilter(props.id, 'active')
  const onChangeCompletedHandler = () => props.changeFilter(props.id, 'completed')
  const addTaskCallBack = (title: string) => props.addTask(title, props.id)
  const onChangeTitleHandler = (title: string) => props.changeTodoListTitle(props.id, title)

  return (
    <div>
      <Grid container>
        <h3><EditableSpan title={props.title} onChange={onChangeTitleHandler}/></h3>
        <IconButton size='small' onClick={() => props.removeTodolistHandler(props.id)}>
          <Delete/>
        </IconButton>
      </Grid>

      <AddInputForm addItem={addTaskCallBack}/>
      {props.tasks && props.tasks.length === 0 && <p>List ii empty</p>}
      <TaskList
        tasks={props.tasks}
        removeTask={props.removeTask}
        changeTaskStatus={props.changeTaskStatus}
        changeTaskTitle={props.changeTaskTitle}
        todoListId={props.id}
      />
      <div>
        <Button onClick={onChangeAllHandler} variant={props.filter === 'all' ? "contained" : 'text'}>All</Button>
        <Button onClick={onChangeActiveHandler}
                variant={props.filter === 'active' ? "contained" : 'text'}>Active</Button>
        <Button onClick={onChangeCompletedHandler}
                variant={props.filter === 'completed' ? "contained" : 'text'}>Completed</Button>
      </div>
    </div>
  );
};

