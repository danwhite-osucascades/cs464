import type { Metadata } from "next"
import { UserNavBar } from "@/components/userNavBar"

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
  return (
    <html lang="en">
      <body>
        <UserNavBar />
        {children}
      </body>
    </html>
  );
}
