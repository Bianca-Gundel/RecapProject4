import { useState } from "react";

export default function CopyToClipboard({ text }) {
  const [isCopying, setIsCopying] = useState(false);

  async function writeClipboardText() {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopying(true);
      setTimeout(() => setIsCopying(false), 3000);
    } catch (error) {
      console.error("Failed to copy!");
    }
  }

  return (
    <button onClick={writeClipboardText}>
      {isCopying ? "SUCCESFULLY COPIED" : "COPY"}
    </button>
  );
}
