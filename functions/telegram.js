// const TelegramBot = require('node-telegram-bot-api')
// const token = process.env.SUSHI_TELEGRAM_TOKEN

// const bot = new TelegramBot(token, { polling: false })

// exports.handler = async function (event, context) {
//   if (event.httpMethod !== 'POST') {
//     return { statusCode: 405, body: 'Method Not Allowed' }
//   }

//   if (!event.body) {
//     return { statusCode: 400, body: 'Body is empty!' }
//   }

//   const chatId = 735449634
//   const requestBody = JSON.parse(event.body)
//   const { name, email, message } = requestBody

//   try {
//     await bot.sendMessage(
//       chatId,
//       `Name: ${name}\nEmail: ${email}\nMessage: ${message}\nZakaz:`
//     )
//     return {
//       statusCode: 200,
//       body: JSON.stringify({ message: 'Message sent' }),
//     }
//   } catch (error) {
//     return {
//       statusCode: 400,
//       body: JSON.stringify({ message: 'Error sending message' }),
//     }
//   }
// }

const TelegramBot = require('node-telegram-bot-api')
// const token = process.env.SUSHI_TELEGRAM_TOKEN
const token = '6462249989:AAF3uURDfNwTQp3RDT_X-4vzWWiL36pOkUg'

const bot = new TelegramBot(token, { polling: false, chatId: 735449634 })

exports.handler = async function (event, context) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  if (!event.body) {
    return { statusCode: 400, body: 'Body is empty!' }
  }

  const chatId = bot.options.chatId
  const requestBody = JSON.parse(event.body)
  const { name, email, message } = requestBody

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
