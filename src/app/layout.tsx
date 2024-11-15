import type { Metadata } from "next"
import "../Shared/Styles/globals.css"
import { StoreProvider } from "@/Shared"

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
    <StoreProvider>
      <html lang="en">
        <body>
          <main>{children}</main>
        </body>
      </html>
    </StoreProvider>
  )
}
