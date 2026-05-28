import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { apartments } from '../data/mockData'
import ApartmentCard from '../components/ApartmentCard'
import './Dashboard.css'

function Dashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const [search, setSearch] = useState('')
  const [neighbourhood, setNeighbourhood] = useState('All Neighbourhoods')
  const [sort, setSort] = useState('Highest Rated')

  // Unique neighbourhoods for the filter dropdown.
  const neighbourhoods = useMemo(() => {
    const set = new Set(apartments.map((a) => a.neighbourhood))
    return ['All Neighbourhoods', ...Array.from(set)]
  }, [])

  // Apply search, filter, and sort. useMemo recomputes only when inputs change.
  const visible = useMemo(() => {
    let list = [...apartments]

    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(
        (a) =>
          a.name.toLowerCase().includes(q) ||
          a.address.toLowerCase().includes(q) ||
          a.neighbourhood.toLowerCase().includes(q)
      )
    }

    if (neighbourhood !== 'All Neighbourhoods') {
      list = list.filter((a) => a.neighbourhood === neighbourhood)
    }

    if (sort === 'Highest Rated') {
      list.sort((a, b) => b.rating - a.rating)
    } else if (sort === 'Lowest Rated') {
      list.sort((a, b) => a.rating - b.rating)
    } else if (sort === 'Most Reviews') {
      list.sort((a, b) => b.reviews - a.reviews)
    }

    return list
  }, [search, neighbourhood, sort])

  // Stats computed from the full dataset (not the filtered view).
  const totalReviews = apartments.reduce((sum, a) => sum + a.reviews, 0)
  const totalNeighbourhoods = new Set(
    apartments.map((a) => a.neighbourhood)
  ).size

  function handleLogout() {
    logout()
    navigate('/login')
  }

  const initials = user?.name ? user.name.slice(0, 2).toUpperCase() : 'U'

  return (
    <div className="dash">
      <header className="dash-nav">
        <div className="dash-nav__logo">TenantTrails</div>

        <div className="dash-nav__search">
          <span className="dash-nav__search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search apartments by address or neighbourhood..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="dash-nav__user">
          <span className="dash-nav__avatar">{initials}</span>
          <span className="dash-nav__name">{user?.name}</span>
          <button className="dash-nav__signout" onClick={handleLogout}>
            Sign out
          </button>
        </div>
      </header>

      <main className="dash-main">
        <h1 className="dash-title">Apartments in Halifax</h1>
        <p className="dash-subtitle">
          Honest reviews from real tenants. Read before you rent.
        </p>

        <div className="dash-stats">
          <span className="dash-stat">
            <strong>{apartments.length}</strong> apartments
          </span>
          <span className="dash-stat">
            <strong>{totalReviews}</strong> reviews
          </span>
          <span className="dash-stat">
            <strong>{totalNeighbourhoods}</strong> neighbourhoods
          </span>
        </div>

        <div className="dash-controls">
          <select
            value={neighbourhood}
            onChange={(e) => setNeighbourhood(e.target.value)}
          >
            {neighbourhoods.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>

          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option>Highest Rated</option>
            <option>Lowest Rated</option>
            <option>Most Reviews</option>
          </select>
        </div>

        {visible.length === 0 ? (
          <p className="dash-empty">No apartments match your search.</p>
        ) : (
          <div className="dash-grid">
            {visible.map((apt) => (
              <ApartmentCard key={apt.id} apartment={apt} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

export default Dashboard
