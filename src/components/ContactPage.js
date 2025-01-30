import React from 'react'
import SocialLinks from './SocialLinks'
import PhoneLink from './PhoneLink'
import PickupLocations from './PickupLocations'
import MyForm from './MyForm'

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
          <MyForm />
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
