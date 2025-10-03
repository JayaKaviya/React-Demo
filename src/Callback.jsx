import React, { useState, useCallback } from "react";

// Child without useCallback
const ChildNormal = ({ onClick }) => {
  console.log("ChildNormal rendered");
  return <button onClick={onClick}>Normal Child</button>;
};

// Child with memo + useCallback
const ChildMemo = React.memo(({ onClick }) => {
  console.log("ChildMemo rendered");
  return <button onClick={onClick}>Memoized Child</button>;
});

export default function Callback() {
  const [count, setCount] = useState(0);
  const [theme, setTheme] = useState(false);

  // Function recreated every render
  const handleNormal = () => {
    alert("Count is: " + count);
  };

  // Function memoized with useCallback
  const handleCallback = useCallback(() => {
    alert("Count is: " + count);
  }, [count]);

  return (
    <div style={{ backgroundColor: theme ? "black" : "white", color: theme ? "white" : "black", minHeight: "100vh", padding: 20 }}>
      <h2>Check the console logs</h2>

      <button onClick={() => setCount(count + 1)}>Increment Count</button>
      <button onClick={() => setTheme(!theme)}>Toggle Theme</button>

      {/* Child that always re-renders */}
      <ChildNormal onClick={handleNormal} />

      {/* Memoized child, re-renders only if function reference changes */}
      <ChildMemo onClick={handleCallback} />
    </div>
  );
}
 


// 3️⃣ Step by step actions
// Step 1: Toggle Theme

// theme state changes → parent re-renders.
// handleNormal is recreated → ChildNormal receives a new prop → re-renders.
// handleCallback reference did not change → ChildMemo does not re-render.

// Step 2: Increment Count

// count changes → parent re-renders.
// handleNormal recreated → ChildNormal re-renders.
// handleCallback recreated (because [count] dependency changed) → ChildMemo re-renders.

// 4️⃣ Console logs

// Every time a child re-renders, its console log prints.
// This shows which child actually renders on each parent render, proving how useCallback + React.memo prevents unnecessary re-renders.