import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getMovieDetailsAPI } from '../../../apis/movieAPI'
import {
  Box,
  Button,
  CardActions,
  CardContent,
  Container,
  Grid,
  Typography,
} from '@mui/material'
import dayjs from 'dayjs'
import { useNavigate } from 'react-router-dom'
import ShowTimes from '../Showtimes/ShowTimes'
import Swal from 'sweetalert2'
const MovieProfile = ({ movieId }) => {
  const { data = {}, isLoading } = useQuery({
    queryKey: ['movie-details', movieId],
    queryFn: () => getMovieDetailsAPI(movieId),
    enabled: !!movieId,
  })
  const navigate = useNavigate()

  const times = dayjs(data.ngayKhoiChieu).format('DD-MM-YYYY')
  return (
    <Container maxWidth="md" style={{ padding: ' 50px 0' }}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Box>{<img src={data.hinhAnh} width={200} />}</Box>
        </Grid>
        <Grid item xs={8}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {data.tenPhim}
            </Typography>
            <Typography>Đánh Giá Phim: {data.danhGia}/10</Typography>
            <Typography variant="body2" color="text.secondary">
              {' '}
              Ngày Khởi Chiếu:
              {times}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              size="large"
              variant="contained"
              onClick={() => {
                Swal.fire({
                  icon: 'info',
                  title: 'Xin chọn cụm rạp và giờ chiếu',
                  confirmButtonText: 'Đồng ý',
                  confirmButtonColor: '#1976d2',
                })
              }}
            >
              Mua Vé
            </Button>
          </CardActions>
        </Grid>
      </Grid>
    </Container>
  )
}

export default MovieProfile
