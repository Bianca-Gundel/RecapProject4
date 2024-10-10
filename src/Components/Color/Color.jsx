import { useState } from "react";
import "./Color.css";

export default function Color({ color, onColorDelete }) {
  const [showDelete, setShowDelete] = useState(true);

  function handleClick() {
    setShowDelete(false);
    console.log("Test");
  }

  return (
    <div
      className="color-card"
      style={{
        background: color.hex,
        color: color.contrastText,
      }}
    >
      <h3 className=".color-card-hightlight">{color.hex}</h3>
      <h4>{color.role}</h4>
      <p>contrast: {color.contrastText}</p>
      {showDelete ? (
        <button onClick={handleClick}>DELETE</button>
      ) : (
        <>
          <label className=".color-card-hightlight">Really delete?</label>
          <button>CANCEL</button>
          <button onClick={() => onColorDelete(color.id)}>DELETE</button>
        </>
      )}
    </div>
  );
}
