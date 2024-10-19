import React from 'react'
import SocialLinks from './SocialLinks'
import PhoneLink from './PhoneLink'

const ContactPage = () => {
  return (
    <div className='contact-page'>
      {/* 1. Заголовок та основна контактна інформація */}
      <div className='contact-page__left-block'>
        <section className='contact-page__info'>
          <h1 className='contact-page__title'>Контакти</h1>
          <div className='contact-page__info-details p1'>
            <PhoneLink />
            <p>
              <strong>Email:</strong> info@example.com
            </p>
            <p>
              <strong>Адреса:</strong> Київ, вул. Незалежності, 1
            </p>
            <p>
              <strong>Графік роботи:</strong> Пн-Пт, 9:00 - 18:00
            </p>
          </div>

          {/* Додаткові методи зв'язку */}
          <div className='contact-page__info-social-media'>
            {/* <h2 className='contact-page__subtitle'>Ми в соцмережах:</h2>
            <a
              href='https://facebook.com'
              target='_blank'
              rel='noopener noreferrer'
            >
              Facebook
            </a>
            <a
              href='https://instagram.com'
              target='_blank'
              rel='noopener noreferrer'
            >
              Instagram
            </a>
            <a
              href='https://t.me/example'
              target='_blank'
              rel='noopener noreferrer'
            >
              Telegram
            </a>
          </div> */}
            <SocialLinks />
          </div>
        </section>

        {/* 2. Форма зворотного зв'язку */}
        <section className='contact-page__form'>
          {/* <h2 className='contact-page__subtitle'>Зв'язатися з нами</h2>
          <form>
            <div className='contact-page__form-group'>
              <label htmlFor='name'>Ім'я</label>
              <input type='text' id='name' name='name' />
            </div>
            <div className='contact-page__form-group'>
              <label htmlFor='email'>Email</label>
              <input type='email' id='email' name='email' />
            </div>
            <div className='contact-page__form-group'>
              <label htmlFor='subject'>Тема запиту</label>
              <input type='text' id='subject' name='subject' />
            </div>
            <div className='contact-page__form-group'>
              <label htmlFor='message'>Повідомлення</label>
              <textarea id='message' name='message'></textarea>
            </div>
            <button type='submit' className='contact-page__form-button'>
              Надіслати
            </button>
          </form> */}
          <div className='card'>
            <span className='title'>Звяжіться з нами</span>
            <form className='form'>
              <div className='group'>
                <input
                  type='text'
                  name='name'
                  //   value={formData.name}
                  //   onChange={handleChange}
                  placeholder='‎'
                  required
                />
                <label htmlFor='name'>Імя</label>
              </div>
              <div className='group'>
                <input
                  type='email'
                  id='email'
                  name='email'
                  //   value={formData.email}
                  //   onChange={handleChange}
                  placeholder='‎'
                  required
                />
                <label htmlFor='email'>Email</label>
              </div>
              <div className='group'>
                <textarea
                  id='comment'
                  name='comment'
                  //   value={formData.comment}
                  //   onChange={handleChange}
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

      {/* 3. Карта з місцем розташування */}
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

      {/* 4. FAQ (закоментовано, але можна використовувати при потребі)
      <div className='contact-page__faq'>
        <h2 className='contact-page__subtitle'>Часті питання</h2>
        <div className='contact-page__faq-item'>
          <h3>Як дістатися до вашого офісу?</h3>
          <p>Наш офіс знаходиться в центрі міста, біля станції метро "Хрещатик".</p>
        </div>
        <div className='contact-page__faq-item'>
          <h3>Чи можна повернути товар?</h3>
          <p>Так, повернення товару можливе протягом 14 днів з моменту покупки.</p>
        </div>
      </div> */}

      {/* 5. Політика конфіденційності (закоментовано, але можна використовувати при потребі)
      <section className='contact-page__policy'>
        <h2 className='contact-page__subtitle'>Політика конфіденційності</h2>
        <p>
          Натискаючи кнопку "Надіслати", ви погоджуєтесь з нашими умовами
          обробки персональних даних. Деталі можна знайти в нашій{' '}
          <a href='/privacy-policy'>Політиці конфіденційності</a>.
        </p>
      </section> */}
    </div>
  )
}

export default ContactPage
