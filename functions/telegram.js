const TelegramBot = require('node-telegram-bot-api')
// const token = process.env.YOUR_TELEGRAM_BOT_TOKEN
// const token = process.env.SUSHI_TELEGRAM_TOKEN
const token = '6462249989:AAF3uURDfNwTQp3RDT_X-4vzWWiL36pOkUg'
const bot = new TelegramBot(token, { polling: false })

exports.handler = async function (event, context) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  if (!event.body) {
    return { statusCode: 400, body: 'Body is empty!' }
  }

  const chatId = 735449634
  const requestBody = JSON.parse(event.body)
  const { name, email, message } = requestBody

  // const formattedCartItems = cartItems
  //   .map((item) => {
  //     return `${item.name} - К-сть: ${item.quantity} - Ціна: $${
  //       item.price
  //     } - Сумма: $${item.price * item.quantity}`
  //   })
  //   .join('\n')

  try {
    await bot.sendMessage(
      chatId,
      `Name: ${name}\nEmail: ${email}\nMessage: ${message}\nZakaz:`
    )
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Message sent' }),
    }
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Error sending message' }),
    }
  }
}
