import { EditableSpan } from "./EditableSpan";
import { Button } from "./Button";
import { TaskType } from "./App";

type Props = {
  removeTaskHandler: () => void;
  changeTaskStatusHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  updateTaskHandler: (newTitle: string) => void;
  task: TaskType;
};
export const Task = ({
  removeTaskHandler,
  changeTaskStatusHandler,
  updateTaskHandler,
  task,
}: Props) => {
  return (
    <li key={task.id} className={task.isDone ? "is-done" : ""}>
      <input
        type="checkbox"
        checked={task.isDone}
        onChange={changeTaskStatusHandler}
      />
      <EditableSpan oldtitle={task.title} updateItem={updateTaskHandler} />
      <Button onClick={removeTaskHandler} title={"x"} />
    </li>
  );
};
