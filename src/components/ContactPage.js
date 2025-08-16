import React from 'react'
import SocialLinks from './SocialLinks'
import PhoneLink from './PhoneLink'
import PickupLocations from './PickupLocations'
import MyForm from './MyForm'

const ContactPage = () => {
  const handleSubmit = async (formData) => {
    try {
      const response = await fetch('/.netlify/functions/contact-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          message: formData.message,
        }),
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      alert('Повідомлення успішно відправлено!')
    } catch (error) {
      console.error('Error:', error)
      alert('Помилка при відправці повідомлення')
    }
  }

  return (
    <div className='contact-page'>
      <div className='contact-page__left-block'>
        <section className='contact-page__info'>
          <h1 className='contact-page__title'>Контакти</h1>
          <div className='contact-page__info-details p1'>
            <PhoneLink />
            <p>
              <strong>Email:</strong>{' '}
              <a href='mailto:info@example.com'>info@example.com</a>
            </p>
            <p>
              <PickupLocations />
            </p>
            <p>
              <strong>Графік роботи:</strong> Пн-Пт, 9:00 - 18:00
            </p>
          </div>

          <div className='contact-page__info-social-media p1'>
            <div className='contact-page__subtitle'>Ми в соцмережах:</div>
            <SocialLinks />
          </div>
        </section>

        <section className='contact-page__form'>
          <MyForm onSubmit={handleSubmit} />
        </section>
      </div>

      <div className='contact-page__map'>
        <h2>Наше місцезнаходження</h2>
        <div className='contact-page__map__wrapper'>
          <iframe
            title='Google Map'
            src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2573.3275112812776!2d24.023447!3d49.837260!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0:0x0!2zNDnCsDUwJzE0LjEiTiAyNMKwMDEnMjQuNCJF!5e0!3m2!1sen!2sua!4v1690000000000!5m2!1sen!2sua'
            width='100%'
            height='450'
            style={{ border: 0 }}
            allowFullScreen=''
            loading='lazy'
            referrerPolicy='origin'
            sandbox='allow-scripts allow-same-origin allow-popups'
          ></iframe>
        </div>
      </div>
    </div>
  )
}

export default ContactPage
