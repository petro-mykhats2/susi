import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Item from './Item'

function SimpleSlider({ products, customKey }) {
  if (!products || products.length === 0) {
    return <div>No products available.</div>
  }
  const slidesToShow = products.length >= 4 ? 4 : products.length

  const settings = {
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    arrows: true,
    className: 'slides',
    dots: true,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 856,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 430,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }
  return (
    <div>
      <Slider {...settings} slidesToShow={slidesToShow}>
        {products.map((product, index) => (
          <Item key={index} orderdata={product} />
        ))}
      </Slider>
    </div>
  )
}

export default SimpleSlider
