import { useMemo, useState } from "react"
import useGitHubUsers from "../hooks/useGitHubUsers"
import useDebounce from "../hooks/useDebounce"
import SearchInput from "../components/SearchInput"
import UserCard from "../components/UserCard"
import InfiniteScroll from "react-infinite-scroll-component"
import LoadingSpinner from "../components/LoadingSpinner"

const UsersList = () => {
    const [searchTerm, setSearchTerm] = useState("")
    const debouncedSearchTerm = useDebounce(searchTerm, 300)

    const { users, loading, error, hasMore, loadMore } = useGitHubUsers()

    // Filter users based on search term (client-side only)
    const filteredUsers = useMemo(() => {
        if (!debouncedSearchTerm) return users

        return users.filter((user) => user.login.toLowerCase().includes(debouncedSearchTerm.toLowerCase()))
    }, [users, debouncedSearchTerm])

    if (error) {
        return <ErrorMessage message={error} />
    }

    return (
        <div className="space-y-6">
            <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">GitHub Users</h1>
                <p className="text-gray-600">Discover and favorite GitHub users</p>
            </div>

            <SearchInput value={searchTerm} onChange={setSearchTerm} placeholder="Search users..." />

            {filteredUsers.length === 0 && !loading && searchTerm && (
                <div className="text-center py-12">
                    <p className="text-gray-500">No users found matching "{searchTerm}"</p>
                </div>
            )}

            {!searchTerm ? (
                <InfiniteScroll
                    dataLength={users.length}
                    next={loadMore}
                    hasMore={hasMore}
                    loader={<LoadingSpinner />}
                    endMessage={
                        <div className="text-center py-8">
                            <p className="text-gray-500">You've reached the end of the list!</p>
                        </div>
                    }
                    scrollThreshold={0.8}
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {users.map((user) => (
                            <UserCard key={user.id} user={user} />
                        ))}
                    </div>
                </InfiniteScroll>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredUsers.map((user) => (
                        <UserCard key={user.id} user={user} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default UsersList