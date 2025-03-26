import ProblemCard from "./ProblemCard";

export default function CategorySection({
  category,
  problems,
  progress,
  toggleCheckbox,
}) {
  const total = problems.length;
  const solved = problems.filter((p) => progress[p.id]).length;
  const percent = total > 0 ? Math.round((solved / total) * 100) : 0;

  return (
    <section className="mb-5">
      {/* Section Header */}
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h5 className="mb-0">{category}</h5>
        <small className="text-muted">
          {solved} / {total} solved
        </small>
      </div>

      {/* Progress Bar */}
      <div className="progress mb-3 rounded-pill" style={{ height: "8px" }}>
        <div
          className="progress-bar bg-info rounded-pill"
          role="progressbar"
          style={{ width: `${percent}%` }}
          aria-valuenow={percent}
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div>

      {/* Problem List */}
      {problems.length === 0 ? (
        <p className="text-muted">No problems in this category.</p>
      ) : (
        problems.map((problem) => (
          <ProblemCard
            key={problem.id}
            problem={problem}
            checked={progress[problem.id]}
            onToggle={() => toggleCheckbox(problem.id)}
          />
        ))
      )}
    </section>
  );
}
