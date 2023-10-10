import './globals.css'

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
        <main className="min-h-screen max-w-[70%] bg-background flex flex-col items-center justify-center mx-auto">
          {children}
        </main>
      </body>
    </html>
  )
}
