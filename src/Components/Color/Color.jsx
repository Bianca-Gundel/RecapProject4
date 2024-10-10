import { useState } from "react";
import "./Color.css";
import ColorForm from "../ColorForm/ColorForm";
import CopyToClipboard from "../CopyToClipboard/CopyToClipboard.jsx";

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
    handleIsEditing();
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
          <CopyToClipboard text={color.hex} />
          <h4>{color.role}</h4>
          <p>contrast: {color.contrastText}</p>
          <CopyToClipboard text={color.contrastText} />
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
