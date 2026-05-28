import Header from '../components/Header'
import Hero from '../components/Hero'
import Features from '../components/Features'
import './Landing.css'

function Landing() {
  return (
    <div className="landing-page">
      <Header />
      <main className="landing">
        <Hero />
        <Features />
      </main>
    </div>
  )
}

export default Landing
