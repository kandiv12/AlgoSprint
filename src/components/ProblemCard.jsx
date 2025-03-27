export default function ProblemCard({ problem, checked, onToggle }) {
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
            href={problem.link || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="fw-bold text-decoration-none"
            title="Open problem in new tab"
          >
            {problem.title || "Untitled Problem"}
          </a>
          <div className="mt-1">
            <span
              className={`badge bg-${getBadgeClass(problem.difficulty)}`}
              title={`Difficulty: ${problem.difficulty || "Unknown"}`}
            >
              {problem.difficulty || "N/A"}
            </span>
          </div>
        </div>

        <div className="form-check m-0">
          <input
            type="checkbox"
            className="form-check-input"
            id={`check-${problem.id}`}
            checked={!!checked}
            onChange={onToggle}
            title="Mark as complete"
            aria-label={`Mark ${problem.title} as ${
              checked ? "incomplete" : "complete"
            }`}
          />
        </div>
      </div>
    </div>
  );
}
