import { useState } from "react";
import "./Color.css";
import ColorForm from "../ColorForm/ColorForm";

export default function Color({ color, onColorDelete, onColorEdit }) {
  const [isDeleting, setIsDeleting] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  function handleIsDeleting() {
    setIsDeleting(!isDeleting);
  }

  function handleIsEditing() {
    setIsEditing(!isEditing);
  }

  function handleEditSubmit(updatedColor) {
    onColorEdit(color.id, updatedColor);
    setIsEditing(!isEditing);
  }

  return (
    <div
      className="color-card"
      style={{
        background: color.hex,
        color: color.contrastText,
      }}
    >
      {isEditing ? (
        <>
          <ColorForm initialData={color} onSubmit={handleEditSubmit} />
          <button onClick={handleIsEditing}>CANCEL</button>
        </>
      ) : (
        <>
          <h3 className=".color-card-hightlight">{color.hex}</h3>
          <h4>{color.role}</h4>
          <p>contrast: {color.contrastText}</p>
          {isDeleting ? (
            <>
              <button onClick={handleIsDeleting}>DELETE</button>
              <button onClick={handleIsEditing}>EDIT</button>
            </>
          ) : (
            <>
              <label className=".color-card-hightlight">Really delete?</label>
              <button onClick={handleIsDeleting}>CANCEL</button>
              <button onClick={() => onColorDelete(color.id)}>DELETE</button>
            </>
          )}
        </>
      )}
    </div>
  );
}
