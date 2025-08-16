import React from 'react'
import Layout from '../layout'
import Login from '../components/Login'
import CheckAuth from '../components/CheckAuth'
import { useAuth } from '../hooks/useAuth' // Якщо у вас кастомний хук

function AdminPage() {
  const { isAuthenticated } = useAuth() // Якщо у вас такий хук

  return (
    <Layout>
      <h1>Admin page</h1>
      {!isAuthenticated ? <Login /> : <CheckAuth />}{' '}
      {/* Показуємо CheckAuth після входу */}
    </Layout>
  )
}

export default AdminPage
