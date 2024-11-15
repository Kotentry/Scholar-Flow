import { useCallback } from 'react'
import { useAuthStore } from '@/store'
import { AuthService } from '@/services/auth/auth-service'

export const useAuth = () => {
  const { user, isAuthenticated, setUser, logout: logoutStore } = useAuthStore()

  const login = useCallback(async (email: string, password: string) => {
    const response = await AuthService.login(email, password)
    if (response.success && response.data) {
      setUser(response.data)
      return true
    }
    return false
  }, [setUser])

  const logout = useCallback(async () => {
    const response = await AuthService.logout()
    if (response.success) {
      logoutStore()
      return true
    }
    return false
  }, [logoutStore])

  const getCurrentUser = useCallback(async () => {
    const response = await AuthService.getCurrentUser()
    if (response.success && response.data) {
      setUser(response.data)
      return true
    }
    return false
  }, [setUser])

  return {
    user,
    isAuthenticated,
    login,
    logout,
    getCurrentUser,
  }
}
