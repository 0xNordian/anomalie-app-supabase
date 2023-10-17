import './globals.css'
import {Providers} from "./providers";

export const metadata = {
  title: 'Anomalie App',
  description: 'A social netwrok for the creatives',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <main className="min-h-screen max-w-[70%] bg-anomalie-light-blue flex flex-col items-center justify-center mx-auto">
        <Providers>
          {children}
        </Providers>
        </main>
      </body>
    </html>
  )
}
