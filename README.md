# ⚡ AlgoSprint

> Your 15-Day DSA Crash Course Tracker – built to help you prep for tech interviews efficiently.

![AlgoSprint Screenshot](./public/assets/screenshot.png)

---

## 🚀 About the Project

**AlgoSprint** is a fully responsive web app designed to help users track and complete 150 handpicked Data Structures and Algorithms problems before their technical interviews. The problems are categorized, color-coded by difficulty, and neatly organized by topic.

---

### 🎯 Features

- ✅ 150 most asked DSA problems
- 📂 Grouped by category (Array, Graph, DP, etc.)
- 🧠 Difficulty-based summary (Easy, Medium, Hard)
- 🔘 Checkboxes to track solved problems
- 🧩 State persistence using `localStorage`
- ⚡ Fast, responsive, and built with Vite + Bootstrap
- 📊 Live problem count per difficulty
- 🧪 Clean and modern UI

---

## 🖼️ Screenshot

> Here's how the UI looks:

![AlgoSprint Screenshot](./public/assets/screenshot.png)

---

## 🛠️ Tech Stack

- **React**
- **Vite**
- **Bootstrap 5**
- **localStorage** (for progress tracking)
- 📦 `problems_with_difficulty.js` (your curated dataset)

---

## 📁 Folder Structure

```
src/
├── App.jsx
├── main.jsx
├── data/
│   └── problems_with_difficulty.js
├── components/
│   ├── Header.jsx
│   ├── Footer.jsx
│   ├── ProgressSummary.jsx
│   ├── CategorySection.jsx
│   └── ProblemCard.jsx
```

---

## 🧑‍💻 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/your-username/algosprint.git
cd algosprint
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run locally
```bash
npm run dev
```

### 4. Build for production
```bash
npm run build
```

---

## 🌍 Live Demo

_If deployed_, you can access the project here:  
**[https://algosprint.vercel.app](https://algosprint.vercel.app)** _(Update this if hosted)_

---

## 🙌 Credits

- Built with ❤️ by [Your Name]
- Problem data curated from top LeetCode problems commonly asked in Big Tech interviews

---

## 🪪 License

This project is licensed under the [MIT License](LICENSE).
