import {} from '@mui/icons-material'
import {
  Box,
  MenuItem,
  TextField,
  Container,
  Grid,
  Stack,
  Button,
  CardActions,
  FormControl,
  NativeSelect,
} from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import { getListCinema, getMovieShowTimesAPI } from '../../../apis/cinemaAPI'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'
import classes from './styles.module.css'
import { getListMovieAPI } from '../../../apis/movieAPI'

const Cinema = ({ movieId }) => {
  const { data = [], isLoading } = useQuery({
    queryKey: ['hometool', movieId],
    queryFn: getListMovieAPI,
  })

  const navigate = useNavigate()
  const [film, setFilm] = useState('')
  const [cinema, setCinema] = useState('')
  const [date, setDate] = useState('')
  const [cinemaByMovie, setCinemaByMovie] = useState(null)

  const handleChangeFilm = (event) => {
    setFilm(event.target.value)
    setCinema('')
    setDate('')
    getMovieShowTimesAPI(event.target.value)
      .then((result) => {
        console.log('result: ', result)
        setCinemaByMovie(result.heThongRapChieu)
        console.log('event.target.value: ', event.target.value)
      })
      .catch((error) => {
        setCinemaByMovie(error)
      })
  }

  const handleChangeCinema = (event) => {
    setDate('')
    setCinema(event.target.value)
  }
  const handleChangeDate = (event) => {
    setDate(event.target.value)
  }
  const handleMuaVe = () => {
    if (film === '') {
      Swal.fire({
        title: 'Bạn chưa chọn phim',
        text: 'Vui lòng chọn phim',
        confirmButtonText: 'Đã hiểu',
        confirmButtonColor: '#1976d2',
      })
    } else if (cinema === '') {
      Swal.fire({
        title: 'Bạn chưa chọn rạp',
        text: 'Vui lòng chọn rạp',
        confirmButtonText: 'Đã hiểu',
        confirmButtonColor: '#1976d2',
      })
    } else if (date === '') {
      Swal.fire({
        title: 'Bạn chưa chọn ngày giờ chiếu',
        text: 'Vui lòng chọn ngày giờ chiếu',
        confirmButtonText: 'Đã hiểu',
        confirmButtonColor: '#1976d2',
      })
    } else {
      navigate(`/purchase/${date}`)
    }
  }
  const renderFilm = (arr) => {
    return arr.map((item) => {
      return (
        <option key={item.maPhim} value={item.maPhim}>
          {item.tenPhim}
        </option>
      )
    })
  }
  const renderCinema = (arr) => {
    return arr.map((item) => {
      return item.cumRapChieu.map((childItem, childIndex) => {
        return (
          <option key={childItem.maCumRap} value={childItem.maCumRap}>
            {childItem.tenCumRap}
          </option>
        )
      })
    })
  }
  const renderDate = (arr) => {
    return arr.map((item) => {
      return item?.cumRapChieu?.map((childItem, childIndex) => {
        if (childItem.maCumRap === cinema) {
          return childItem.lichChieuPhim.map((data) => {
            return (
              <option key={data.maLichChieu} value={data.maLichChieu}>
                {moment(data.ngayChieuGioChieu).format('DD/MM/YYYY ~ HH:mm')}
              </option>
            )
          })
        }
        return null
      })
    })
  }

  return (
    <Container maxWidth="md" className={classes.root}>
      <Grid container className={classes.homeToolContainer}>
        <Grid item xs={4} className={classes.gridItem}>
          <div className={classes.selectFilm}>
            <FormControl className={classes.formControl}>
              <NativeSelect
                value={film}
                name="film"
                onChange={handleChangeFilm}
                className={classes.nativeSelect}
              >
                <option value="" disabled>
                  Phim
                </option>
                {data && renderFilm(data)}
              </NativeSelect>
            </FormControl>
          </div>
        </Grid>
        <Grid item xs={3}>
          <div className={classes.selectCinema}>
            <FormControl className={classes.formControl}>
              <NativeSelect
                value={cinema}
                name="cinema"
                onChange={handleChangeCinema}
                className={classes.nativeSelect}
              >
                <option value="" disabled>
                  Rạp
                </option>
                {cinemaByMovie && renderCinema(cinemaByMovie)}
              </NativeSelect>
            </FormControl>
          </div>
        </Grid>
        <Grid item xs={3}>
          <div className={classes.selectDate}>
            <FormControl className={classes.formControl}>
              <NativeSelect
                value={date}
                name="date"
                onChange={handleChangeDate}
                className={classes.nativeSelect}
              >
                <option value="" disabled>
                  Ngày giờ chiếu
                </option>
                {cinemaByMovie && cinema && renderDate(cinemaByMovie)}
              </NativeSelect>
            </FormControl>
          </div>
        </Grid>
        <Grid item xs={2}>
          <div className={classes.buyContainer}>
            <FormControl className={classes.formControl}>
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
                onClick={handleMuaVe}
              >
                MUA VÉ NGAY
              </Button>
            </FormControl>
          </div>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Cinema
