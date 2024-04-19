const { MongoClient } = require('mongodb')

const uri =
  'mongodb+srv://petryxanko:12345@cluster-susi.zpj8h6x.mongodb.net/?retryWrites=true&w=majority'

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
    const collection = await connectToDatabase()

    if (event.httpMethod === 'POST') {
      // Handle POST request (login)
      const data = JSON.parse(event.body)

      // Перевірка користувача за ім'ям і паролем
      const user = await collection.findOne({
        username: data.username,
        password: data.password,
      })

      if (!user) {
        return {
          statusCode: 400,
          body: JSON.stringify({ message: 'Invalid username or password' }),
        }
      }

      // Якщо користувач знайдений, повертаємо успішний статус
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Login successful' }),
      }
    } else {
      // Handle other types of requests
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Invalid request method' }),
      }
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Server error',
        error: error.message,
      }),
    }
  } finally {
    await client.close()
  }
}
