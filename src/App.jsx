import Header from "./components/Header";
import Footer from "./components/Footer";
import ProgressSummary from "./components/ProgressSummary";
import CategorySection from "./components/CategorySection";
import { useEffect, useState } from "react";
import { supabase } from "./supaBgaseClient";

export default function App() {
  const [problems, setProblems] = useState([]);
  const [progress, setProgress] = useState({});
  const [user, setUser] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const loadUserProgress = async (userId) => {
    const { data, error } = await supabase
      .from("user_progress")
      .select("problem_id")
      .eq("user_id", userId);

    if (error) {
      console.error("Error loading progress:", error.message);
      return;
    }

    const solved = {};
    data.forEach((item) => {
      solved[item.problem_id] = true;
    });
    setProgress(solved);
  };

  const fetchProblems = async () => {
    const { data, error } = await supabase.from("problems").select("*");
    if (error) {
      console.error("Error loading problems:", error.message);
    } else {
      setProblems(data);
    }
  };

  useEffect(() => {
    const init = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const tokenUser = session?.user ?? null;

      if (tokenUser) {
        const { data: userData, error: userError } =
          await supabase.auth.getUser();

        if (userError || !userData?.user) {
          console.warn("Session invalid. Logging out.");
          await supabase.auth.signOut();
          localStorage.removeItem("sb-thewcqvbmepuaevxehzg-auth-token");
          setUser(null);
          setProgress({});
        } else {
          console.log("✅ Valid session:", userData.user);
          setUser(userData.user);
          await loadUserProgress(userData.user.id);
        }
      } else {
        setUser(null);
      }

      await fetchProblems();
    };

    init();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("🔄 Auth state change:", event, session);
      const newUser = session?.user ?? null;
      setUser(newUser);

      if (newUser) {
        await loadUserProgress(newUser.id);
      } else {
        setProgress({});
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const toggleCheckbox = async (problemId) => {
    if (!user) {
      alert("Please log in to track progress.");
      return;
    }

    const isChecked = progress[problemId];

    if (isChecked) {
      await supabase
        .from("user_progress")
        .delete()
        .match({ user_id: user.id, problem_id: problemId });
    } else {
      await supabase.from("user_progress").upsert({
        user_id: user.id,
        problem_id: problemId,
        completed: true,
      });
    }

    setProgress((prev) => ({
      ...prev,
      [problemId]: !isChecked,
    }));
  };

  const categorizedProblems = problems.reduce((acc, problem) => {
    const category = problem.category || "Uncategorized";
    if (!acc[category]) acc[category] = [];
    acc[category].push(problem);
    return acc;
  }, {});

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
      <Header user={user} />
      <main className="container py-4 flex-grow-1">
        {!problems.length ? (
          <p className="text-center mt-5">Loading problems...</p>
        ) : (
          <>
            <ProgressSummary problems={problems} progress={progress} />

            <div className="mb-4 d-flex align-items-center gap-2">
              <label
                htmlFor="categorySelect"
                className="form-label fw-bold mb-0"
              >
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
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
