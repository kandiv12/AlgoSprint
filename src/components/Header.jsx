import { supabase } from "../supaBaseClient";

export default function Header({ user }) {
  const handleLogin = async (provider) => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: window.location.origin,
        queryParams: {
          prompt: "select_account",
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
      window.location.href = window.location.origin;
    }
  };

  const avatarUrl = user?.user_metadata?.avatar_url;

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
              e.target.src = "https://via.placeholder.com/40";
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
              {avatarUrl && (
                <img
                  src={avatarUrl}
                  alt="User avatar"
                  width="32"
                  height="32"
                  className="rounded-circle"
                  title={user.email}
                  style={{ objectFit: "cover", cursor: "pointer" }}
                  onClick={handleLogout} // Optional: logout on click
                />
              )}
              {!avatarUrl && (
                <button
                  onClick={handleLogout}
                  className="btn btn-sm btn-outline-light"
                >
                  Logout
                </button>
              )}
            </>
          ) : (
            <>
              <button
                onClick={() => handleLogin("google")}
                className="btn btn-sm btn-light"
              >
                Google Login
              </button>
              <button
                onClick={() => handleLogin("github")}
                className="btn btn-sm btn-dark"
              >
                GitHub Login
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
