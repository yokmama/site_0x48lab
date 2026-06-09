import { Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import MainPage from './pages/MainPage'
import LPPage from './pages/LPPage'

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Header />
            <main>
              <MainPage />
            </main>
          </>
        }
      />
      <Route path="/lp/ai-development" element={<LPPage />} />
      <Route path="/lp/ai-development/" element={<LPPage />} />
    </Routes>
  )
}
