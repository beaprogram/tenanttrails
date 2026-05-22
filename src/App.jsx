import Header from './components/Header'
import Hero from './components/Hero'
import Features from './components/Features'
import './App.css'

function App() {
  return (
    <div className="app">
      <Header />
      <main className="landing">
        <Hero />
        <Features />
      </main>
    </div>
  )
}

export default App
