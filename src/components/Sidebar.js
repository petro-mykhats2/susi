import React, { useState } from 'react'
import { Link } from 'gatsby'
import { slide as Menu } from 'react-burger-menu'
import {
  TopNav,
  ContainerNav,
  Logo,
  MenuLink,
  NavItems,
  SideMenu,
} from './SidebarStyles'
import { useSelector } from 'react-redux'
import CartSlider from './CartSlider'
import LanguageSwitcher from './LanguageSwitcher'

import { Trans, useTranslation } from 'gatsby-plugin-react-i18next'

const Sidebar = ({ isOpen }) => {
  const { t } = useTranslation()

  const [menuState, setMenuOpen] = useState({ menuOpen: false })
  const [isCartOpen, setIsCartOpen] = useState(false)

  const handleToggleCart = () => {
    setIsCartOpen(!isCartOpen)
  }

  const cartItems = useSelector((state) => state.cart.cartItems)
  console.log('cartItems', cartItems)
  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  )

  const closeMenu = () => {
    setMenuOpen({ menuOpen: false })
  }

  return (
    <>
      <TopNav className='sticky-top'>
        <ContainerNav className='container'>
          <span>
            <LanguageSwitcher />
          </span>
          <Logo>
            <Link className='slidebar-logo' to={`/`}>
              <img src='/img/logosushi.png' alt='logo' />
              <span className='sidebar-title'>Sushi & Rolls</span>
            </Link>
          </Logo>
          <MenuLink>
            <Link
              className='slidebar-logo sparkle u-hover--sparkle'
              to={`/menu`}
            >
              <img src='/img/menuIcon.png' alt='menu' />
              {t('menu')}
            </Link>
            <span
              className='sparkle u-hover--sparkle'
              onClick={handleToggleCart}
            >
              <span className='shopping-cart-mob'>
                <img
                  className='sidebar-shopping-cart-image'
                  src='/img/shopping-cart.png'
                />
                {totalQuantity > 0 ? (
                  <div className='shopping-cart-count-mob'>{totalQuantity}</div>
                ) : null}
              </span>
            </span>

            {/* <div>
              <h1 class='sparkle u-hover--sparkle'>Sparkle Hover</h1>
            </div> */}
          </MenuLink>
          <NavItems>
            <Link className='sparkle u-hover--sparkle' to='/'>
              {t('homepage')}
            </Link>
            <Link className='sparkle u-hover--sparkle' to='/contacts/'>
              {t('contacts')}
            </Link>
            <Link className='sparkle u-hover--sparkle' to='/'>
              {t('delivery')}
            </Link>

            <span
              onClick={handleToggleCart}
              className='sparkle u-hover--sparkle'
            >
              {/* Корзина */}
              <img
                className='sidebar-shopping-cart-image'
                src='/img/shopping-cart.png'
              />
              {totalQuantity > 0 ? (
                <div className='shopping-cart-count'>{totalQuantity}</div>
              ) : null}
            </span>
          </NavItems>

          <SideMenu>
            <Menu right={true} isOpen={menuState.menuOpen}>
              <Link className='menu-item' to='/' onClick={() => closeMenu()}>
                {t('homepage')}
              </Link>
              <Link
                className='menu-item'
                to='/contacts/'
                onClick={() => closeMenu()}
              >
                {t('contacts')}
              </Link>
              <Link className='menu-item' to='/' onClick={() => closeMenu()}>
                {t('favorites')}
              </Link>
              {/* <Link className='menu-item' to='/' onClick={() => closeMenu()}>
                Корзина
              </Link> */}
              <Link className='menu-item' to='/' onClick={() => closeMenu()}>
                {t('delivery')}
              </Link>
            </Menu>
          </SideMenu>
        </ContainerNav>
      </TopNav>
      <CartSlider isOpen={isCartOpen} onClose={handleToggleCart} />
    </>
  )
}

export default Sidebar

// import { Link, useI18next } from 'gatsby-plugin-react-i18next'
// import React from 'react'

// const Sidebar = ({ siteTitle }) => {
//   const { languages, originalPath } = useI18next()
//   return (
//     <header className='main-header'>
//       <h1 style={{ margin: 0 }}>
//         <Link
//           to='/'
//           style={{
//             color: `black`,
//             textDecoration: `none`,
//           }}
//         >
//           {siteTitle}
//         </Link>
//       </h1>
//       <ul className='languages'>
//         {languages.map((lng) => (
//           <li key={lng}>
//             <Link to={originalPath} language={lng}>
//               {lng}
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </header>
//   )
// }
// export default Sidebar
