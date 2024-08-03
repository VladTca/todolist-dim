import "./App.css";
import { Todolist } from "./Todolist";
import { useState } from "react";
import { v1 } from "uuid";
import { AddItemForm } from "./AddItemForm";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

export type TasksStateType = {
  [key: string]: TaskType[];
};

function App() {
  let todolistID1 = v1();
  let todolistID2 = v1();

  let [todolists, setTodolists] = useState<TodolistType[]>([
    { id: todolistID1, title: "What to learn", filter: "all" },
    { id: todolistID2, title: "What to buy", filter: "all" },
  ]);

  let [tasks, setTasks] = useState<TasksStateType>({
    [todolistID1]: [
      { id: v1(), title: "HTML&CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
      { id: v1(), title: "ReactJS", isDone: false },
    ],
    [todolistID2]: [
      { id: v1(), title: "Rest API", isDone: true },
      { id: v1(), title: "GraphQL", isDone: false },
    ],
  });

  const updateTodolistTitle = (todolistId: string, newTitle: string) => {
    const todolist = todolists.find((tl) => tl.id === todolistId);
    if (todolist) {
      todolist.title = newTitle;
      setTodolists([...todolists]);
    }
  };
  const updateTask = (todolistId: string, taskId: string, title: string) => {
    const newTodolistTasks = {
      ...tasks,
      [todolistId]: tasks[todolistId].map((t) =>
        t.id == taskId ? { ...t, title } : t,
      ),
    };
    setTasks(newTodolistTasks);
  };

  const removeTask = (taskId: string, todolistId: string) => {
    const newTodolistTasks = {
      ...tasks,
      [todolistId]: tasks[todolistId].filter((t) => t.id !== taskId),
    };
    setTasks(newTodolistTasks);
  };

  const addTask = (title: string, todolistId: string) => {
    const newTask = {
      id: v1(),
      title: title,
      isDone: false,
    };
    const newTodolistTasks = {
      ...tasks,
      [todolistId]: [newTask, ...tasks[todolistId]],
    };
    setTasks(newTodolistTasks);
  };

  const changeTaskStatus = (
    taskId: string,
    taskStatus: boolean,
    todolistId: string,
  ) => {
    const newTodolistTasks = {
      ...tasks,
      [todolistId]: tasks[todolistId].map((t) =>
        t.id == taskId ? { ...t, isDone: taskStatus } : t,
      ),
    };
    setTasks(newTodolistTasks);
  };

  const changeFilter = (filter: FilterValuesType, todolistId: string) => {
    const newTodolists = todolists.map((tl) => {
      return tl.id === todolistId ? { ...tl, filter } : tl;
    });
    setTodolists(newTodolists);
  };

  const removeTodolist = (todolistId: string) => {
    const newTodolists = todolists.filter((tl) => tl.id !== todolistId);
    setTodolists(newTodolists);

    delete tasks[todolistId];
    setTasks({ ...tasks });
  };

  const addTodolist = (title: string) => {
    const newTodolistId = v1();
    const newTodolist: TodolistType = {
      id: newTodolistId,
      title: title,
      filter: "all",
    };
    setTodolists([newTodolist, ...todolists]);
    setTasks({
      ...tasks,
      [newTodolistId]: [],
    });
  };

  return (
    <div className="App">
      <AddItemForm addItem={addTodolist} />
      {todolists.map((tl) => {
        const allTodolistTasks = tasks[tl.id];
        let tasksForTodolist = allTodolistTasks;

        if (tl.filter === "active") {
          tasksForTodolist = allTodolistTasks.filter((task) => !task.isDone);
        }

        if (tl.filter === "completed") {
          tasksForTodolist = allTodolistTasks.filter((task) => task.isDone);
        }

        return (
          <Todolist
            key={tl.id}
            todolistId={tl.id}
            title={tl.title}
            tasks={tasksForTodolist}
            removeTask={removeTask}
            changeFilter={changeFilter}
            addTask={addTask}
            changeTaskStatus={changeTaskStatus}
            filter={tl.filter}
            removeTodolist={removeTodolist}
            updateTask={updateTask}
            updateTodolistTitle={updateTodolistTitle}
          />
        );
      })}
    </div>
  );
}

export default App;
