"use client"

import { useState, useEffect, useCallback } from "react"

const USERS_PER_PAGE = 10
const API_BASE_URL = "https://api.github.com/users"

const useGitHubUsers = () => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [hasMore, setHasMore] = useState(true)
    const [since, setSince] = useState(0)

    const fetchUsers = useCallback(async (sinceId = 0) => {
        try {
            setLoading(true)
            setError(null)

            const response = await fetch(`${API_BASE_URL}?since=${sinceId}&per_page=${USERS_PER_PAGE}`)

            if (!response.ok) {
                throw new Error(`Failed to fetch users: ${response.status}`)
            }

            const newUsers = await response.json()

            if (newUsers.length === 0) {
                setHasMore(false)
                return
            }

            setUsers((prev) => (sinceId === 0 ? newUsers : [...prev, ...newUsers]))
            setSince(newUsers[newUsers.length - 1].id)

            if (newUsers.length < USERS_PER_PAGE) {
                setHasMore(false)
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred")
        } finally {
            setLoading(false)
        }
    }, [])

    const loadMore = useCallback(() => {
        if (!loading && hasMore) {
            fetchUsers(since)
        }
    }, [fetchUsers, loading, hasMore, since])

    // Initial fetch
    useEffect(() => {
        fetchUsers(0)
    }, [fetchUsers])

    return {
        users,
        loading,
        error,
        hasMore,
        loadMore,

    }
}
export default useGitHubUsers
