import Header from "./components/Header";
import Footer from "./components/Footer";
import ProgressSummary from "./components/ProgressSummary";
import CategorySection from "./components/CategorySection";
import { useEffect, useState } from "react";
import { PROBLEMS } from "./data/problems_with_difficulty";

export default function AlgoSprintApp() {
  const [progress, setProgress] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const stored = localStorage.getItem("algoProgress");
    if (stored) setProgress(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("algoProgress", JSON.stringify(progress));
  }, [progress]);

  const toggleCheckbox = (id) => {
    setProgress((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Group problems by category
  const categorizedProblems = PROBLEMS.reduce((acc, problem) => {
    const category = problem.category || "Uncategorized";
    if (!acc[category]) acc[category] = [];
    acc[category].push(problem);
    return acc;
  }, {});

  // Sort problems inside each category by difficulty
  const difficultyOrder = { Easy: 1, Medium: 2, Hard: 3 };
  Object.keys(categorizedProblems).forEach((category) => {
    categorizedProblems[category].sort((a, b) => {
      return (
        (difficultyOrder[a.difficulty] || 4) -
        (difficultyOrder[b.difficulty] || 4)
      );
    });
  });

  const categoryList = Object.keys(categorizedProblems).sort();

  return (
    <div className="bg-light min-vh-100 d-flex flex-column">
      <Header />
      <main className="container py-4 flex-grow-1">
        <ProgressSummary problems={PROBLEMS} progress={progress} />

        {/* 🔽 Dropdown Filter */}
        <div className="mb-4 d-flex align-items-center gap-2">
          <label htmlFor="categorySelect" className="form-label fw-bold mb-0">
            Choose Topic:
          </label>
          <select
            id="categorySelect"
            className="form-select w-auto"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            {categoryList.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Conditionally Render Category Sections */}
        {(selectedCategory === "All"
          ? Object.entries(categorizedProblems)
          : Object.entries(categorizedProblems).filter(
              ([category]) => category === selectedCategory
            )
        ).map(([category, problems]) => (
          <CategorySection
            key={category}
            category={category}
            problems={problems}
            progress={progress}
            toggleCheckbox={toggleCheckbox}
          />
        ))}
      </main>
      <Footer />
    </div>
  );
}
