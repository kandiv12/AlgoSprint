export default function ProgressSummary({ problems, progress }) {
  const total = problems.length;
  const solved = problems.filter((p) => progress[p.id]).length;

  const difficultyStats = problems.reduce((acc, problem) => {
    const diff = problem.difficulty || "Medium";
    if (!acc[diff]) acc[diff] = { total: 0, solved: 0 };
    acc[diff].total += 1;
    if (progress[problem.id]) acc[diff].solved += 1;
    return acc;
  }, {});

  const orderedDifficulties = ["Easy", "Medium", "Hard"];
  const difficultyColors = {
    Easy: "success",
    Medium: "warning",
    Hard: "danger",
  };

  const percent = total === 0 ? 0 : Math.round((solved / total) * 100);

  return (
    <div className="mb-4">
      <h4>Progress Summary</h4>
      <p className="lead mb-1">
        <strong>{solved}</strong> / {total} problems solved
      </p>

      <div className="progress mb-3" style={{ height: "1rem" }}>
        <div
          className="progress-bar bg-info"
          role="progressbar"
          style={{ width: `${percent}%` }}
          aria-valuenow={percent}
          aria-valuemin="0"
          aria-valuemax="100"
        >
          {percent}%
        </div>
      </div>

      <div className="row">
        {orderedDifficulties.map((diff) => {
          const stats = difficultyStats[diff] || { total: 0, solved: 0 };
          const color = difficultyColors[diff] || "secondary";
          const diffPercent =
            stats.total === 0
              ? 0
              : Math.round((stats.solved / stats.total) * 100);

          return (
            <div className="col-sm-4 mb-3" key={diff}>
              <div className={`card border-${color} shadow-sm`}>
                <div className="card-body">
                  <h6 className={`card-title text-${color}`}>{diff}</h6>
                  <p className="card-text mb-1">
                    <strong>{stats.solved}</strong> / {stats.total} solved
                  </p>
                  <div className="progress" style={{ height: "0.75rem" }}>
                    <div
                      className={`progress-bar bg-${color}`}
                      role="progressbar"
                      style={{ width: `${diffPercent}%` }}
                      aria-valuenow={diffPercent}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      {diffPercent}%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <hr />
    </div>
  );
}
