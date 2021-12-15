import React, { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial])

  const transition = newMode => {
    setMode(newMode)
    const updated = [...history]
    updated.push(newMode)
    setHistory(updated)
  }

  const back = () => {
    const updated = [...history]
    updated.pop()
    setHistory(updated)
    const prev = updated[updated.length - 1]
    setMode(prev)
  }

  return {
    mode,
    transition,
    back
  }
}
