import './ApartmentCard.css'

// Renders 5 stars, filled according to the rating (rounded to nearest whole).
function Stars({ rating }) {
  const filled = Math.round(rating)
  return (
    <span className="card__stars" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <span key={n} className={n <= filled ? 'star star--on' : 'star'}>
          ★
        </span>
      ))}
    </span>
  )
}

function ApartmentCard({ apartment }) {
  const { name, address, neighbourhood, rating, reviews, tags, image } =
    apartment

  return (
    <article className="card">
      <div className="card__image-wrap">
        <img
          className="card__image"
          src={image}
          alt={name}
          loading="lazy"
        />
        <span className="card__rating-badge">★ {rating.toFixed(1)}</span>
      </div>

      <div className="card__body">
        <h3 className="card__name">{name}</h3>
        <p className="card__address">
          📍 {address} · {neighbourhood}
        </p>

        <div className="card__tags">
          {tags.map((tag) => (
            <span className="card__tag" key={tag}>
              {tag}
            </span>
          ))}
        </div>

        <div className="card__footer">
          <span className="card__reviews">
            {reviews} {reviews === 1 ? 'review' : 'reviews'}
          </span>
          <Stars rating={rating} />
        </div>
      </div>
    </article>
  )
}

export default ApartmentCard
