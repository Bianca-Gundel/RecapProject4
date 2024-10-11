import { initialColors } from "./lib/colors";
import Color from "./Components/Color/Color";
import "./App.css";
import ColorForm from "./Components/ColorForm/ColorForm.jsx";
import { uid } from "uid";
import useLocalStorageState from "use-local-storage-state";
import { useState, useEffect } from "react";
import ThemeForm from "./Components/Theme/ThemeForm.jsx";
import { initialThemes } from "./lib/themes.js";

function App() {
  const [themes, setThemes] = useLocalStorageState("themes", {
    defaultValue: initialThemes,
  });
  const [colors, setColors] = useLocalStorageState("colors", {
    defaultValue: initialColors,
  });

  const [contrastScores, setContrastScores] = useState({});
  const [selectedThemeId, setSelectedThemeId] = useState("t1");
  // const [thereIsColor, setThereIsColor] = useState(null)

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

  function getThemeColors() {

    const selectedTheme = themes.find((theme) => theme.id === selectedThemeId);
    if (!selectedTheme) {
      return [];
    }

    return colors.filter((color) => selectedTheme.colors.includes(color.id));

  }

  function handleSubmitColor(newColor) {
    const colorWithID = { id: uid(), ...newColor };
    setColors([colorWithID, ...colors]);
    setThemes(
      themes.map((theme) =>
        theme.id === selectedThemeId
          ? { ...theme, colors: [...theme.colors, colorWithID.id] }
          : theme
      )
    );
  }

  function handleColorDelete(colorID) {
    setColors(colors.filter((color) => color.id !== colorID));
    setThemes(
      themes.map((theme) =>
        theme.id === selectedThemeId
          ? { ...theme, colors: theme.colors.filter((id) => id !== colorID) }
          : theme
      )
    );
  }

  function handleColorEdit(colorID, updatedColor) {
    const colorWithID = { id: colorID, ...updatedColor };
    setColors(
      colors.map((color) =>
        color.id === colorID ? { id: colorID, ...colorWithID } : color
      )
    );
  }

  function handleSelectTheme(event) {
    setSelectedThemeId(event.target.value);
  }

  function handleEditingTheme(newThemeName) {
    console.log(newThemeName);
    console.log("selectedThemeID = " + selectedThemeId.id);
    setThemes(
      themes.map((theme) =>
        theme.id === selectedThemeId.id
          ? { ...theme, name: newThemeName }
          : theme
      )
    );
  }

  function handleAddingTheme(newTheme) {
    const themeWithID = { id: uid(), name: newTheme, colors: [] };
    setThemes([themeWithID, ...themes]);
    setSelectedThemeId(themeWithID);
  }

  function handleDeletingTheme() {
    setThemes(themes.filter((theme) => theme.id !== selectedThemeId));
    console.log(selectedThemeId);
    setSelectedThemeId("t1");
  }

  return (
    <>
      <h1>Theme Creator</h1>
      <ThemeForm
        theme={themes}
        selectedTheme={selectedThemeId}
        onChangeTheme={handleSelectTheme}
        onDeletingTheme={handleDeletingTheme}
        onAddingTheme={handleAddingTheme}
        onEditingTheme={handleEditingTheme}
      />
      <ColorForm onSubmit={handleSubmitColor} />

      {colors.length > 0 ? getThemeColors().map((color) => {
        return (
          <Color
            key={color.id}
            color={color}
            response={contrastScores[color.id] || "Loading..."}
            onColorDelete={handleColorDelete}
            onColorEdit={handleColorEdit}
          />
        );
      })
        :
        <h2 className="text-center">No color found, please add a color</h2>
      }
    </>
  );
}

export default App;
