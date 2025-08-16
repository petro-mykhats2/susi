// hooks/useAuth.js
import { useState, useEffect } from 'react'

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const checkAuth = () => {
      const userToken = localStorage.getItem('token')
      setIsAuthenticated(!!userToken)
    }

    window.addEventListener('storage', checkAuth)
    checkAuth() // Викликаємо одразу при завантаженні

    return () => window.removeEventListener('storage', checkAuth)
  }, [])

  return { isAuthenticated } // ✅ Повертаємо як об'єкт
}
