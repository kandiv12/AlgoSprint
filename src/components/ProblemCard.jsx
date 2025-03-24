export default function ProblemCard({ problem, checked, onToggle }) {
  // Define Bootstrap badge color based on difficulty
  const getBadgeClass = (difficulty) => {
    switch (difficulty) {
      case "Easy":
        return "success"; // Green
      case "Medium":
        return "warning"; // Yellow
      case "Hard":
        return "danger"; // Red
      default:
        return "secondary"; // Gray fallback
    }
  };

  return (
    <div className="card mb-2">
      <div className="card-body d-flex justify-content-between align-items-center">
        <div>
          <a
            href={problem.link}
            target="_blank"
            rel="noopener noreferrer"
            className="fw-bold"
          >
            {problem.title}
          </a>
          <div className="mt-1">
            <span className={`badge bg-${getBadgeClass(problem.difficulty)}`}>
              {problem.difficulty}
            </span>
          </div>
        </div>

        <input type="checkbox" checked={checked || false} onChange={onToggle} />
      </div>
    </div>
  );
}
