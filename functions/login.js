const { MongoClient } = require('mongodb')
const bcrypt = require('bcryptjs')

const uri = process.env.URI_DATABASE_SUSI
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
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Метод не дозволений' }),
      }
    }

    const { username, password } = JSON.parse(event.body)
    const collection = await connectToDatabase()

    const user = await collection.findOne({ username })
    if (!user) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Користувача не знайдено' }),
      }
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Невірний пароль' }),
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: 'Вхід успішний' }),
    }
  } catch (error) {
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
