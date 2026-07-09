import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { API } from '../api'
import StarRating from '../components/StarRating'
import ReviewDialog from '../components/ReviewDialog'
import './Profile.css'

function Profile() {
  const { user } = useAuth()

  const [myReviews, setMyReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null) // the review being edited, or null

  // Fetch the logged-in user and their own reviews (one call).
  useEffect(() => {
    fetch(`${API}/api/profile`, { credentials: 'include' })
      .then((r) => (r.ok ? r.json() : { reviews: [] }))
      .then((data) => setMyReviews(data.reviews ?? []))
      .catch(() => setMyReviews([]))
      .finally(() => setLoading(false))
  }, [])

  async function handleDelete(reviewId) {
    const res = await fetch(`${API}/api/reviews/${reviewId}`, {
      method: 'DELETE',
      credentials: 'include',
    })
    if (res.ok) {
      setMyReviews((prev) => prev.filter((r) => r.id !== reviewId))
    }
  }

  async function handleEdit({ rating, body }) {
    const res = await fetch(`${API}/api/reviews/${editing.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ rating, body }),
    })
    if (res.ok) {
      setMyReviews((prev) =>
        prev.map((r) => (r.id === editing.id ? { ...r, rating, body } : r))
      )
    }
  }

  const initials = user?.name ? user.name.slice(0, 2).toUpperCase() : 'U'

  return (
    <div className="profile-page">
      <Link to="/dashboard" className="back-link">← Back to apartments</Link>

      <div className="profile-header">
        <span className="profile-avatar">{initials}</span>
        <div className="profile-info">
          <h1>{user?.name}</h1>
          <p>{user?.email}</p>
        </div>
        <div className="profile-stats">
          <span className="profile-stat-number">{myReviews.length}</span>
          <span className="profile-stat-label">Reviews</span>
        </div>
      </div>

      <h2 className="profile-section-title">Your Reviews</h2>

      {loading ? (
        <p className="profile-empty">Loading...</p>
      ) : myReviews.length === 0 ? (
        <p className="profile-empty">You haven't written any reviews yet.</p>
      ) : (
        myReviews.map((r) => (
          <div className="profile-review" key={r.id}>
            <div className="profile-review__main">
              <h3>{r.apartmentName}</h3>
              <StarRating rating={r.rating} />
              <p className="profile-review__body">{r.body}</p>
            </div>
            <div className="profile-review__actions">
              <Link to={`/apartment/${r.aptId}`} className="profile-view-link">
                View
              </Link>
              <button className="profile-edit-btn" onClick={() => setEditing(r)}>
                Edit
              </button>
              <button
                className="profile-delete-btn"
                onClick={() => handleDelete(r.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}

      {editing && (
        <div className="modal-overlay" onClick={() => setEditing(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <ReviewDialog
              title="Edit Review"
              submitLabel="Save Changes"
              initialRating={editing.rating}
              initialBody={editing.body}
              onClose={() => setEditing(null)}
              onSubmit={handleEdit}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default Profile
