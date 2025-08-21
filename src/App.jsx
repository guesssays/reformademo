import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'

export default function App(){
  return (
    <div className="min-h-dvh flex flex-col">   {/* высота = 100vh, колоночный flex */}
      <Header />
      <main className="flex-1 page-content">    {/* тянется, чтобы вытолкнуть футер вниз */}
        <Home />
      </main>
      <Footer />                                {/* прижмётся к низу */}
    </div>
  )
}
