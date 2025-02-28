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
      const data = JSON.parse(event.body)

      // Якщо це запит на оновлення helpfulCount
      if (data.action === 'incrementHelpful') {
        console.log('Updating helpful count for review:', data.reviewId)
        try {
          const { ObjectId } = require('mongodb')
          const objectId = new ObjectId(data.reviewId)
          console.log('Created ObjectId:', objectId)

          const result = await collection.updateOne(
            { _id: objectId },
            { $inc: { helpfulCount: 1 } }
          )
          console.log('Update result:', result)

          if (result.matchedCount === 0) {
            return {
              statusCode: 404,
              body: JSON.stringify({
                message: 'Відгук не знайдено',
                reviewId: data.reviewId,
              }),
            }
          }

          return {
            statusCode: 200,
            body: JSON.stringify({
              message: 'Оцінку оновлено',
              modifiedCount: result.modifiedCount,
              matchedCount: result.matchedCount,
            }),
          }
        } catch (error) {
          console.error('Error updating helpful count:', error)
          return {
            statusCode: 500,
            body: JSON.stringify({
              message: 'Помилка при оновленні оцінки',
              error: error.message,
            }),
          }
        }
      }

      // Якщо це новий відгук
      if (!data.author || !data.text || !data.rating) {
        return {
          statusCode: 400,
          body: JSON.stringify({
            message: 'Всі поля повинні бути заповнені',
            receivedData: data,
          }),
        }
      }

      const result = await collection.insertOne(data)
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
