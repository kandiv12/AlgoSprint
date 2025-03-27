export default function Footer() {
  return (
    <footer className="bg-dark text-white text-center py-3 mt-auto">
      <div className="container">
        <small>
          Made with ❤️ by{" "}
          <a
            href="https://github.com/kandiv12"
            target="_blank"
            rel="noopener noreferrer"
            className="text-info text-decoration-none"
          >
            kandiv12
          </a>{" "}
          • Star it on{" "}
          <a
            href="https://github.com/kandiv12"
            target="_blank"
            rel="noopener noreferrer"
            className="text-warning text-decoration-none"
          >
            GitHub ⭐
          </a>
          <br />
          AlgoSprint © {new Date().getFullYear()}
        </small>
      </div>
    </footer>
  );
}
