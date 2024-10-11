import { useState } from "react";

export default function ThemeInput({ defaultValue }) {
  const [inputValue, setInputValue] = useState(defaultValue);

  function handleInputValue(event) {
    setInputValue(event.target.value);
  }

  return (
    <>
      <input
        type="text"
        name="themeName"
        value={inputValue}
        onChange={handleInputValue}
      />
    </>
  );
}
