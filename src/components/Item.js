import React from 'react'

const Item = ({ orderdata }) => {
  return (
    <div>
      <span>{orderdata.title + '   '}</span>
      <span>{orderdata.parameters + '   '}</span>
      <span>{orderdata.price}</span>
    </div>
  )
}
export default Item
