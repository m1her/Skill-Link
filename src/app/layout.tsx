import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AlertProvider } from "@/context/AlertContext";
import { UserProvider } from "@/context/UserContext";
import { PostsProvider } from "@/context/PostsContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Skill Link",
  description: "Created By Maher @m1her",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserProvider>
          <PostsProvider>
            <AlertProvider>{children}</AlertProvider>
          </PostsProvider>
        </UserProvider>
      </body>
    </html>
  );
}
