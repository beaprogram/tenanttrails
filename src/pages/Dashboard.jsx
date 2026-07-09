import { useState, useMemo, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { API, FALLBACK_IMAGE } from '../api'
import ApartmentCard from '../components/ApartmentCard'
import './Dashboard.css'

function Dashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const [apartments, setApartments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [search, setSearch] = useState('')
  const [neighbourhood, setNeighbourhood] = useState('All Neighbourhoods')
  const [sort, setSort] = useState('Highest Rated')

  // Fetch the real apartment list once, when the component mounts.
  // The DB has no tags/image, so we fill safe defaults the cards expect.
  useEffect(() => {
    fetch(`${API}/api/apartments`, { credentials: 'include' })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) =>
        setApartments(
          data.map((a) => ({
            ...a,
            rating: a.rating ?? 0,
            reviews: a.reviews ?? 0,
            tags: a.tags ?? [],
            image: a.image ?? FALLBACK_IMAGE,
          }))
        )
      )
      .catch(() => setError('Could not load apartments.'))
      .finally(() => setLoading(false))
  }, [])

  // Unique neighbourhoods for the filter dropdown.
  const neighbourhoods = useMemo(() => {
    const set = new Set(apartments.map((a) => a.neighbourhood))
    return ['All Neighbourhoods', ...Array.from(set)]
  }, [apartments])

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
  }, [search, neighbourhood, sort, apartments])

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
          <Link to="/profile" className="dash-nav__profile">
            <span className="dash-nav__avatar">{initials}</span>
            <span className="dash-nav__name">{user?.name}</span>
          </Link>
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

        {loading ? (
          <p className="dash-empty">Loading apartments...</p>
        ) : error ? (
          <p className="dash-empty">{error}</p>
        ) : visible.length === 0 ? (
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
