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

const Sidebar = () => {
  const [menuState, setMenuOpen] = useState({ menuOpen: false })

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
          <Logo>
            <Link className='slidebar-logo' to={`/`}>
              <img src='/img/logosushi.png' alt='logo' />
              <span>Sushi & Rolls</span>
            </Link>
          </Logo>
          <MenuLink>
            <Link
              className='slidebar-logo sparkle u-hover--sparkle'
              to={`/menu`}
            >
              <img src='/img/menuIcon.png' alt='menu' />
              Меню
            </Link>
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
            <Link className='sparkle u-hover--sparkle' to='/'>
              Корзина
              <img
                className='sidebar-shopping-cart-image'
                src='/img/shopping-cart.png'
              />
              {totalQuantity > 0 ? (
                <div className='shopping-cart-count'>{totalQuantity}</div>
              ) : null}
            </Link>
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
              <Link className='menu-item' to='/' onClick={() => closeMenu()}>
                Вибране
              </Link>
              <Link className='menu-item' to='/' onClick={() => closeMenu()}>
                Корзина
              </Link>
              <Link className='menu-item' to='/' onClick={() => closeMenu()}>
                Доставка
              </Link>
            </Menu>
          </SideMenu>
        </ContainerNav>
      </TopNav>
    </>
  )
}

export default Sidebar
