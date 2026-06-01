import { createServerClient } from "@/lib/supabase/createServerClient"
import type { Metadata } from "next"
import { AuthControl } from "@/components/supabase/auth-control"

import { APP_TITLE } from "@/constants/app"

export const metadata: Metadata = {
  title: APP_TITLE,
  description: "Yet-to-be-named project for cs464",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const client = await createServerClient()
  const { data } = await client.auth.getUser()
  const { user } = data
  return (
    <html lang="en">
      <body>
        <AuthControl initialUser={Boolean(user)} />
        {children}
      </body>
    </html>
  );
}
