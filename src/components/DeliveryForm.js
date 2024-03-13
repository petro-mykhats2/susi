import React, { useEffect, useState } from 'react'

function DeliveryForm({ handleDeliveryFormData, addressError }) {
  const [deliveryOption, setDeliveryOption] = useState('address')
  const [pickupAddress, setPickupAddress] = useState('')
  const [showPickupOptions, setShowPickupOptions] = useState(false)

  const handleAddressChange = (e) => {
    const newAddress = e.target.value
    setPickupAddress(newAddress)
    handleDeliveryFormData({ deliveryOption, pickupAddress: newAddress })
  }

  // Встановлення значень за замовчуванням
  useEffect(() => {
    handleDeliveryFormData({ deliveryOption, pickupAddress })
  }, [])

  const handleOptionChange = (option) => {
    setDeliveryOption(option)
    if (option === 'pickup') {
      setShowPickupOptions(true)
      handleDeliveryFormData({ deliveryOption: option, pickupAddress: '' })
    } else {
      setShowPickupOptions(false)
      setPickupAddress('')
      handleDeliveryFormData({ deliveryOption: option, pickupAddress: '' })
    }
  }

  const handlePickupOptionChange = (address) => {
    setPickupAddress(address)
    setShowPickupOptions(false)
    handleDeliveryFormData({ deliveryOption: 'pickup', pickupAddress: address })
  }

  return (
    <div className='delivery-form'>
      <input
        type='radio'
        id='addressDelivery'
        name='deliveryOption'
        value='address'
        checked={deliveryOption === 'address'}
        onChange={() => handleOptionChange('address')}
      />
      <label htmlFor='addressDelivery'>На адресу</label>

      <input
        type='radio'
        id='pickupDelivery'
        name='deliveryOption'
        value='pickup'
        checked={deliveryOption === 'pickup'}
        onChange={() => handleOptionChange('pickup')}
      />
      <label htmlFor='pickupDelivery'>Самовивіз</label>

      {deliveryOption === 'address' && (
        <div>
          <div
            className={`form-field ${
              !pickupAddress && addressError ? 'error' : ''
            }`}
          >
            <input
              type='text'
              placeholder='Введіть адресу'
              value={pickupAddress}
              onChange={handleAddressChange}
            />
          </div>
          {addressError && !pickupAddress ? (
            <div className='errorMessage'>Заповніть правильно адресу!</div>
          ) : null}
        </div>
      )}

      {deliveryOption === 'pickup' && showPickupOptions && (
        <div className='pickup-options'>
          <p>Оберіть адресу, де хочете забрати замовлення:</p>
          <div className='pickup-options-list'>
            <div onClick={() => handlePickupOptionChange('Адреса 1')}>
              Адреса 1
            </div>
            <div onClick={() => handlePickupOptionChange('Адреса 2')}>
              Адреса 2
            </div>
            <div onClick={() => handlePickupOptionChange('Адреса 3')}>
              Адреса 3
            </div>
          </div>
        </div>
      )}
      {deliveryOption === 'pickup' && (
        <div className='delivery-form-selected'>
          <p>Обрана вами адреса для самовивозу:</p>
          <p className='selected-address'>{pickupAddress}</p>
        </div>
      )}
    </div>
  )
}

export default DeliveryForm
