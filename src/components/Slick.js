import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Item from './Item'

function SimpleSlider({ dataitem }) {
  const orders = dataitem.allMarkdownRemark.edges

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    className: 'slides',

    // mobileFirst: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ],
  }
  return (
    <div>
      <h2> Single Item</h2>

      <Slider {...settings}>
        {orders.map((order) => {
          return <Item key={order.node.id} orderdata={order.node} />
        })}
      </Slider>
    </div>
  )
}

export default SimpleSlider
