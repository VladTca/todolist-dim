import { useState } from "react";

type Props = {
  oldtitle: string;
  updateItem: (newTitle: string) => void;
};
export const EditableSpan = (props: Props) => {
  const [editMode, setEditMode] = useState(false);
  const [newTitle, setNewTitle] = useState(props.oldtitle);
  const activateEditModeHandler = () => {
    setEditMode(!editMode);
    if (editMode) {
      updateTitleHandler();
    }
  };

  const changeTitleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.currentTarget.value);
  };

  const updateTitleHandler = () => {
    props.updateItem(newTitle);
  };
  return editMode ? (
    <input
      type="text"
      value={newTitle}
      autoFocus
      onBlur={activateEditModeHandler}
      onChange={changeTitleHandler}
    />
  ) : (
    <span onDoubleClick={activateEditModeHandler}>{props.oldtitle}</span>
  );
};
