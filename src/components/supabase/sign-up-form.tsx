"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Alert, Box, Button, Stack, TextField, Typography } from "@mui/material";
import { createBrowserClient } from "@/lib/supabase/createBrowserClient";

export function SignUpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [supabase] = useState(() => createBrowserClient());
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (password !== repeatPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/api/auth/confirm?next=/auth/sign-up-success`,
        },
      });
      if (error) throw error;
      router.push("/auth/sign-up-success");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4, px: 2 }} className={className} {...props}>
      <Typography variant="h4" gutterBottom>Sign Up</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Create a new account to get started.
      </Typography>

      <Stack component="form" spacing={2.5} onSubmit={handleSignUp}>
        <TextField
          label="Email"
          type="email"
          placeholder="cs464@example.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
        />
        <TextField
          label="Password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
        />
        <TextField
          label="Repeat Password"
          type="password"
          required
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
          fullWidth
        />

        {error && <Alert severity="error">{error}</Alert>}

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            type="submit"
            disabled={isLoading}
            fullWidth
          >
            {isLoading ? "Creating account..." : "Sign Up"}
          </Button>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
          Already have an account?{' '}
          <Link href="/login">Login</Link>
        </Typography>
      </Stack>
    </Box>
  );
}