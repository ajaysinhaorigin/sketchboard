import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Sketchbook | Online drawing tool",
  description: "Online drawing tool",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
