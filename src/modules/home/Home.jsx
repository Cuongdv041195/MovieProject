import React from 'react'
import Banner from './Banner'
import Cinema from './Cinema'
import Showing from './Showing'
import ListCinema from './ListCinema'
import { useParams } from 'react-router-dom'

const Home = () => {
  const { id } = useParams()
  return (
    <div style={{ position: 'relative' }}>
      <Banner />
      <Cinema />
      <Showing />
      <ListCinema id={id} />
    </div>
  )
}

export default Home
