const { MongoClient } = require('mongodb')

// const uri = process.env.URI_DATABASE_SUSI
const uri =
  'mongodb+srv://petryxanko:12345@cluster-susi.zpj8h6x.mongodb.net/?retryWrites=true&w=majority'

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const connectToDatabase = async () => {
  await client.connect()
  return client.db('Susi').collection('Zamovlennia')
}

exports.handler = async (event) => {
  try {
    const collection = await connectToDatabase()

    if (event.httpMethod === 'GET') {
      // Handle GET request (fetch data)
      const results = await collection.find({}).limit(20).toArray()
      return {
        statusCode: 200,
        body: JSON.stringify(results),
      }
    } else if (event.httpMethod === 'POST') {
      // Handle POST request (add data)
      const data = JSON.parse(event.body)
      const result = await collection.insertOne(data)
      console.log('дані що надсилаються ', data)
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: 'Data added successfully',
          insertedId: result.insertedId,
        }),
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
