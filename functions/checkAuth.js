const authMiddleware = require('./authMiddleware')

exports.handler = async (event) => {
  console.log('checkAuth function was called') // Для перевірки

  const authResult = authMiddleware(event)

  if (!authResult.success) {
    return {
      statusCode: 401,
      body: JSON.stringify({ message: 'Unauthorized' }),
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ user: authResult.user }),
  }
}
