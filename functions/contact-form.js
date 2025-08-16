const TelegramBot = require('node-telegram-bot-api')
const token = process.env.SUSHI_TELEGRAM_TOKEN

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
  const { name, phone, email, message } = requestBody

  // Форматуємо повідомлення для кращої читабельності
  const messageToSend = `
🔔 *НОВЕ ПОВІДОМЛЕННЯ З САЙТУ*
━━━━━━━━━━━━━━━━━━━━━

👤 *Контактні дані*
▫️ Ім'я: ${name}
▫️ Телефон: ${phone}
▫️ Email: ${email}

📝 *Повідомлення*
${message}

━━━━━━━━━━━━━━━━━━━━━
📅 Дата: ${new Date().toLocaleString('uk-UA')}
`

  try {
    // Відправляємо повідомлення з підтримкою Markdown
    await bot.sendMessage(chatId, messageToSend, { parse_mode: 'Markdown' })
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Повідомлення відправлено' }),
    }
  } catch (error) {
    console.error('Помилка відправки:', error)
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Помилка відправки повідомлення' }),
    }
  }
}
