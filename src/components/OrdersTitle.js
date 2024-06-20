import React from 'react'
import { Link, Trans, useTranslation } from 'gatsby-plugin-react-i18next'

function OrdersTitle() {
  const { t } = useTranslation()
  return (
    <div className='orders-title'>
      <img src='/img/shield.png' alt='dark theme' />
      <div className='orders-title_text'>{t('mostChosen')}</div>
    </div>
  )
}

export default OrdersTitle
