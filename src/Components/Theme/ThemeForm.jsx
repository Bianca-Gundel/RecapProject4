import { useState } from "react";
import ThemeInput from "./ThemeInput.jsx";

export default function ThemeForm({
  theme,
  selectedTheme,
  onChangeTheme,
  onAddingTheme,
  onEditingTheme,
  onDeletingTheme,
}) {
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    if (isEditing) {
      onEditingTheme(data.themeName);
      console.log(data.themeName);
      handleIsEditing();
    } else if (isAdding) {
      onAddingTheme(data.themeName);
      handleIsAdding();
    }
  }
  const [isAdding, setIsAdding] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  function handleIsDeleting() {
    setIsDeleting(!isDeleting);
  }

  function handleIsEditing() {
    setIsEditing(!isEditing);
  }

  function handleIsAdding() {
    setIsAdding(!isAdding);
  }

  return (
    <div className="choiceTheme">
      <form onSubmit={handleSubmit}>
        {isAdding || isEditing ? (
          <>
            <ThemeInput
              id="themeName"
              defaultValue={isAdding ? "Enter name" : selectedTheme.name}
            />
            <button type="submit">Save</button>
            <button onClick={isAdding ? handleIsAdding : handleIsEditing}>
              Cancel
            </button>
          </>
        ) : (
          <>
            <select
              id="choiceTheme"
              value={selectedTheme}
              onChange={onChangeTheme}
            >
              {theme.map((themeItem) => (
                <option key={themeItem.id} value={themeItem.id}>
                  {themeItem.name}
                </option>
              ))}
            </select>

            {isDeleting ? (
              <>
                <button
                  onClick={() => {
                    onDeletingTheme();
                    handleIsDeleting();
                  }}
                >
                  YES DELETE
                </button>
                <button onClick={handleIsDeleting}>CANCEL</button>
              </>
            ) : (
              <>
                <button onClick={handleIsAdding}>
                  {isAdding ? "CANCEL" : "ADD"}
                </button>
                <button
                  disabled={selectedTheme === "t1"}
                  onClick={handleIsEditing}
                >
                  EDIT
                </button>
                <button
                  disabled={selectedTheme === "t1"}
                  onClick={handleIsDeleting}
                >
                  DELETE
                </button>
              </>
            )}
          </>
        )}
      </form>
    </div>
  );
}
