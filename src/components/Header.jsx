import { Link, useLocation } from "react-router-dom"
import { Star, Users } from "lucide-react"
import { useFavorites } from "../context/favoritesContext"

const Header = () => {
    const location = useLocation()
    const { favorites } = useFavorites()

    return (
        <nav className="bg-white shadow-sm border-b">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center space-x-8">
                        <h1 className="text-[16px] md:text-xl font-bold text-gray-900">GitHub Users</h1>
                        <div className="flex space-x-2 md:space-x-4">
                            <Link
                                to="/"
                                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm transition-colors ${location.pathname === "/"
                                    ? "bg-blue-100 text-blue-700"
                                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                                    }`}
                            >
                                <Users size={16} />
                                <span>All Users</span>
                            </Link>
                            <Link
                                to="/favorites"
                                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm transition-colors ${location.pathname === "/favorites"
                                    ? "bg-blue-100 text-blue-700"
                                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                                    }`}
                            >
                                <Star size={16} />
                                <span>Favorites</span>
                                {favorites.length > 0 && (
                                    <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                                        {favorites.length}
                                    </span>
                                )}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Header