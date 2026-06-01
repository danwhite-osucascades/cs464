"use client"

import { useEffect, useState } from "react"
import { createBrowserClient } from "@/lib/supabase/createBrowserClient"
import { LoginButton } from "@/components/supabase/login-button"
import { LogoutButton } from "@/components/supabase/logout-button"

export function AuthControl({ initialUser }: { initialUser: boolean }) {
  const [user, setUser] = useState(initialUser)
  const [supabase] = useState(() => createBrowserClient())

  useEffect(() => {
    let mounted = true

    supabase.auth.getUser().then(({ data }) => {
      if (!mounted) return
      setUser(Boolean(data.user))
    })

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(Boolean(session?.user))
    })

    return () => {
      mounted = false
      data?.subscription?.unsubscribe()
    }
  }, [supabase])

  return user ? <LogoutButton /> : <LoginButton />
}
