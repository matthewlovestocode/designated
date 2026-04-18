"use client"

import { useState } from "react"

export default function ClickCounter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <div>Clicks: {count}</div>
      <button onClick={() => setCount(count + 1)}>Click Me</button>
    </div>
  )
}