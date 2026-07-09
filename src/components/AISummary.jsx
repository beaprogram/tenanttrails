import './AISummary.css'

// AI-generated summary text plus issue tags.
function AISummary({ summary, issues = [] }) {
  return (
    <div className="ai-summary">
      <div className="ai-summary-card">
        <span className="ai-summary-label">✨ AI-Generated Summary</span>
        <p className="ai-summary-text">{summary}</p>
      </div>

      {issues.length > 0 && (
        <div className="ai-issues">
          <h3>Key Issues</h3>
          <div className="ai-issues-tags">
            {issues.map((issue) => (
              <span key={issue} className="ai-issue-tag">
                {issue}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default AISummary
