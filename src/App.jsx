import { Suspense } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Favorites from "./pages/favorites"
import UsersList from "./pages/usersList"
import LoadingSpinner from "./components/LoadingSpinner"
import Header from "./components/Header"


export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<UsersList />} />
              <Route path="/favorites" element={<Favorites />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  )
}
