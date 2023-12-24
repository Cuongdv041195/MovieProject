import React from 'react'
import { getListMovieAPI } from '../../../apis/movieAPI'
import { useQuery } from '@tanstack/react-query'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Container,
  Pagination,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'

const Showing = () => {
  const navigate = useNavigate()
  const {
    data = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['list-movie'],
    queryFn: getListMovieAPI,
  })

  // console.log('data: ', data)
  return (
    <Container
      maxWidth="lg"
      style={{ paddingTop: '70px', marginBottom: '30px' }}
    >
      <Grid container spacing={4}>
        {/* row */}
        {data.map((item) => (
          <Grid item xs={3} key={item.maPhim}>
            {/* col */}
            <Card>
              <CardMedia
                sx={{ height: 350, width: '100%' }}
                image={item.hinhAnh}
                title="green iguana"
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  className="truncate"
                >
                  {item.tenPhim}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  className="truncate "
                >
                  {item.moTa}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="large"
                  variant="contained"
                  fullWidth
                  onClick={() => {
                    navigate(`movie/${item.maPhim}`)
                  }}
                >
                  Xem chi tiết
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default Showing
