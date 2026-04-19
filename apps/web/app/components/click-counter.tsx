"use client"

import { useState } from "react"
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export default function ClickCounter() {
  const [count, setCount] = useState(0);

  return (
    <Stack spacing={2}>
      <Typography>Clicks: {count}</Typography>
      <Button variant="contained" onClick={() => setCount(count + 1)}>
        Click Me
      </Button>
    </Stack>
  )
}
