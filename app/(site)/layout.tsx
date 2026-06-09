import Footer from '@/components/Footer/Footer'
import Header from '@/components/Header/Header'

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Header />
      <main className="page-content">{children}</main>
      <Footer />
    </>
  )
}
