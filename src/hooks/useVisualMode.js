import React, { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial])

  const transition = (newMode, replace = false) => {
    setMode(newMode)

    const histCopy = [...history]
    // if replace is true, remove last item of history before updating
    replace && histCopy.pop()
    histCopy.push(newMode)
    setHistory(histCopy)
  }

  const back = () => {
    // Ignore back instruction if history is only one item
    if (history.length === 1) return;

    const histCopy = [...history]
    histCopy.pop()
    setHistory(histCopy)

    const prev = histCopy[histCopy.length - 1];
    setMode(prev)
  }

  return {
    mode,
    transition,
    back
  }
}
