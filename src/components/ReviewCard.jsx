import StarRating from './StarRating'
import './ReviewCard.css'

// Displays a single review. Receives all data as props.
function ReviewCard({ author, rating, body, date }) {
  return (
    <div className="review-card">
      <div className="review-header">
        <div className="review-author-info">
          <span className="review-author">{author}</span>
          <span className="review-date">{date}</span>
        </div>
        <StarRating rating={rating} />
      </div>
      <p className="review-body">{body}</p>
    </div>
  )
}

export default ReviewCard
