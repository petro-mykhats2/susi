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
// import { useDispatch } from 'react-redux'

const Sidebar = ({ isOpen }) => {
  const [menuState, setMenuOpen] = useState({ menuOpen: false })
  const [isCartOpen, setIsCartOpen] = useState(false)

  const favoriteItems = useSelector((state) => state.favorite.favoriteItems)
  const totalFavoriteItems = favoriteItems.length

  const handleToggleCart = () => {
    setIsCartOpen(!isCartOpen)
  }

  const cartItems = useSelector((state) => state.cart.cartItems)
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
          <Logo>
            <Link className='slidebar-logo' to='/'>
              <img src='/img/logosushi.png' alt='logo' />
              <span className='sidebar-title'>Sushi & Rolls</span>
            </Link>
          </Logo>
          <MenuLink>
            <Link to='/menu'>
              <div className='sparkle u-hover--sparkle'>
                <img
                  className='shopping-cart-mob'
                  src='/img/menuIcon.png'
                  alt='menu'
                />
              </div>
            </Link>
            <Link to='/favorite/'>
              <div className='sparkle u-hover--sparkle'>
                <div className='shopping-cart-mob'>
                  <img
                    className='sidebar-shopping-cart-image'
                    src='/img/favorite-white.svg'
                  />
                  {totalFavoriteItems > 0 ? (
                    <div className='shopping-cart-count-mob'>
                      {totalFavoriteItems}
                    </div>
                  ) : null}
                </div>
              </div>
            </Link>
            <div>
              <div
                className='sparkle u-hover--sparkle'
                onClick={handleToggleCart}
              >
                <div className='shopping-cart-mob'>
                  <img
                    className='sidebar-shopping-cart-image'
                    src='/img/shopping-cart.png'
                  />
                  {totalQuantity > 0 ? (
                    <div className='shopping-cart-count-mob'>
                      {totalQuantity}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>

            {/* <div>
              <h1 class='sparkle u-hover--sparkle'>Sparkle Hover</h1>
            </div> */}
          </MenuLink>
          <NavItems>
            <Link className='sparkle u-hover--sparkle' to='/'>
              Головна
            </Link>
            <Link className='sparkle u-hover--sparkle' to='/contacts/'>
              Контакти
            </Link>
            <Link className='sparkle u-hover--sparkle' to='/'>
              Доставка
            </Link>
            <Link className='sparkle u-hover--sparkle' to='/'>
              Акції
            </Link>
            <Link className='sparkle u-hover--sparkle' to='/favorite/'>
              <img
                className='sidebar-shopping-cart-image'
                src='/img/favorite-white.svg'
              />
              {totalFavoriteItems > 0 ? (
                <div className='shopping-cart-count'>{totalFavoriteItems}</div>
              ) : null}
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
                Головна
              </Link>
              <Link
                className='menu-item'
                to='/contacts/'
                onClick={() => closeMenu()}
              >
                Контакти
              </Link>
              <Link
                className='menu-item'
                to='/favorite/'
                onClick={() => closeMenu()}
              >
                {totalFavoriteItems > 0 ? (
                  <div className='shopping-cart-count'>
                    {totalFavoriteItems}
                  </div>
                ) : null}
              </Link>
              {/* <Link className='menu-item' to='/' onClick={() => closeMenu()}>
                Корзина
              </Link> */}
              <Link className='menu-item' to='/' onClick={() => closeMenu()}>
                Доставка
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
