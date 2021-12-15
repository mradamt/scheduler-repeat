import React, { useState } from "react";

export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial])

  const transition = (newMode, replace = false) => {
    setHistory(prev => {
      return replace ? [...prev.slice(0, -1), newMode] : [...prev, newMode]
    })
  }

  const back = () => {
    setHistory(prev => prev.length === 1 ? [...prev] : [...prev.slice(0, -1)])
  }

  return {
    mode: history[history.length - 1],
    transition,
    back
  }
}
