import { createServerClient } from "@/lib/supabase/createServerClient"
import Link from "next/link"
import { LogoutButton } from "@/components/supabase/logout-button"

export async function UserNavBar() {
  const client = await createServerClient()
  const { data } = await client.auth.getUser()
  const { user } = data

  return (
    <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.75rem 1.5rem", borderBottom: "1px solid #e0e0e0" }}>
      <span style={{ fontWeight: 600, fontSize: "1.1rem" }}>CS464</span>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        {user ? (
          <>
            <span style={{ fontSize: "0.9rem", color: "#555" }}>{user.email}</span>
            <LogoutButton />
          </>
        ) : (
          <Link href="/login" style={{ textDecoration: "none", color: "#1976d2", fontWeight: 500 }}>
            Login
          </Link>
        )}
      </div>
    </nav>
  )
}
