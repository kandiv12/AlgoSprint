export default function Footer() {
  return (
    <footer className="bg-dark text-white text-center py-3 mt-auto">
      <div className="container">
        <small>
          Made with ❤️ for DSA prep • AlgoSprint © {new Date().getFullYear()}
        </small>
      </div>
    </footer>
  );
}
