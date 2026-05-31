"use client";

import { useState, type FormEvent } from "react"
import { Alert, Box, Button, Stack, TextField, Typography } from "@mui/material"
import { createBrowserClient } from "@/lib/supabase/createBrowserClient"
import { useRouter } from "next/navigation"

export function UpdatePasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [supabase] = useState(() => createBrowserClient())
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleUpdatePassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.updateUser({ password })
      if (error) throw error
      router.push("/")
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4, px: 2 }} className={className} {...props}>
      <Typography variant="h4" gutterBottom>Reset Your Password</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Enter your new password below.
      </Typography>

      <Stack component="form" spacing={2.5} onSubmit={handleUpdatePassword}>
        <TextField
          label="New Password"
          type="password"
          placeholder="New password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
        />

        {error && <Alert severity="error">{error}</Alert>}

        <Button
          variant="contained"
          type="submit"
          disabled={isLoading}
          fullWidth
        >
          {isLoading ? "Saving..." : "Save New Password"}
        </Button>
      </Stack>
    </Box>
  );
}
