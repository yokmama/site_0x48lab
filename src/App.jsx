import { lazy, Suspense, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

const HomePage    = lazy(() => import('./pages/HomePage'))
const ServicesPage = lazy(() => import('./pages/ServicesPage'))
const AiDevPage   = lazy(() => import('./pages/service/AiDevPage'))
const MobilePage  = lazy(() => import('./pages/service/MobilePage'))
const WebPage     = lazy(() => import('./pages/service/WebPage'))
const EducationPage = lazy(() => import('./pages/service/EducationPage'))
const WorksPage   = lazy(() => import('./pages/WorksPage'))
const CompanyPage = lazy(() => import('./pages/CompanyPage'))
const SchoolPage  = lazy(() => import('./pages/SchoolPage'))
const BlogPage    = lazy(() => import('./pages/BlogPage'))
const CareersPage = lazy(() => import('./pages/CareersPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))
const LPPage      = lazy(() => import('./pages/LPPage'))

function PageShell({ children }) {
  return (
    <>
      <Header />
      <main className="page-content">{children}</main>
      <Footer />
    </>
  )
}

function Loading() {
  return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <span style={{ width: 32, height: 32, border: '2.5px solid #e2e8f0', borderTopColor: '#2490f3', borderRadius: '50%', animation: 'spin 0.7s linear infinite', display: 'inline-block' }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

export default function App() {
  return (
    <Suspense fallback={<Loading />}>
      <ScrollToTop />
      <Routes>
        {/* LP — no shared header/footer */}
        <Route path="/lp/ai-development" element={<LPPage />} />
        <Route path="/lp/ai-development/" element={<LPPage />} />

        {/* Main site */}
        <Route path="/" element={<PageShell><HomePage /></PageShell>} />
        <Route path="/services" element={<PageShell><ServicesPage /></PageShell>} />
        <Route path="/services/ai-development" element={<PageShell><AiDevPage /></PageShell>} />
        <Route path="/services/mobile" element={<PageShell><MobilePage /></PageShell>} />
        <Route path="/services/web" element={<PageShell><WebPage /></PageShell>} />
        <Route path="/services/education" element={<PageShell><EducationPage /></PageShell>} />
        <Route path="/works" element={<PageShell><WorksPage /></PageShell>} />
        <Route path="/company" element={<PageShell><CompanyPage /></PageShell>} />
        <Route path="/school" element={<PageShell><SchoolPage /></PageShell>} />
        <Route path="/blog" element={<PageShell><BlogPage /></PageShell>} />
        <Route path="/careers" element={<PageShell><CareersPage /></PageShell>} />
        <Route path="/contact" element={<PageShell><ContactPage /></PageShell>} />
        <Route path="/privacy" element={<PageShell><PrivacyPage /></PageShell>} />
        <Route path="*" element={<PageShell><NotFoundPage /></PageShell>} />
      </Routes>
    </Suspense>
  )
}
