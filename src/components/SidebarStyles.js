import styled from '@emotion/styled'

export const TopNav = styled.div`
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

export const ContainerNav = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;

  @media (min-width: 375px) {
    justify-content: start;
  }

  @media (min-width: 460px) {
    justify-content: space-between;
  }
`

export const Logo = styled.div`
  padding: 0em 0em 0 0em;
  img {
    height: 75%;
    padding-top 10px;
    @media (min-width: 375px) {
      height: 100%;
      padding-top 0px;
    }
  }
  span {
    padding-left: 5px;
    color: #fff;
    font-size: 10px;
  }

  @media (min-width: 375px) {
    span {
      padding-left: 10px;
      font-size: 14px;
      color: white;
    }
  }

  @media (min-width: 768px) {
    padding: 1em 1em 0 1em;
    span {
      padding-left: 10px;
      font-size: 34px;
    }
  }
`

export const MenuLink = styled.div`
  font-size: 10px;
  padding: 3em 1em 0 2em;
  color: #fff;
  img {
    width: 15px;
    height: 15px;
  }
  @media (min-width: 460px) {
    padding: 2em 1em 0 1em;
    font-size: 16px;
    img {
      width: 25px;
      height: 25px;
    }
  }
`

export const NavItems = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-end;
  margin-top: 1em;
  height: 50px;
  a {
    color: #fff;
    text-align: center;
    padding: 1em;
    text-decoration: none;
    font-size: 1em;

    &:hover {
      font-weight: 600;
    }
  }
  .sidebar-shopping-cart-image {
    padding-left: 3px;
    width: 19px;
    height: 19px;
  }
  .shopping-cart-count {
    position: absolute;
    top: 3px;
    right: 0px;
    background-color: white;
    color: orange;
    font-size: 16px;
    font-weight: 800;
    padding: 2px 5px;
    border-radius: 50%;
  }

  @media (max-width: 768px) {
    display: none;
  }
`

export const SideMenu = styled.div`
  .bm-item {
    display: inline-block;
    text-decoration: none;
    margin-bottom: 10px;
    color: #d1d1d1;
    transition: color 0.2s;
  }
  .bm-item:hover {
    color: white;
  }
  .bm-burger-button {
    position: fixed;
    width: 24px;
    height: 24px;
    right: 24px;
    top: 27px;
  }
  .bm-burger-bars {
    background: #373a47;
  }
  .bm-cross-button {
    height: 24px;
    width: 24px;
  }
  .bm-cross {
    background: #bdc3c7;
  }
  .bm-menu {
    background: #373a47;
    padding: 2.5em 1.5em 0;
    font-size: 1.15em;
  }
  .bm-morph-shape {
    fill: #373a47;
  }
  .bm-item-list {
    color: #b8b7ad;
  }
  .bm-overlay {
    background: rgba(0, 0, 0, 0.3);
  }
  @media (min-width: 768px) {
    display: none;
  }
`
