import { initialColors } from "./lib/colors";
import Color from "./Components/Color/Color";
import "./App.css";
import ColorForm from "./Components/ColorForm/ColorForm.jsx";
import { uid } from "uid";
import { useState } from "react";

function App() {
  const [colors, setColors] = useState(initialColors);

  function handleSubmit(newColor) {
    setColors([{ id: uid(), ...newColor }, ...colors]);
  }

  function handleColorDelete(colorID) {
    console.log("Testing");
    setColors(colors.filter((color) => color.id !== colorID));
  }

  return (
    <>
      <h1>Theme Creator</h1>
      <ColorForm onSubmit={handleSubmit} />

      {colors.map((color) => {
        return (
          <Color
            key={color.id}
            color={color}
            onColorDelete={handleColorDelete}
          />
        );
      })}
    </>
  );
}

export default App;
