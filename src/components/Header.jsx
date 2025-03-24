export default function Header() {
  return (
    <header
      className="text-white py-3 shadow"
      style={{
        background: "linear-gradient(90deg, #0d6efd 0%, #0a58ca 100%)",
      }}
    >
      <div className="container d-flex justify-content-between align-items-center flex-wrap">
        {/* Logo + App Name */}
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

        {/* Right Side (Placeholder for buttons or links) */}
        <div>
          <a
            href="https://github.com/kandiv12"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline-light btn-sm"
          >
            ⭐ Star on GitHub
          </a>
        </div>
      </div>
    </header>
  );
}
