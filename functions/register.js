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
      // Handle POST request (register user)
      const data = JSON.parse(event.body)

      // Перевірка існування користувача за допомогою моделі користувача
      const existingUser = await collection.findOne({ username: data.username })
      if (existingUser) {
        return {
          statusCode: 400,
          body: JSON.stringify({
            message: "Користувач з таким ім'ям вже існує",
          }),
        }
      }

      // Якщо користувач не існує, додаємо його до бази даних
      await collection.insertOne(data)

      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Користувач успішно зареєстрований' }),
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
        message: 'Помилка сервера',
        error: error.message,
      }),
    }
  } finally {
    await client.close()
  }
}
