import './Header.css'

function Header() {
  return (
    <header className="header">
      <div className="header__logo">TenantTrails</div>
      <nav className="header__nav">
        <a href="#signin" className="header__link">Sign In</a>
        <button className="header__cta">Get Started</button>
      </nav>
    </header>
  )
}

export default Header
