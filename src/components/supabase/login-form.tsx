"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Alert, Box, Button, Stack, TextField, Typography } from "@mui/material";
import { createBrowserClient } from "@/lib/supabase/createBrowserClient";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [supabase] = useState(() => createBrowserClient());
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      router.push("/");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4, px: 2 }} className={className} {...props}>
      
      <Typography variant="h4" gutterBottom>Login</Typography>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Enter your email and password to sign in.
      </Typography>

      <Stack component="form" spacing={2.5} onSubmit={handleLogin}>

    {/* Can add in if we want header for email */}
      {/* <Typography variant="body2">
        Email
      </Typography> */}

        <TextField
          label="Email"
          type="email"
          placeholder="cs464@example.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
        />
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>

        {/* Can add in if we want header for password */}
        {/* If added in, change mb: 1 to mb: 2 in box above */}
          {/* <Typography variant="body2">
            Password
          </Typography> */}

          </Box>
            <TextField
              label="Password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
            />
        </Box>


        {error && <Alert severity="error">{error}</Alert>}

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="contained" component={Link} href="/auth/sign-up" fullWidth>
            Sign Up
          </Button>

          <Button variant="contained" type="submit" disabled={isLoading} fullWidth>
            {isLoading ? "Logging in..." : "Login"}
          </Button>

        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>

          <Typography variant="body2" color="text.secondary">

            Don&apos;t have an account?{' '}
            <Link href="/auth/sign-up">
              Sign up
            </Link>
          </Typography>

          <Typography variant="body2" color="text.secondary">

            Forgot your password?{' '}
            <Link href="/auth/forgot-password">
              Reset password
            </Link>
          </Typography>

        </Box>
        
      </Stack>
    </Box>
  );
};