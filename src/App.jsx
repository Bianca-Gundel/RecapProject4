import { initialColors } from "./lib/colors";
import Color from "./Components/Color/Color";
import "./App.css";
import ColorForm from "./Components/ColorForm/ColorForm.jsx";
import { uid } from "uid";
import useLocalStorageState from "use-local-storage-state";
import { useState, useEffect } from "react";

function App() {
  const [colors, setColors] = useLocalStorageState("colors", {
    defaultValue: initialColors,
  });

  const [contrastScores, setContrastScores] = useState({});

  useEffect(() => {
    async function validateAllColors() {
      for (const color of colors) {
        const response = await fetch(
          "https://www.aremycolorsaccessible.com/api/are-they",
          {
            mode: "cors",
            method: "POST",
            body: JSON.stringify({ colors: [color.hex, color.contrastText] }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const json = await response.json();
        const score = json.overall;
        setContrastScores((prevScores) => ({
          ...prevScores,
          [color.id]: score,
        }));
      }
    }

    validateAllColors();
  }, [colors]);

  function handleSubmit(newColor) {
    const colorWithID = { id: uid(), ...newColor };
    setColors([colorWithID, ...colors]);
  }

  function handleColorDelete(colorID) {
    setColors(colors.filter((color) => color.id !== colorID));
  }

  function handleColorEdit(colorID, updatedColor) {
    const colorWithID = { id: uid(), ...updatedColor };
    setColors(
      colors.map((color) =>
        color.id === colorID ? { id: colorID, ...colorWithID } : color
      )
    );
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
            response={contrastScores[color.id] || "Loading..."}
            onColorDelete={handleColorDelete}
            onColorEdit={handleColorEdit}
          />
        );
      })}
    </>
  );
}

export default App;
