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
  } = requestBody

  // Отримання даних про замовника
  const customerInfo = `Ім'я: ${name}\nТелефон: ${phone}\nПовідомлення: ${message}`

  // Отримання даних про доставку
  const deliveryInfo = `Опція доставки: ${deliveryFormData.deliveryOption}\nАдреса для самовивозу: ${deliveryFormData.pickupAddress}`

  // Отримання даних про час доставки
  const timeInfo = `Опція часу доставки: ${timeFormData.deliveryTimeOption}\nНайближча година: ${timeFormData.nextHour}`

  // Отримання даних про аксесуари
  const accessoriesInfo = `Кількість аксесуарів: ${
    accessoriesData.quantity
  }\nНавчальні палочки: ${accessoriesData.educational ? 'Так' : 'Ні'}`

  // Отримання даних про замовлення
  const cartItemsInfo = cartData
    .map(
      (item) =>
        `${item.name} - Кількість: ${item.quantity} - Ціна: ${
          item.price
        } грн - Сума: ${item.price * item.quantity} грн`
    )
    .join('\n')

  // Складання всіх даних в один текстовий рядок
  const messageToSend = `${customerInfo}\n\nДані доставки:\n${deliveryInfo}\n\nДані про час доставки:\n${timeInfo}\n\nДані про аксесуари:\n${accessoriesInfo}\n\nЗамовлення:\n${cartItemsInfo}`

  try {
    // Відправка повідомлення
    await bot.sendMessage(chatId, messageToSend)
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
