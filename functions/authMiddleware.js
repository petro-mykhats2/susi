// functions/authMiddleware.js
const jwt = require('jsonwebtoken')

const jwtSecret = process.env.JWT_SECRET // Отримуємо секрет з середовища

const authMiddleware = (event) => {
  const token = event.headers['authorization']?.split(' ')[1] // Отримуємо токен з заголовка

  if (!token) {
    return { success: false, message: 'Токен відсутній' }
  }

  try {
    const decoded = jwt.verify(token, jwtSecret) // Перевіряємо токен з твоїм jwtSecret
    return { success: true, user: decoded } // Повертаємо дані користувача
  } catch (error) {
    return { success: false, message: 'Невірний токен' }
  }
}

module.exports = authMiddleware
