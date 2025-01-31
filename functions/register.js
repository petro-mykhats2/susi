const { MongoClient } = require('mongodb')
const bcrypt = require('bcryptjs')

const uri = process.env.URI_DATABASE_SUSI
let client
let collection

const connectToDatabase = async () => {
  if (!client) {
    client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    await client.connect()
    collection = client.db('Susi').collection('User')
  }
  return collection
}

exports.handler = async (event) => {
  try {
    const collection = await connectToDatabase()

    if (event.httpMethod === 'POST') {
      const data = JSON.parse(event.body)

      // Валідація
      if (!data.username || !data.password || data.password.length < 6) {
        return {
          statusCode: 400,
          body: JSON.stringify({ message: 'Некоректні дані' }),
        }
      }

      const existingUser = await collection.findOne({ username: data.username })
      if (existingUser) {
        return {
          statusCode: 400,
          body: JSON.stringify({ message: 'Користувач вже існує' }),
        }
      }

      // Хешування пароля перед збереженням
      const hashedPassword = await bcrypt.hash(data.password, 10)
      await collection.insertOne({
        username: data.username,
        password: hashedPassword,
      })

      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Реєстрація успішна' }),
      }
    } else {
      return {
        statusCode: 405,
        body: JSON.stringify({ message: 'Метод не дозволений' }),
      }
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Помилка сервера',
        error: error.message,
      }),
    }
  }
}
