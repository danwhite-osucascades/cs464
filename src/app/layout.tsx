import type { Metadata } from "next"
import { AuthNav } from "@/components/supabase/auth-nav"

import { APP_TITLE } from "@/constants/app"

export const metadata: Metadata = {
  title: APP_TITLE,
  description: "Yet-to-be-named project for cs464",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthNav />
        {children}
      </body>
    </html>
  );
}
