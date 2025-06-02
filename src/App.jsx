import { Suspense } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Favorites from "./pages/Favorites"
import UsersList from "./pages/UsersList"
import LoadingSpinner from "./components/LoadingSpinner"
import Header from "./components/Header"
import { FavoritesProvider } from "./context/favoritesContext"


export default function App() {
  return (
    <FavoritesProvider>

      <Router>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <main className="container py-8">
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/" element={<UsersList />} />
                <Route path="/favorites" element={<Favorites />} />
              </Routes>
            </Suspense>
          </main>
        </div>
      </Router>
    </FavoritesProvider>
  )
}
