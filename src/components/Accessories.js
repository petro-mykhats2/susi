import React, { useState } from 'react'

const Accessories = () => {
  const [quantity, setQuantity] = useState(2)
  const [educational, setEducational] = useState(false)

  const incrementQuantity = () => {
    if (quantity < 9) {
      setQuantity(quantity + 1)
    }
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const handleManualInput = (e) => {
    const inputQuantity = parseInt(e.target.value)
    if (!isNaN(inputQuantity)) {
      setQuantity(inputQuantity)
    }
  }

  const handleEducationalChange = (e) => {
    setEducational(e.target.checked)
  }

  return (
    <div className='accessories-container'>
      <span>Кількість комплектів палочок</span>
      <div className='quantity-control'>
        <button
          className='control-button minus'
          onClick={decrementQuantity}
        ></button>
        <input
          type='text'
          value={quantity}
          onChange={handleManualInput}
          className='quantity-input'
        />
        <button className='control-button' onClick={incrementQuantity}></button>
        <div className='educational-checkbox'>
          <input
            type='checkbox'
            id='educational'
            checked={educational}
            onChange={handleEducationalChange}
          />
          <label htmlFor='educational'>Навчальні</label>
        </div>
      </div>
    </div>
  )
}

export default Accessories
