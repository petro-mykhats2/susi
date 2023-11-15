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

const Sidebar = () => {
  const [menuState, setMenuOpen] = useState({ menuOpen: false })

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
            <Link className='slidebar-logo' to={`/menu`}>
              <img src='/img/menuIcon.png' alt='menu' />
              Меню
            </Link>
          </MenuLink>
          <NavItems>
            <Link to='/'>Головна</Link>
            <Link to='/contacts/'>Контакти</Link>
            <Link to='/'>Доставка</Link>
            <Link to='/'>Акції</Link>
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
