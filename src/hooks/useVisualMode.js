import React, { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);

  const transition = x => setMode(x)
  
  return {
    mode,
    transition
  }
}
