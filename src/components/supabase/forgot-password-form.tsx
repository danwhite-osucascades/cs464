"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { Alert, Box, Button, Stack, TextField, Typography } from "@mui/material"
import { createBrowserClient } from "@/lib/supabase/createBrowserClient";

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [supabase] = useState(() => createBrowserClient());
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // The url which will be included in the email. This URL needs to be configured in your redirect URLs in the Supabase dashboard at https://supabase.com/dashboard/project/_/auth/url-configuration
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/api/auth/confirm?next=/auth/update-password`,
      });
      if (error) throw error;
      setSuccess(true);
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4, px: 2 }}>
        <Typography variant="h4" gutterBottom>Check Your Email</Typography>
        <Typography variant="body1" color="text.secondary">
          If you registered using your email and password, you will receive a password reset email shortly.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4, px: 2 }} className={className} {...props}>
      <Typography variant="h4" gutterBottom>Reset Your Password</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Enter your email and we'll send you a link to reset your password.
      </Typography>

      <Stack component="form" spacing={2.5} onSubmit={handleForgotPassword}>
        <TextField
          label="Email"
          type="email"
          placeholder="cs464@example.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
        />

        {error && <Alert severity="error">{error}</Alert>}

        <Button
          variant="contained"
          type="submit"
          disabled={isLoading}
          fullWidth
        >
          {isLoading ? "Sending..." : "Send Reset Email"}
        </Button>

        <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
          Already have an account?{' '}
          <Link href="/login">Login</Link>
        </Typography>
      </Stack>

    </Box>
  );
}
