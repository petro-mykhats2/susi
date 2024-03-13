import React, { useState } from 'react'

const Accessories = ({ onChange }) => {
  const [quantity, setQuantity] = useState(2)
  const [educational, setEducational] = useState(false)

  const incrementQuantity = () => {
    if (quantity < 9) {
      setQuantity(quantity + 1)
      onChange({ quantity: quantity + 1, educational })
    }
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
      onChange({ quantity: quantity - 1, educational })
    }
  }

  const handleManualInput = (e) => {
    const inputQuantity = parseInt(e.target.value)
    if (!isNaN(inputQuantity)) {
      setQuantity(inputQuantity)
      onChange({ quantity: inputQuantity, educational })
    }
  }

  const handleEducationalChange = (e) => {
    setEducational(e.target.checked)
    onChange({ quantity, educational: e.target.checked })
  }

  return (
    <div className='accessories-container'>
      <span>Кількість комплектів палочок</span>
      <div className='quantity-control'>
        <button
          className='control-button minus'
          onClick={(e) => {
            decrementQuantity(e)
            e.preventDefault()
          }}
        ></button>
        <input
          type='text'
          value={quantity}
          onChange={(e) => {
            handleManualInput(e)
            e.preventDefault()
          }}
          className='quantity-input'
        />
        <button
          className='control-button'
          onClick={(e) => {
            incrementQuantity(e)
            e.preventDefault()
          }}
        ></button>
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
