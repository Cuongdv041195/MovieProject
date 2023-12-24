import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { getBannerAPI } from '../../../apis/movieAPI'
import Slider from 'react-slick'
import { Box, Skeleton } from '@mui/material'

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000, // 3 giây
}
const Banner = () => {
  const {
    data = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['banner'],
    queryFn: getBannerAPI,
  })
  if (isLoading) {
    return (
      <Skeleton variant="rectangular" sx={{ height: 500 }} animation="wave" />
    )
  }
  return (
    <div>
      <Slider {...settings}>
        {data.map((item) => {
          return (
            <Box key={item.maPhim} sx={{ height: 600 }}>
              <img
                src={item.hinhAnh}
                width="100%"
                height="100%"
                style={{ display: 'block' }}
              />
            </Box>
          )
        })}
      </Slider>
    </div>
  )
}

export default Banner
