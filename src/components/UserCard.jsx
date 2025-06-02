import { Star, ExternalLink } from "lucide-react"
import { useFavorites } from "../context/favoritesContext"

const UserCard = ({ user, showProfileLink = false }) => {
    const { isFavorite, addFavorite, removeFavorite } = useFavorites()
    const userIsFavorite = isFavorite(user.id)

    const handleFavoriteClick = (e) => {
        e.stopPropagation() // Prevent event bubbling if needed
        if (userIsFavorite) {
            removeFavorite(user.id)
        } else {
            addFavorite(user)
        }
    }

    const handleProfileClick = (e) => {
        e.stopPropagation()
        window.open(user.html_url, "_blank", "noopener,noreferrer")
    }

    return (
        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
            <div className="flex items-center justify-between mb-4">
                <img
                    src={user.avatar_url || "/placeholder.svg"}
                    alt={`${user.login}'s avatar`}
                    className="w-16 h-16 rounded-full"
                    crossOrigin="anonymous"
                    loading="lazy" // Add lazy loading
                />
                <button
                    onClick={handleFavoriteClick}
                    className={`p-2 rounded-full transition-colors ${userIsFavorite
                        ? "bg-yellow-100 text-yellow-600 hover:bg-yellow-200"
                        : "bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-600"
                        }`}
                    aria-label={userIsFavorite ? "Remove from favorites" : "Add to favorites"}
                    data-testid="favorite-button" // For testing
                >
                    <Star
                        size={20}
                        className={userIsFavorite ? "fill-current" : ""}
                        aria-hidden="true"
                    />
                </button>
            </div>

            <div className="space-y-2">
                <h3 className="font-semibold text-gray-900 truncate" title={user.login}>
                    {user.login}
                </h3>
                <p className="text-sm text-gray-500">ID: {user.id}</p>

                {showProfileLink && (
                    <button
                        onClick={handleProfileClick}
                        className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
                        aria-label={`View ${user.login}'s profile`}
                    >
                        <span>View Profile</span>
                        <ExternalLink size={14} aria-hidden="true" />
                    </button>
                )}
            </div>
        </div>
    )
}

export default UserCard