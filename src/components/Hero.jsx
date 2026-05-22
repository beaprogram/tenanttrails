import './Hero.css'

function Hero() {
  return (
    <section className="hero">
      <span className="hero__badge">Launching in Halifax, Nova Scotia</span>
      <h1 className="hero__title">
        Know what you're<br />
        signing before<br />
        you sign it.
      </h1>
      <p className="hero__subtitle">
        Read honest reviews from past tenants. See AI-generated
        summaries. Make informed decisions about where you live.
      </p>
      <div className="hero__buttons">
        <button className="btn btn--primary">Create Free Account</button>
        <button className="btn btn--secondary">Sign In</button>
      </div>
    </section>
  )
}

export default Hero
