import { Button } from "./Button";
import { ChangeEvent, KeyboardEvent, useState } from "react";

type Props = {
  addItem: (title: string) => void;
};
export const AddItemForm = (props: Props) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [error, setError] = useState<string | null>(null);

  const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(event.currentTarget.value);
  };

  const addItemHandler = () => {
    if (taskTitle.trim() !== "") {
      props.addItem(taskTitle.trim());
      setTaskTitle("");
    } else {
      setError("Title is required");
    }
  };

  const addTaskOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (event.key === "Enter") {
      addItemHandler();
    }
  };

  return (
    <div>
      <input
        className={error ? "error" : ""}
        value={taskTitle}
        onChange={changeTaskTitleHandler}
        onKeyUp={addTaskOnKeyUpHandler}
      />
      <Button title={"+"} onClick={addItemHandler} />
      {error && <div className={"error-message"}>{error}</div>}
    </div>
  );
};
