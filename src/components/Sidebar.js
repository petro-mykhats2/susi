import React, { useState } from 'react'
import { Link } from 'gatsby'
import { slide as Menu } from 'react-burger-menu'
import styled from '@emotion/styled'

export default () => {
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

const TopNav = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: #000000;
  overflow: hidden;
  position: fixed;
  top: 100px;
  right: 0;
  left: 0;
  z-index: 1101;
  top: 0;
  width: 100%;
  height: 80px;
`

const ContainerNav = styled.div`
  // background-color: #f792a4;
  display: flex;
  flex-direction: row;
  justify-content: start;

  @media (min-width: 375px) {
    justify-content: space-between;
  }
`

const Logo = styled.div`
  padding: 0em 0em 0 0em;
  img {
    height: 100%;
  }
  span {
    padding-left: 5px;
    color: #fff;
    font-size: 14px;
  }

  @media (min-width: 768px) {
    padding: 1em 1em 0 1em;
    span {
      padding-left: 10px;
      font-size: 34px;
    }
  }
`
const MenuLink = styled.div`
font-size: 10px;
  padding: 3em 1em 0 2em;
  color: #fff;
  img {
    width: 15px;
    height: 15px;
  }
  @media (min-width: 375px) {
    padding: 2em 1em 0 1em;
    font-size: 16px;
  img {
    width: 25px;
    height: 25px;
  }
`

const NavItems = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-end;
  margin-top: 1em;
  a {
    color: #888;
    text-align: center;
    padding: 1em;
    text-decoration: none;
    font-size: 1em;
    &:hover {
      color: #333;
    }
  }
  @media (max-width: 768px) {
    display: none;
  }
`

const SideMenu = styled.div`
  /* Individual item */
  .bm-item {
    display: inline-block;
    /* Our sidebar item styling */
    text-decoration: none;
    margin-bottom: 10px;
    color: #d1d1d1;
    transition: color 0.2s;
  }
  /* Change color on hover */
  .bm-item:hover {
    color: white;
  }
  /* The rest copied directly from react-burger-menu docs */
  /* Position and sizing of burger button */
  .bm-burger-button {
    position: fixed;
    width: 24px;
    height: 24px;
    right: 24px;
    top: 24px;
  }
  /* Color/shape of burger icon bars */
  .bm-burger-bars {
    background: #373a47;
  }
  /* Position and sizing of clickable cross button */
  .bm-cross-button {
    height: 24px;
    width: 24px;
  }
  /* Color/shape of close button cross */
  .bm-cross {
    background: #bdc3c7;
  }
  /* General sidebar styles */
  .bm-menu {
    background: #373a47;
    padding: 2.5em 1.5em 0;
    font-size: 1.15em;
  }
  /* Morph shape necessary with bubble or elastic */
  .bm-morph-shape {
    fill: #373a47;
  }
  /* Wrapper for item list */
  .bm-item-list {
    color: #b8b7ad;
  }
  /* Styling of overlay */
  .bm-overlay {
    background: rgba(0, 0, 0, 0.3);
  }
  @media (min-width: 768px) {
    display: none;
  }
`
