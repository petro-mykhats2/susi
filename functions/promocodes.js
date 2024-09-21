const { MongoClient } = require('mongodb')

const uri = process.env.URI_DATABASE_SUSI
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const getPromocodes = async () => {
  await client.connect()
  return client.db('Susi').collection('Promocodes')
}

exports.handler = async (event) => {
  try {
    const collection = await getPromocodes()

    if (event.httpMethod === 'POST') {
      const data = JSON.parse(event.body)
      const { code, orderValue } = data

      console.log('Received code:', code) // Логування коду

      const promoCode = await collection.findOne({ code: code, isActive: true })

      // Перевірка на наявність промокоду
      if (!promoCode) {
        return {
          statusCode: 400,
          body: JSON.stringify({ message: 'Invalid promo code' }),
        }
      }

      // Перетворення рядка дати в об'єкт Date
      const expiryDate = new Date(promoCode.expiryDate)
      const currentDate = new Date()

      // Перевірка на термін дії промокоду
      if (expiryDate < currentDate) {
        return {
          statusCode: 400,
          body: JSON.stringify({ message: 'Promo code expired' }),
        }
      }

      return {
        statusCode: 200,
        body: JSON.stringify({
          message: 'Promo code applied successfully',
          discountType: promoCode.discountType,
          discountValue: promoCode.discountValue,
        }),
      }
    } else {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Invalid request method' }),
      }
    }
  } catch (error) {
    console.error('Error processing request:', error)
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
