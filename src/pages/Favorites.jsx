import UserCard from "../components/UserCard"
import { useFavorites } from "../context/favoritesContext"
import { Star } from "lucide-react"

const Favorites = () => {
    const { favorites } = useFavorites()

    if (favorites.length === 0) {
        return (
            <div className="text-center py-16">
                <Star size={64} className="mx-auto text-gray-300 mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">No favorites yet</h2>
                <p className="text-gray-600 mb-6">Start exploring users and add them to your favorites!</p>
                <a
                    href="/"
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors inline-block"
                >
                    Browse Users
                </a>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Favorites</h1>
                <p className="text-gray-600">
                    {favorites.length} favorite user{favorites.length !== 1 ? "s" : ""}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {favorites.map((user) => (
                    <UserCard key={user.id} user={user} showProfileLink />
                ))}
            </div>
        </div>
    )
}

export default Favorites
