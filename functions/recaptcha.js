const fetch = require('cross-fetch')

exports.handler = async (event) => {
  try {
    const { name, email, comment, recaptchaToken } = JSON.parse(event.body)

    if (!recaptchaToken) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'reCAPTCHA token is missing' }),
      }
    }

    const secretKey = process.env.RECAPTCHA_SECRET_KEY

    const response = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptchaToken}`
    )

    const data = await response.json()

    if (data.success) {
      console.log('Form data:', { name, email })
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: 'Дякуємо. ми отримаємо ваше повідомлення',
        }),
      }
    } else {
      console.error('reCAPTCHA verification failed:', data['error-codes'])
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: data['error-codes'] || 'reCAPTCHA verification failed',
        }),
      }
    }
  } catch (error) {
    console.error('Error processing form:', error)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message || 'Server error' }),
    }
  }
}
