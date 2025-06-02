# GitHub Users App

This is a simple React + TypeScript web app that shows a list of GitHub users. It includes infinite scrolling, search, favorites, and routing — all built with clean design using Tailwind CSS.

---

## 🔧 Features

### 👥 GitHub Users List
- Fetches users from GitHub's public API: `https://api.github.com/users`
- Users are shown in a scrollable list
- Uses **infinite scroll** to load more users as you scroll down (no "Next" buttons)
- Users are stored in local React state

### 🔍 Search
- Search through users **already fetched**
- No new API requests during search
- Uses **debounced search** to improve performance

### ⭐ Favorites
- Each user has a ⭐ button to mark them as favorite
- Favorites are stored in **global state** using Context API
- Favorites persist after refreshing the page (saved in **localStorage**)
- A separate `/favorites` page shows only your starred users
- Each favorite links to the user’s GitHub profile in a new tab

### 🚀 Routing
- Built using **React Router v6+**
- Two routes:
  - `/` → main user list with infinite scroll
  - `/favorites` → your favorite users

### 🎨 UI & UX
- Responsive and modern design using **Tailwind CSS**
- Shows a **loading spinner** while fetching data
- Displays an error message if something goes wrong

### 🧠 Optimization
- Clean code using **functional components** and **React Hooks**
- Includes **lazy loading** and **code splitting** for faster load times

---

## ▶️ Getting Started

### 1. Clone the Repo
```bash
git clone https://github.com/yousufatef/extremeSolution_Assessment.git

