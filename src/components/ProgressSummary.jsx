export default function ProgressSummary({ problems, progress }) {
  const total = problems.length;
  const solved = problems.filter((p) => progress[p.id]).length;

  // Track stats by difficulty
  const difficultyStats = problems.reduce((acc, problem) => {
    const diff = problem.difficulty || "Medium";
    if (!acc[diff]) {
      acc[diff] = { total: 0, solved: 0 };
    }
    acc[diff].total += 1;
    if (progress[problem.id]) {
      acc[diff].solved += 1;
    }
    return acc;
  }, {});

  // Define desired difficulty order
  const orderedDifficulties = ["Easy", "Medium", "Hard"];

  return (
    <div className="mb-4">
      <h4>Progress Summary</h4>
      <p className="lead">
        <strong>{solved}</strong> / {total} problems solved
      </p>

      <div className="row">
        {orderedDifficulties.map((diff) => {
          const stats = difficultyStats[diff] || { total: 0, solved: 0 };
          const borderColor =
            diff === "Easy"
              ? "success"
              : diff === "Medium"
              ? "warning"
              : "danger";

          return (
            <div className="col-sm-4 mb-2" key={diff}>
              <div className={`card border-${borderColor} shadow-sm`}>
                <div className="card-body">
                  <h6 className="card-title text-capitalize">{diff}</h6>
                  <p className="card-text mb-0">
                    <strong>{stats.solved}</strong> / {stats.total} solved
                  </p>
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
