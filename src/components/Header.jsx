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

    // Failsafe: clear session token manually
    localStorage.removeItem("sb-thewcqvbmepuaevxehzg-auth-token");

    if (error) {
      alert("Logout error: " + error.message);
      console.error("Supabase logout error:", error);
    } else {
      console.log("🔓 Logout successful");
      window.location.reload(); // optional clean refresh
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
          />
          <div>
            <h1 className="h5 mb-0 fw-bold">AlgoSprint</h1>
            <small className="text-white-50">15-Day DSA Crash Course</small>
          </div>
        </div>

        <div>
          {user ? (
            <div className="d-flex align-items-center gap-2">
              <span className="text-white-50 small">{user.email}</span>
              <button
                onClick={handleLogout}
                className="btn btn-sm btn-outline-light"
              >
                Logout
              </button>
            </div>
          ) : (
            <button onClick={handleLogin} className="btn btn-sm btn-light">
              Continue with Google
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
