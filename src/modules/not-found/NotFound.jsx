import { Box, Button, CardMedia, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  const navigate = useNavigate()
  return (
    <Box
      style={{
        alignItems: 'center',
        marginTop: '80px',
      }}
    >
      <Typography
        component={'h1'}
        style={{
          fontSize: '40px',
          textAlign: 'center',
          fontWeight: '700',
          color: 'red',
        }}
      >
        404: The page you are looking for isn’t here
      </Typography>
      <Typography
        style={{
          textAlign: 'center',
          fontWeight: '500',
          fontSize: '25px',
        }}
      >
        You either tried some shady route or you came here by mistake. Whichever
        it is, try using the navigation by HOME
      </Typography>
      <CardMedia style={{ textAlign: 'center' }}>
        <img
          style={{ width: '600px', marginTop: '40px' }}
          src="https://img.lovepik.com/photo/45007/5335.jpg_wh860.jpg"
        />
      </CardMedia>

      <Button
        size="large"
        variant="contained"
        style={{ textAlign: 'center', marginLeft: '47%' }}
        onClick={() => {
          navigate(`/`)
        }}
      >
        HOME
      </Button>
    </Box>
  )
}

export default NotFound
