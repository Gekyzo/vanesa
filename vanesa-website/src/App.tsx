import { HashRouter, Routes, Route } from "react-router-dom"
import { ThemeProvider } from "./components/shared/ThemeProvider"
import { Header } from "./components/layout/Header"
import { Footer } from "./components/layout/Footer"
import Home from "./pages/Home"
import HorsesPage from "./pages/HorsesPage"
import SpanishBreedsPage from "./pages/SpanishBreedsPage"
import WorldBreedsPage from "./pages/WorldBreedsPage"
import GeneticSimulatorPage from "./pages/GeneticSimulatorPage"
import CinemaTVPage from "./pages/CinemaTVPage"
import PlaceholderPage from "./pages/PlaceholderPage"

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vanesa-theme">
      <HashRouter>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1 container py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/caballos" element={<HorsesPage />} />
              <Route path="/caballos/razas-espanolas" element={<SpanishBreedsPage />} />
              <Route path="/caballos/razas-mundiales" element={<WorldBreedsPage />} />
              <Route path="/caballos/simulador" element={<GeneticSimulatorPage />} />
              <Route path="/caballos/cine-tv" element={<CinemaTVPage />} />
              <Route
                path="/baile"
                element={
                  <PlaceholderPage
                    title="Baile"
                    description="Estilos de baile y recursos de aprendizaje"
                    icon="💃"
                  />
                }
              />
              <Route
                path="/musica"
                element={
                  <PlaceholderPage
                    title="Música"
                    description="Géneros favoritos y playlists"
                    icon="🎵"
                  />
                }
              />
              <Route
                path="/otros"
                element={
                  <PlaceholderPage
                    title="Otros"
                    description="Otras aficiones e intereses"
                    icon="✨"
                  />
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </HashRouter>
    </ThemeProvider>
  )
}

export default App
