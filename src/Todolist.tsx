import { FilterValuesType, TaskType } from "./App";
import { ChangeEvent, KeyboardEvent, useState } from "react";
import { Button } from "./Button";
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";
import { Task } from "./Task";

type PropsType = {
  title: string;
  todolistId: string;
  tasks: TaskType[];
  removeTask: (taskId: string, todolistId: string) => void;
  changeFilter: (filter: FilterValuesType, todolistId: string) => void;
  addTask: (title: string, todolistId: string) => void;
  changeTaskStatus: (
    taskId: string,
    taskStatus: boolean,
    todolistId: string,
  ) => void;
  filter: FilterValuesType;
  removeTodolist: (todolistId: string) => void;
  updateTask: (todolistId: string, taskId: string, newTitle: string) => void;
  updateTodolistTitle: (todolistId: string, newTitle: string) => void;
};

export const Todolist = (props: PropsType) => {
  const {
    title,
    tasks,
    filter,
    removeTask,
    changeFilter,
    addTask,
    changeTaskStatus,
    todolistId,
    removeTodolist,
    updateTask,
    updateTodolistTitle,
  } = props;

  const changeFilterTasksHandler = (filter: FilterValuesType) => {
    changeFilter(filter, props.todolistId);
  };

  const removeTodolistHandler = () => {
    removeTodolist(todolistId);
  };

  const addItemHandler = (title: string) => {
    addTask(title, todolistId);
  };
  const updateTodoListTitleHandler = (newTitle: string) => {
    updateTodolistTitle(todolistId, newTitle);
  };

  const mappedTasks = tasks.map((task) => {
    const removeTaskHandler = () => {
      removeTask(task.id, todolistId);
    };

    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
      const newStatusValue = e.currentTarget.checked;
      changeTaskStatus(task.id, newStatusValue, todolistId);
    };
    const updateTaskHandler = (newTitle: string) => {
      updateTask(todolistId, task.id, newTitle);
    };
    return (
      <Task
        removeTaskHandler={removeTaskHandler}
        changeTaskStatusHandler={changeTaskStatusHandler}
        updateTaskHandler={updateTaskHandler}
        task={task}
      />
    );
  });
  return (
    <div>
      <div className={"todolist-title-container"}>
        <h3>
          <EditableSpan
            oldtitle={title}
            updateItem={updateTodoListTitleHandler}
          />
        </h3>
        <Button title={"x"} onClick={removeTodolistHandler} />
      </div>
      <AddItemForm addItem={addItemHandler} />
      {tasks.length === 0 ? <p>Тасок нет</p> : <ul>{mappedTasks}</ul>}
      <div>
        <Button
          className={filter === "all" ? "active-filter" : ""}
          title={"All"}
          onClick={() => changeFilterTasksHandler("all")}
        />
        <Button
          className={filter === "active" ? "active-filter" : ""}
          title={"Active"}
          onClick={() => changeFilterTasksHandler("active")}
        />
        <Button
          className={filter === "completed" ? "active-filter" : ""}
          title={"Completed"}
          onClick={() => changeFilterTasksHandler("completed")}
        />
      </div>
    </div>
  );
};
