import React from 'react'
import { useState, useEffect } from 'react'
import { X, Camera, Clock, Gift, Truck } from 'lucide-react'

export default function PromotionsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [hoveredButton, setHoveredButton] = useState(null)
  const [isMobile, setIsMobile] = useState(false)
  const [activePromotion, setActivePromotion] = useState(null)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const promotions = [
    {
      id: '1',
      title: 'Free Sushi Photo Marathon',
      isActive: true,
      description: 'Share your sushi moments and win prizes',
      icon: Camera,
      image: '/img/kryvetka.png',
      bgColor: 'rgba(255, 0, 0, 0.1)',
    },
    {
      id: '2',
      title: 'Happy Hours Discount',
      isActive: false,
      description: 'Special prices on weekdays 2-5 PM',
      icon: Clock,
      image: '/placeholder.svg?height=100&width=100',
      bgColor: 'rgba(0, 0, 255, 0.1)',
    },
    {
      id: '3',
      title: 'Birthday Special Offer',
      isActive: true,
      description: '20% off on your birthday',
      icon: Gift,
      image: '/placeholder.svg?height=100&width=100',
      bgColor: 'rgba(255, 255, 0, 0.1)',
    },
    {
      id: '4',
      title: 'Free Delivery for Orders Over $50',
      isActive: false,
      description: 'No delivery fee on large orders',
      icon: Truck,
      image: '/placeholder.svg?height=100&width=100',
      bgColor: 'rgba(0, 255, 0, 0.1)',
    },
  ]

  const handleOpenModal = (promo) => {
    if (promo.isActive) {
      setActivePromotion(promo)
      setIsModalOpen(true)
    }
  }

  return (
    <div className='promotions-page'>
      <h1 className='promotions-page__title'>Акції</h1>

      <div className='promotions-page__grid'>
        {promotions.map((promo) => {
          const Icon = promo.icon
          return (
            <button
              key={promo.id}
              onClick={() => handleOpenModal(promo)}
              onMouseEnter={() => setHoveredButton(promo.id)}
              onMouseLeave={() => setHoveredButton(null)}
              disabled={!promo.isActive}
              style={{ backgroundColor: promo.bgColor }}
              className={`promotions-page__button ${
                promo.isActive
                  ? 'promotions-page__button--active'
                  : 'promotions-page__button--disabled'
              } ${
                hoveredButton === promo.id && promo.isActive
                  ? 'promotions-page__button--hovered'
                  : ''
              }`}
            >
              <div className={`promotions-page__card`}>
                {promo.isActive && (
                  <div className='promotions-page__badge'>Active</div>
                )}
                <div className='promotions-page__content'>
                  <div className='promotions-page__header'>
                    <div className='promotions-page__icon'>
                      <Icon
                        className={`promotions-page__icon-img ${
                          promo.isActive
                            ? 'promotions-page__icon-img--active'
                            : 'promotions-page__icon-img--inactive'
                        }`}
                      />
                    </div>
                    <div className='promotions-page__text'>
                      <h3 className='promotions-page__subtitle'>
                        {promo.title}
                      </h3>
                      <p className='promotions-page__description'>
                        {promo.description}
                      </p>
                    </div>
                  </div>
                  <div className='promotions-page__image'>
                    <img
                      src={promo.image || '/placeholder.svg'}
                      alt=''
                      className='promotions-page__image-content'
                    />
                    {!promo.isActive && (
                      <div className='promotions-page__overlay' />
                    )}
                  </div>
                </div>
              </div>
            </button>
          )
        })}
      </div>

      {isModalOpen && activePromotion && (
        <div
          className='promotions-page__modal-overlay'
          onClick={() => setIsModalOpen(false)}
        >
          <div className='promotions-page__modal'>
            <button
              onClick={() => setIsModalOpen(false)}
              className='promotions-page__modal-close'
            >
              <X size={24} />
            </button>
            <h2 className='promotions-page__modal-title'>
              {activePromotion.title}
            </h2>
            <div className='promotions-page__modal-content'>
              {activePromotion.id === '1' && (
                <>
                  <p>
                    Приймайте участь у нашому конкурсі в Instagram! Опублікуйте
                    фото, відео або TikTok, на якому зображені наші суші, та
                    позначте @susi_yulia. Переможців оголошуємо двічі на місяць.
                  </p>
                  <div className='promotions-page__modal-prizes'>
                    <h3>Призи:</h3>
                    <ul>
                      <li>🥇 Запечений рол з сиром та лососем</li>
                      <li>🥈 Рол Філадельфія з лососем</li>
                      <li>🥉 Запечений макі з креветками</li>
                    </ul>
                  </div>
                </>
              )}

              {activePromotion.id === '3' && (
                <>
                  <p>
                    Святкуйте свій день народження з нами! Отримайте знижку 20%
                    на всі товари в честь вашого особливого дня та святковий
                    бонус!
                  </p>
                  <div className='promotions-page__modal-how-it-works'>
                    <h3>Як скористатися:</h3>
                    <ul>
                      <li>🎂 Діє тільки у ваш День народження</li>
                      <li>
                        📄 У магазині: Покажіть документ з датою народження на
                        касі
                      </li>
                      <li>
                        🛒 Онлайн: Введіть дату народження під час оформлення
                        замовлення
                      </li>
                      <li>🎁 Включає святковий бонус-сюрприз!</li>
                    </ul>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
