import './Features.css'

const FEATURES = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#eab308" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    title: 'Verified Reviews',
    body: 'Real ratings with photos and videos from past tenants.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3l1.9 4.8L18.5 9 14 12l1.5 5L12 14.5 8.5 17 10 12 5.5 9l4.6-1.2L12 3z" />
      </svg>
    ),
    title: 'AI Summaries',
    body: 'Key issues and sentiment extracted from every review.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    title: 'Ask Questions',
    body: 'Comment on reviews and get answers from past tenants.',
  },
]

function Features() {
  return (
    <section className="features">
      {FEATURES.map((f) => (
        <div className="feature" key={f.title}>
          <div className="feature__icon">{f.icon}</div>
          <h3 className="feature__title">{f.title}</h3>
          <p className="feature__body">{f.body}</p>
        </div>
      ))}
    </section>
  )
}

export default Features
