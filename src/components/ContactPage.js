import React from 'react'
import SocialLinks from './SocialLinks'
import PhoneLink from './PhoneLink'
import PickupLocations from './PickupLocations'

const ContactPage = () => {
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
          <div className='card'>
            <span className='title'>Звяжіться з нами</span>
            <form className='form'>
              <div className='group'>
                <input type='text' name='name' placeholder='‎' required />
                <label htmlFor='name'>Імя</label>
              </div>
              <div className='group'>
                <input
                  type='email'
                  id='email'
                  name='email'
                  placeholder='‎'
                  required
                />
                <label htmlFor='email'>Email</label>
              </div>
              <div className='group'>
                <textarea
                  id='comment'
                  name='comment'
                  placeholder='‎'
                  rows='5'
                  required
                />
                <label htmlFor='comment'>Напишіть текст</label>
              </div>
              <button type='submit'>Відправити</button>
            </form>
          </div>
        </section>
      </div>

      <div className='contact-page__map'>
        <h2>Наше місцезнаходження</h2>
        <div className='contact-page__map__wrapper'>
          <iframe
            title='Google Map'
            src='https://www.google.com/maps/embed?pb=...your-map-link...'
            allowFullScreen=''
            loading='lazy'
          ></iframe>
        </div>
      </div>
    </div>
  )
}

export default ContactPage
