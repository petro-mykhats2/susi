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
  const {
    name,
    phone,
    message,
    deliveryFormData,
    timeFormData,
    accessoriesData,
    cartData,
    totalPriceWithDiscount,
    promoCodeDiscount,
  } = requestBody

  // Розрахунок загальної суми без знижки
  const totalPrice = cartData.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )

  // Формування повідомлення в більш читабельному форматі
  const messageToSend = `
🛍️ *НОВЕ ЗАМОВЛЕННЯ*

👤 *Інформація про замовника:*
• Ім'я: ${name}
• Телефон: ${phone}
${message ? `• Коментар: ${message}` : ''}

📦 *Доставка:*
• Тип: ${deliveryFormData.deliveryOption}
• Адреса: ${deliveryFormData.pickupAddress}

⏰ *Час доставки:*
• Опція: ${timeFormData.deliveryTimeOption}
• Час: ${timeFormData.nextHour}

🥢 *Додатково:*
• Кількість наборів: ${accessoriesData.quantity}
• Навчальні палички: ${accessoriesData.educational ? '✅' : '❌'}

🍱 *Замовлені страви:*
${cartData
  .map(
    (item) =>
      `• ${item.name}
   Кількість: ${item.quantity} шт.
   Ціна: ${item.price} грн
   Сума: ${(item.price * item.quantity).toFixed(2)} грн`
  )
  .join('\n\n')}

💰 *Підсумок:*
• Сума замовлення: ${totalPrice.toFixed(2)} грн
${
  promoCodeDiscount > 0
    ? `• Знижка: ${promoCodeDiscount}%
• Сума зі знижкою: ${totalPriceWithDiscount.toFixed(2)} грн`
    : ''
}
`

  try {
    // Відправка повідомлення з форматуванням Markdown
    await bot.sendMessage(chatId, messageToSend, { parse_mode: 'Markdown' })
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Повідомлення відправлено' }),
    }
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Помилка відправки повідомлення' }),
    }
  }
}
