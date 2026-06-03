"use client"

import { useEffect, useState } from "react"
import { createBrowserClient } from "@/lib/supabase/createBrowserClient"
import { LogoutButton } from "@/components/supabase/logout-button"

export function AuthNav() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const supabase = createBrowserClient()

    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsLoggedIn(!!session)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session)
    })

    return () => subscription.unsubscribe()
  }, [])

  return isLoggedIn ? <LogoutButton /> : null
}
