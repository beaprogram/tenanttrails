import { Link } from 'react-router-dom'
import './Header.css'

function Header() {
  return (
    <header className="header">
      <div className="header__logo">TenantTrails</div>
      <nav className="header__nav">
        <Link to="/login" className="header__link">Sign In</Link>
        <Link to="/signup" className="header__cta">Get Started</Link>
      </nav>
    </header>
  )
}

export default Header
