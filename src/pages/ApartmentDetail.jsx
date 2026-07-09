import { useState, useEffect, useCallback } from 'react'
import { useParams, Link } from 'react-router-dom'
import { API } from '../api'
import StarRating from '../components/StarRating'
import ReviewCard from '../components/ReviewCard'
import AISummary from '../components/AISummary'
import ReviewDialog from '../components/ReviewDialog'
import './ApartmentDetail.css'

function ApartmentDetail() {
  const { id } = useParams()

  const [apt, setApt] = useState(null)
  const [aptReviews, setAptReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [showReview, setShowReview] = useState(false)

  // Re-fetch the review list. Wrapped in useCallback so the effect + submit share it.
  const loadReviews = useCallback(() => {
    return fetch(`${API}/api/apartments/${id}/reviews`, { credentials: 'include' })
      .then((r) => (r.ok ? r.json() : []))
      .then(setAptReviews)
      .catch(() => setAptReviews([]))
  }, [id])

  // Fetch the apartment and its reviews when the page opens.
  useEffect(() => {
    fetch(`${API}/api/apartments/${id}`, { credentials: 'include' })
      .then((r) => {
        if (r.status === 404) {
          setNotFound(true)
          return null
        }
        return r.json()
      })
      // The DB column is `built`; the page reads `yearBuilt`. aiSummary is not
      // in the database yet, so the AI section simply does not render.
      .then((data) => data && setApt({ ...data, yearBuilt: data.built }))
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false))
    loadReviews()
  }, [id, loadReviews])

  async function handleAddReview({ rating, body }) {
    await fetch(`${API}/api/apartments/${id}/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include', // the cookie authenticates the write
      body: JSON.stringify({ rating, body }),
    })
    loadReviews() // re-fetch so the new review shows up
  }

  if (loading) {
    return (
      <div className="detail-page">
        <Link to="/dashboard" className="back-link">← Back to all apartments</Link>
        <p>Loading...</p>
      </div>
    )
  }

  if (notFound || !apt) {
    return (
      <div className="detail-page">
        <Link to="/dashboard" className="back-link">← Back to all apartments</Link>
        <p>Apartment not found.</p>
      </div>
    )
  }

  const reviewCount = aptReviews.length
  const avgRating =
    reviewCount > 0
      ? aptReviews.reduce((sum, r) => sum + r.rating, 0) / reviewCount
      : apt.rating ?? 0

  return (
    <div className="detail-page">
      <Link to="/dashboard" className="back-link">← Back to all apartments</Link>

      <div className="detail-header">
        <div>
          <h1>{apt.name}</h1>
          <p className="detail-address">📍 {apt.address} · {apt.neighbourhood}</p>
        </div>
        <div className="detail-rating">
          <span className="detail-rating-number">{avgRating.toFixed(1)}</span>
          <StarRating rating={avgRating} />
          <span className="detail-review-count">
            {reviewCount} {reviewCount === 1 ? 'review' : 'reviews'}
          </span>
        </div>
      </div>

      <div className="detail-body">
        <div className="detail-main">
          {apt.aiSummary && (
            <AISummary summary={apt.aiSummary} issues={apt.aiIssues} />
          )}

          <div className="reviews-section">
            <div className="reviews-header">
              <h2>Reviews ({reviewCount})</h2>
              <button className="write-review-btn" onClick={() => setShowReview(true)}>
                + Write a Review
              </button>
            </div>

            {reviewCount === 0 ? (
              <p className="no-reviews">No reviews yet. Be the first to write one.</p>
            ) : (
              aptReviews.map((r) => (
                <ReviewCard
                  key={r.id}
                  author={r.author}
                  rating={r.rating}
                  body={r.body}
                  date={r.date}
                />
              ))
            )}
          </div>
        </div>

        <aside className="detail-sidebar">
          <div className="info-card">
            <h3>Property Info</h3>
            <div className="info-row"><span>Landlord</span><strong>{apt.landlord}</strong></div>
            <div className="info-row"><span>Units</span><strong>{apt.units}</strong></div>
            <div className="info-row"><span>Year built</span><strong>{apt.yearBuilt}</strong></div>
            <div className="info-row"><span>Neighbourhood</span><strong>{apt.neighbourhood}</strong></div>
          </div>
        </aside>
      </div>

      {showReview && (
        <div className="modal-overlay" onClick={() => setShowReview(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <ReviewDialog
              onClose={() => setShowReview(false)}
              onSubmit={handleAddReview}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default ApartmentDetail
