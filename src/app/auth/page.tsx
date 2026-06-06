"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { getSupabaseClient } from "@/lib/supabase"
import { Box, TextField, Button, Typography, Link, Alert, Paper, Avatar, Stack, Divider } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'

export default function AuthPage() {
  const router = useRouter()
  const supabase = getSupabaseClient()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [mode, setMode] = useState<"login" | "signup">("login")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [severity, setSeverity] = useState<'error'|'success'|'info'|undefined>(undefined)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setMessage(null)
    setSeverity(undefined)
    setLoading(true)
    if (password.length < 6) {
      setMessage('Password must be at least 6 characters')
      setSeverity('error')
      setLoading(false)
      return
    }
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({ email, password })
        if (error) throw error
        setMessage("Check your email for a confirmation link.")
        setSeverity('info')
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
        setMessage("Signed in — redirecting...")
        setSeverity('success')
        router.push("/")
      }
    } catch (err: any) {
      setMessage(err?.message ?? String(err))
      setSeverity('error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box sx={{ maxWidth: 480, mx: 'auto', mt: 8, px: 2 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Stack spacing={2} sx={{ alignItems: 'center' }}>
          <Avatar sx={{ bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>

          <Typography variant="h5" component="h1">
            {mode === 'signup' ? 'Create an account' : 'Sign in'}
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', maxWidth: 360 }}>
            {mode === 'signup'
              ? 'Create an account to save puzzles and track progress.'
              : 'Sign in to continue.'}
          </Typography>

          {message && severity && (
            <Alert severity={severity} sx={{ width: '100%' }}>
              {message}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ width: '100%' }}>
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
              margin="normal"
            />

            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
              margin="normal"
            />

            <Button type="submit" variant="contained" color="primary" size="large" fullWidth sx={{ mt: 2 }} disabled={loading}>
              {loading ? 'Please wait…' : mode === 'signup' ? 'Create account' : 'Sign in'}
            </Button>
          </Box>

          <Divider sx={{ width: '100%' }} />

          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
            <Link component="button" variant="body2" onClick={() => setMode(mode === 'signup' ? 'login' : 'signup')}>
              {mode === 'signup' ? 'Have an account? Sign in' : "Don't have an account? Create one"}
            </Link>

            <Link href="#" variant="body2">Forgot password?</Link>
          </Box>
        </Stack>
      </Paper>
    </Box>
  )
}
