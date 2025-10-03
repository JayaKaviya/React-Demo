import React, { useState, useMemo, useCallback } from "react";

export default function MemoVsCall() {
  const [num, setNum] = useState(0);
  const [dark, setDark] = useState(false);

  const style = {
    backgroundColor: dark ? "black" : "white",
    color: dark ? "white" : "black",
    minHeight: "100vh",
    padding: "20px"
  };

  // useMemo for heavy calculation
  const calculate = useMemo(() => Calculation(num), [num]);

  // useCallback for function that depends on `num`
  const handleAlert = useCallback(() => {
    alert("Current number is: " + num);
  }, [num]);

  return (
    <div style={style}>
        <h1>Memo Vs Callback</h1>
      <h2>With <code>useMemo</code></h2>
      <ul>
        <li>Toggle click only updates the theme, and <code>Calculation(num)</code> is not recomputed if <code>num</code> didn’t change.</li>
        <li>UI remains smooth even with heavy calculations.</li>
      </ul>

      <h2>With <code>useCallback</code></h2>
      <ul>
        <li>Normally, functions are recreated on every render. Functions like <code>handleAlert</code> are only recreated when dependencies change.</li>
        <li>This prevents unnecessary re-renders if you pass functions to child components.</li>
      </ul>

      <input
        type="number"
        value={num}
        onChange={(e) => setNum(Number(e.target.value))}
      />
      <h2>Calculated: {calculate}</h2>

      <button onClick={() => setDark(!dark)}>Toggle Theme</button>
      <button onClick={handleAlert}>Show Alert</button>
    </div>
  );
}

// Heavy calculation function
function Calculation(num) {
  console.log("Calculating...");
  for (let i = 0; i < 1000000000; i++) {} // simulate heavy work
  return num;
}
