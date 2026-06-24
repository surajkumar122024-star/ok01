"use client";

import { useState } from "react";

export default function CaseConverterClient() {
  const [text, setText] = useState("");

  const toUpperCase = () => {
    setText(text.toUpperCase());
  };

  const toLowerCase = () => {
    setText(text.toLowerCase());
  };

  const toTitleCase = () => {
    const title = text
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    setText(title);
  };

  const clearText = () => {
    setText("");
  };

  const copyText = () => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  return (
    <div style={{ maxWidth: "700px", margin: "auto", padding: "20px" }}>
      <h1>Case Converter Tool</h1>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter your text here..."
        rows={10}
        style={{ width: "100%", padding: "10px", fontSize: "16px" }}
      />

      <div style={{ marginTop: "10px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
        <button onClick={toUpperCase}>UPPERCASE</button>
        <button onClick={toLowerCase}>lowercase</button>
        <button onClick={toTitleCase}>Title Case</button>
        <button onClick={copyText}>Copy</button>
        <button onClick={clearText}>Clear</button>
      </div>
    </div>
  );
}
