import React from 'react'
import Item from './Item'

function OrderBlock({ data }) {
  const orders = data.allMarkdownRemark.edges
  return (
    <div className='order_block'>
      {orders.map((order) => {
        return <Item key={order.node.id} orderdata={order.node} />
      })}
    </div>
  )
}

export default OrderBlock
