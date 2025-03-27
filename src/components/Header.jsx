import { supabase } from "../supaBaseClient";

export default function Header({ user }) {
  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin, // ✅ works for local + prod
        queryParams: {
          prompt: "select_account", // ✅ always show account picker
        },
      },
    });

    if (error) {
      alert("Login error: " + error.message);
      console.error("Supabase login error:", error);
    }
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    // ✅ Dynamically extract project ref from supabase.url
    const projectRef = supabase?.supabaseUrl
      ?.split("https://")[1]
      ?.split(".")[0];
    if (projectRef) {
      localStorage.removeItem(`sb-${projectRef}-auth-token`);
    }

    if (error) {
      alert("Logout error: " + error.message);
      console.error("Supabase logout error:", error);
    } else {
      console.log("🔓 Logout successful");
      window.location.href = window.location.origin; // cleaner than reload
    }
  };

  return (
    <header
      className="text-white py-3 shadow"
      style={{
        background: "linear-gradient(90deg, #0d6efd 0%, #0a58ca 100%)",
      }}
    >
      <div className="container d-flex justify-content-between align-items-center flex-wrap">
        <div className="d-flex align-items-center mb-2 mb-md-0">
          <img
            src="/assets/logo.webp"
            alt="AlgoSprint Logo"
            width="40"
            height="40"
            className="me-2"
            style={{ objectFit: "contain" }}
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/40"; // fallback
            }}
          />
          <div>
            <h1 className="h5 mb-0 fw-bold">AlgoSprint</h1>
            <small className="text-white-50">15-Day DSA Crash Course</small>
          </div>
        </div>

        <div className="d-flex align-items-center gap-2">
          {user ? (
            <>
              <span className="text-white-50 small">{user.email}</span>
              <button
                onClick={handleLogout}
                className="btn btn-sm btn-outline-light"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={handleLogin}
              className="btn btn-sm btn-light"
              aria-label="Sign in with Google"
            >
              Continue with Google
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
