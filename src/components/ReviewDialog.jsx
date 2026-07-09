import { useState } from 'react'
import './ReviewDialog.css'

// Star rating input, text area, submit. Receives onClose + onSubmit as props.
// Optional initialRating/initialBody/title/submitLabel let it double as an
// edit dialog (used on the Profile page).
function ReviewDialog({
  onClose,
  onSubmit,
  initialRating = 0,
  initialBody = '',
  title = 'Write a Review',
  submitLabel = 'Submit Review',
}) {
  const [rating, setRating] = useState(initialRating)
  const [body, setBody] = useState(initialBody)
  const [error, setError] = useState('')

  function handleSubmit() {
    if (rating === 0 || !body.trim()) {
      setError('Please add a rating and a few words.')
      return
    }
    onSubmit({ rating, body: body.trim() })
    onClose()
  }

  return (
    <div className="review-dialog">
      <div className="dialog-header">
        <h2>{title}</h2>
        <button className="dialog-close" onClick={onClose} aria-label="Close">
          ×
        </button>
      </div>

      <label className="dialog-label">Your rating</label>
      <div className="star-input">
        {[1, 2, 3, 4, 5].map((n) => (
          <span
            key={n}
            className={n <= rating ? 'star-input-on' : 'star-input-off'}
            onClick={() => setRating(n)}
          >
            {n <= rating ? '★' : '☆'}
          </span>
        ))}
      </div>

      <label className="dialog-label">Your review</label>
      <textarea
        className="dialog-textarea"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="What was your experience living here? Cover maintenance, responsiveness, noise, and anything future tenants should know."
        rows={5}
      />

      {error && <p className="dialog-error">{error}</p>}

      <div className="dialog-actions">
        <button className="dialog-cancel" onClick={onClose}>
          Cancel
        </button>
        <button className="dialog-submit" onClick={handleSubmit}>
          {submitLabel}
        </button>
      </div>
    </div>
  )
}

export default ReviewDialog
