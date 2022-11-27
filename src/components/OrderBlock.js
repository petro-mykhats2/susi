import React from 'react'
import SimpleSlider from './Slick'
// import Item from './Item'

function OrderBlock({ data }) {
  // const orders = data.allMarkdownRemark.edges
  console.log('datakkkkkkkk', data)
  return (
    <div className='order_block'>
      <div className='slick'>
        <SimpleSlider dataitem={data} />
      </div>
      {/* {orders.map((order) => {
        return <Item key={order.node.id} orderdata={order.node} />
      })} */}
    </div>
  )
}

export default OrderBlock
