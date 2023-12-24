import { Box, Button, Divider, Grid, Skeleton, Typography } from '@mui/material'
import { useMutation, useQuery } from '@tanstack/react-query'
import React, { Fragment, useEffect, useState } from 'react'
import { actBookTicket, getMovieBookingApi } from '../../apis/booking'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { PATH } from '../../routes/path'
import classes from './styles.module.css'
import { CURRENT_USER } from '../../constants'
import Swal from 'sweetalert2'

const Booking = () => {
  const movieShowtimes = useSelector((state) => state.movieShowtimesReducer)

  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { showTimesID } = useParams()

  const { data = [], isLoading } = useQuery({
    queryKey: ['booking', showTimesID],
    queryFn: () => getMovieBookingApi(showTimesID),
    enabled: !!showTimesID,
  })
  const [dataGhe, setDataGhe] = useState()
  useEffect(() => {
    setLoading(true)
    getMovieBookingApi(showTimesID).then((res) => {
      setDataGhe(res)
      setLoading(false)
      movieShowtimes.bookingChairList = []
    })
  }, [showTimesID])

  if (isLoading) {
    return <Skeleton variant="rectangular" sx={{ height: 500 }} />
  }

  const renderMovieChair = (data) => {
    return data.danhSachGhe?.map((chair, index) => {
      let indexChair = movieShowtimes.bookingChairList.findIndex(
        (choseChair) => choseChair.maGhe === chair.maGhe
      )
      let classBookedChair = chair.daDat ? classes.bookedChair : null
      let classVipChair = chair.loaiGhe === 'Vip' ? classes.vipChair : null
      let classChoosingChair = ''
      if (indexChair !== -1) {
        classChoosingChair = '#1976d2 '
      }

      return (
        <Fragment key={chair.maGhe}>
          <Button
            disabled={chair.daDat}
            className={`${classes.chair} ${classBookedChair} ${classVipChair}`}
            style={{
              backgroundColor: `${classChoosingChair} `,
            }}
            onClick={() => {
              dispatch({
                type: 'CHOOSE_CHAIR',
                payload: chair,
              })
            }}
          >
            {chair.daDat ? 'X' : chair.stt}
          </Button>
          {/* {(index + 1) % 16 === 0 ? renderChairRow(num) : ""} */}
          {(index + 1) % 16 === 0 ? <br /> : ''}
        </Fragment>
      )
    })
  }
  return (
    <div className={classes.root}>
      <Grid container className={classes.background}>
        <Grid item xs={8}>
          <div className={classes.chairContainer}>
            <Grid className={classes.screen}>SCREEN</Grid>
            <div style={{ width: '79.9%', margin: '0 auto' }}>
              {loading ? (
                <>
                  <Skeleton
                    variant="rectangular"
                    sx={{ height: 30 }}
                    animation="wave"
                  />
                  <Skeleton
                    variant="rectangular"
                    sx={{ height: 30 }}
                    animation="wave"
                    style={{ margin: '30px 0' }}
                  />
                  <Skeleton
                    variant="rectangular"
                    sx={{ height: 30 }}
                    animation="wave"
                  />
                </>
              ) : dataGhe ? (
                renderMovieChair(dataGhe)
              ) : null}
            </div>
            <div className={classes.demoChairContainer}>
              <div className={classes.demoChairGroup}>
                <Button
                  disabled={true}
                  className={`${classes.chair} ${classes.bookedChair} ${classes.demoChair}`}
                >
                  X
                </Button>
                <Typography>Đã đặt</Typography>
              </div>
              <div className={classes.demoChairGroup}>
                <Button
                  disabled={true}
                  className={`${classes.chair} ${classes.demoChair}`}
                ></Button>
                <Typography>Thường</Typography>
              </div>
              <div className={classes.demoChairGroup}>
                <Button
                  disabled={true}
                  className={`${classes.chair} ${classes.vipChair} ${classes.demoChair}`}
                ></Button>

                <Typography>Vip</Typography>
              </div>
            </div>
          </div>
        </Grid>
        {data ? (
          <Grid item xs={4}>
            <div className={classes.datveBox}>
              <div className={classes.sectionSpacing}>
                <Typography
                  style={{
                    color: '#8bc34a',
                    fontSize: '35px',
                    textAlign: 'center',
                  }}
                >
                  {movieShowtimes.bookingChairList.reduce(
                    (tongTien, gheDD, index) => {
                      return (tongTien += gheDD.giaVe)
                    },
                    0
                  )}
                  VND
                </Typography>
              </div>
              <Divider variant="middle" />
              <Box className={`${classes.sectionSpacing} ${classes.flexInfo}`}>
                <Typography variant="h3">Cụm Rạp:</Typography>
                <Typography variant="h3" className={classes.spanInfo}>
                  {data?.thongTinPhim?.tenCumRap}
                </Typography>
              </Box>
              <Divider variant="middle" />
              <div className={`${classes.sectionSpacing} ${classes.flexInfo}`}>
                <Typography variant="h3">Địa chỉ:</Typography>
                <Typography
                  variant="h3"
                  className={`${classes.spanInfo} ${classes.textElipsis}`}
                >
                  {data?.thongTinPhim?.diaChi}
                </Typography>
              </div>
              <Divider variant="middle" />
              <div className={`${classes.sectionSpacing} ${classes.flexInfo}`}>
                <Typography variant="h3">Rạp:</Typography>
                <Typography variant="h3" className={classes.spanInfo}>
                  {data?.thongTinPhim?.tenRap}
                </Typography>
              </div>
              <Divider variant="middle" />
              <div className={`${classes.sectionSpacing} ${classes.flexInfo}`}>
                <Typography variant="h3">Ngày giờ chiếu:</Typography>
                <Typography variant="h3" className={classes.spanInfo}>
                  {data?.thongTinPhim?.ngayChieu} -
                  <span style={{ color: '#1976d2' }}>
                    {data?.thongTinPhim?.gioChieu}
                  </span>
                </Typography>
              </div>
              <Divider variant="middle" />
              <div className={`${classes.sectionSpacing} ${classes.flexInfo}`}>
                <Typography variant="h3">Tên Phim:</Typography>
                <Typography variant="h3" className={classes.spanInfo}>
                  {data?.thongTinPhim?.tenPhim}
                </Typography>
              </div>
              <Divider variant="middle" />
              <div className={`${classes.sectionSpacing} ${classes.flexInfo}`}>
                <Typography variant="h3">Chọn: </Typography>
                <Typography variant="h3" className={classes.spanInfo}>
                  {movieShowtimes.bookingChairList.map((bookChair, index) => {
                    return (
                      <span style={{ fontWeight: '700' }}>
                        Ghế {bookChair.stt},{' '}
                      </span>
                    )
                  })}
                </Typography>
              </div>
              <Divider variant="middle" />
              <Button
                onClick={() => {
                  if (!localStorage?.getItem(CURRENT_USER)) {
                    Swal.fire({
                      icon: 'error',
                      title: 'Bạn chưa đăng nhập',
                      text: 'Bạn có muốn đăng nhập không ?',
                      confirmButtonText: 'Đồng ý',
                      confirmButtonColor: '#1976d2',
                      showDenyButton: true,
                      denyButtonText: 'Không',
                    }).then((result) => {
                      if (result.isConfirmed) {
                        // history.push('/sign-in')
                        navigate(PATH.SIGN_IN)
                      }
                    })
                    return
                  }
                  if (movieShowtimes.bookingChairList.length === 0) {
                    Swal.fire({
                      icon: 'error',
                      title: 'Bạn chưa chọn ghế',
                      text: 'Vui lòng chọn ghế ?',
                      confirmButtonText: 'Đã hiểu',
                      confirmButtonColor: '#1976d2',
                    })
                    return
                  }
                  // let userLogin = JSON.parse(localStorage.getItem(CURRENT_USER))
                  let objectAPI = {
                    maLichChieu: showTimesID,
                    danhSachVe: movieShowtimes?.bookingChairList,
                    // taiKhoanNguoiDat: userLogin.taiKhoan,
                  }
                  // console.log(objectAPI);
                  const action = actBookTicket(objectAPI)

                  Swal.fire({
                    icon: 'warning',
                    title: 'Xác Nhận Thanh Toán',
                    text: 'Kiểm tra danh sách vé đặt',
                    confirmButtonText: 'Đồng ý',
                    confirmButtonColor: '#1976d2',
                    showDenyButton: true,
                    denyButtonText: 'Không',
                  }).then((result) => {
                    if (result.isConfirmed) {
                      dispatch(action)
                      setLoading(true)
                      getMovieBookingApi(showTimesID).then((res) => {
                        setLoading(false)
                        setDataGhe(res)
                        movieShowtimes.bookingChairList = []
                      })
                    }
                  })
                }}
                className={classes.buttonPurchase}
              >
                ĐẶT VÉ
              </Button>
            </div>
          </Grid>
        ) : null}
      </Grid>
    </div>
  )
}

export default Booking
