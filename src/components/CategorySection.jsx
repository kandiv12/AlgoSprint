import ProblemCard from "./ProblemCard";

export default function CategorySection({
  category,
  problems,
  progress,
  toggleCheckbox,
}) {
  const total = problems.length;
  const solved = problems.filter((p) => progress[p.id]).length;
  const percent = Math.round((solved / total) * 100);

  return (
    <section className="mb-5">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h5 className="mb-0">{category}</h5>
        <small className="text-muted">
          {solved} / {total} solved
        </small>
      </div>

      {/* Bootstrap Progress Bar */}
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
      {problems.map((problem) => (
        <ProblemCard
          key={problem.id}
          problem={problem}
          checked={progress[problem.id]}
          onToggle={() => toggleCheckbox(problem.id)}
        />
      ))}
    </section>
  );
}
