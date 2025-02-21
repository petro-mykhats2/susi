'use client'
import React, { useState } from 'react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import {
  Heart,
  Menu as MenuIcon,
  ShoppingCart,
  UtensilsCrossed,
  Phone,
  Truck,
  Tag,
} from 'lucide-react'
// import styles from './Headerr.module.scss' // Перевірте правильність шляху
// import { Sheet } from '../components/ui/sheet'
// import styles from './SiteHeader.module.scss' // Імпортуємо стилі

export default function SiteHeader() {
  const [activeItem, setActiveItem] = useState('')
  const cartItemsCount = 3

  const menuItems = [
    { name: 'Контакти', icon: <Phone className='h-5 w-5' /> },
    { name: 'Доставка', icon: <Truck className='h-5 w-5' /> },
    { name: 'Акції', icon: <Tag className='h-5 w-5' /> },
  ]

  const mainIcons = [
    { name: 'Меню', icon: <UtensilsCrossed className='h-5 w-5' /> },
    { name: 'Улюблені', icon: <Heart className='h-5 w-5' /> },
  ]

  return (
    <header className={styles['site-header']}>
      <div className={styles['site-header__container']}>
        {/* Logo */}
        <div className={styles['site-header__logo']}>
          <GatsbyImage
            image={getImage('/placeholder.svg')}
            alt='Logo'
            className={styles['site-header__logo__image']}
          />
          <span className={styles['site-header__logo__text']}>Brand Name</span>
        </div>

        {/* Desktop Menu */}
        <nav className={styles['site-header__nav']}>
          {[...mainIcons, ...menuItems].map((item) => (
            <button
              key={item.name}
              className={`${styles['site-header__button']} ${
                activeItem === item.name
                  ? styles['site-header__button--active']
                  : ''
              }`}
              onClick={() => setActiveItem(item.name)}
            >
              <span className={styles['site-header__button__icon']}>
                {item.icon}
              </span>
              <span className={styles['site-header__button__text']}>
                {item.name}
              </span>
            </button>
          ))}
        </nav>

        {/* Mobile Icons */}
        <div className={styles['site-header__mobile-icons']}>
          {mainIcons.map((item) => (
            <button
              key={item.name}
              className={styles['site-header__button']}
              onClick={() => setActiveItem(item.name)}
            >
              <span className={styles['site-header__button__icon']}>
                {item.icon}
              </span>
            </button>
          ))}
        </div>

        {/* Right Section (Cart and Mobile Menu) */}
        <div className={styles['site-header__right-section']}>
          {/* Cart */}
          <div className={styles['site-header__cart']}>
            <button className={styles['site-header__button']}>
              <ShoppingCart className={styles['site-header__button__icon']} />
              {cartItemsCount > 0 && (
                <span className={styles['site-header__cart__count']}>
                  {cartItemsCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className={styles['site-header__mobile-menu-trigger']}>
            <button className={styles['site-header__button']}>
              <MenuIcon className={styles['site-header__button__icon']} />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
