export default function ProblemCard({ problem, checked, onToggle }) {
  // Determine Bootstrap badge class based on difficulty
  const getBadgeClass = (difficulty) => {
    switch (difficulty) {
      case "Easy":
        return "success";
      case "Medium":
        return "warning";
      case "Hard":
        return "danger";
      default:
        return "secondary";
    }
  };

  return (
    <div className="card mb-2 shadow-sm">
      <div className="card-body d-flex justify-content-between align-items-center">
        <div>
          <a
            href={problem.link}
            target="_blank"
            rel="noopener noreferrer"
            className="fw-bold text-decoration-none"
          >
            {problem.title}
          </a>
          <div className="mt-1">
            <span className={`badge bg-${getBadgeClass(problem.difficulty)}`}>
              {problem.difficulty}
            </span>
          </div>
        </div>

        <input
          type="checkbox"
          checked={!!checked}
          onChange={onToggle}
          title="Mark as complete"
        />
      </div>
    </div>
  );
}
