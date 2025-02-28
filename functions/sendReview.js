const { MongoClient } = require('mongodb')

const uri = process.env.URI_DATABASE_SUSI

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const connectToDatabase = async () => {
  await client.connect()
  return client.db('Susi').collection('Reviews')
}

exports.handler = async (event) => {
  let client

  try {
    // Додаємо логування
    console.log('Received request:', event.httpMethod)

    client = new MongoClient(uri, {
      useUnifiedTopology: true,
    })

    await client.connect()
    console.log('Connected to MongoDB')

    const collection = client.db('Susi').collection('Reviews')

    if (event.httpMethod === 'GET') {
      // Handle GET request (fetch reviews)
      const results = await collection.find({}).limit(20).toArray()
      return {
        statusCode: 200,
        body: JSON.stringify(results),
      }
    } else if (event.httpMethod === 'POST') {
      const review = JSON.parse(event.body)
      console.log('Received review data:', review)

      if (!review.author || !review.text || !review.rating) {
        return {
          statusCode: 400,
          body: JSON.stringify({
            message: 'Всі поля повинні бути заповнені',
            receivedData: review,
          }),
        }
      }

      const result = await collection.insertOne(review)
      console.log('Inserted review:', result)

      return {
        statusCode: 201,
        body: JSON.stringify({
          message: 'Відгук успішно додано',
          insertedId: result.insertedId,
        }),
      }
    } else {
      return {
        statusCode: 405,
        body: JSON.stringify({ message: 'Method not allowed' }),
      }
    }
  } catch (error) {
    console.error('Error:', error)
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Server error',
        error: error.message,
        stack: error.stack,
      }),
    }
  } finally {
    if (client) {
      await client.close()
    }
  }
}
