// functions/protected-route.js
const authMiddleware = require('./authMiddleware')

exports.handler = async (event) => {
  const auth = authMiddleware(event) // Перевіряємо токен

  if (!auth.success) {
    return {
      statusCode: 401,
      body: JSON.stringify({ message: auth.message }), // Якщо токен не дійсний
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Захищені дані', user: auth.user }), // Повертаємо дані, якщо токен дійсний
  }
}
