const { MongoClient } = require('mongodb')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const uri = process.env.URI_DATABASE_SUSI

const jwtSecret = process.env.JWT_SECRET || 'supersecretkey'

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const connectToDatabase = async () => {
  await client.connect()
  return client.db('Susi').collection('User')
}

exports.handler = async (event) => {
  try {
    if (event.httpMethod !== 'POST') {
      console.log('Invalid HTTP method')
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Invalid request method' }),
      }
    }

    const { username, password } = JSON.parse(event.body)
    console.log('Username:', username) // Перевірка username
    const collection = await connectToDatabase()

    const user = await collection.findOne({ username })
    if (!user) {
      console.log('User not found')
      return {
        statusCode: 401,
        body: JSON.stringify({
          message: 'Невірне ім’я користувача або пароль',
        }),
      }
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      console.log('Password mismatch')
      return {
        statusCode: 401,
        body: JSON.stringify({
          message: 'Невірне ім’я користувача або пароль',
        }),
      }
    }

    const token = jwt.sign({ username: user.username }, jwtSecret, {
      expiresIn: '1h',
    })

    return {
      statusCode: 200,
      body: JSON.stringify({ token }),
    }
  } catch (error) {
    console.error('Server error:', error) // Лог для помилки
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Помилка сервера',
        error: error.message,
      }),
    }
  } finally {
    await client.close()
  }
}
