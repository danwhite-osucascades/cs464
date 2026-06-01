"use client"

import { useRouter } from "next/navigation"
import { Button } from "@mui/material"

export function LoginButton() {
  const router = useRouter()

  const goToLogin = () => {
    router.push("/login")
  }

  return (
    <Button variant="contained" onClick={goToLogin}>
      Login
    </Button>
  )
}
