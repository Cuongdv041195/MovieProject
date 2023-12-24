import { Box, Container, Divider, Grid, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import { mangHinh } from './data'
import applelogo from '../../assets/apple-logo.png'
import androidlogo from '../../assets/android-logo.png'
import fblogo from '../../assets/facebook-logo.png'
import zalologo from '../../assets/zalo-logo.png'
import zionlogo from '../../assets/zion-logo.jpg'
import bctlogo from '../../assets/daThongBao-logo.png'
import classes from './styles.module.css'

const Footer = () => {
  const renderPartner = () => {
    return mangHinh.map((item, index) => {
      return (
        <Grid item key={index} xs={3}>
          <a target="_blank" href={item.link} rel="noreferrer">
            <img
              className={classes.footerPartner}
              src={item.linkHing}
              alt={item.tenHinh}
            />
          </a>
        </Grid>
      )
    })
  }
  return (
    <Box className={classes.root}>
      <Container maxWidth="md">
        <Grid container>
          <Grid item xs={4} sm={3} lg={4}>
            <Typography>
              <Typography
                component={'h6'}
                className={classes.footerTypograhyLabel}
              >
                BEE
              </Typography>
              <Grid container>
                <Grid item xs={6}>
                  <a className={classes.footerLink}>FAQ</a>
                </Grid>
                <Grid item xs={6}>
                  <a className={classes.footerLink}>Thỏa thuận sử dụng</a>
                </Grid>
                <Grid item xs={6}>
                  <a className={classes.footerLink}>Brand Guidelines</a>
                </Grid>
                <Grid item xs={6}>
                  <a className={classes.footerLink}>Chính sách bảo mật</a>
                </Grid>
              </Grid>
            </Typography>
          </Grid>
          <Grid item xs={3} lg={4}>
            <Typography>
              <Typography
                component={'h6'}
                className={classes.footerTypograhyLabel}
                variant="subtitle2"
              >
                ĐỐI TÁC
              </Typography>
              <Grid container>{renderPartner()}</Grid>
            </Typography>
          </Grid>
          <Grid item xs={3} lg={4}>
            <Grid container>
              <Grid item xs={6}>
                <Typography>
                  <Typography
                    component={'h6'}
                    className={classes.footerTypograhyLabel}
                    variant="subtitle2"
                  >
                    MOBILE APP
                  </Typography>
                  <Grid container>
                    <Grid item xs={4}>
                      <a
                        target="_blank"
                        href="https://apps.apple.com/vn/app/tix-%C4%91%E1%BA%B7t-v%C6%A9-nhanh-nh%E1%BA%A5t/id615186197"
                        rel="noreferrer"
                      >
                        <img
                          src={applelogo}
                          className={classes.footerPartner}
                          alt=""
                        />
                      </a>
                    </Grid>
                    <Grid item xs={4}>
                      <a
                        target="_blank"
                        href="https://play.google.com/store/apps/details?id=vn.com.vng.phim123"
                        rel="noreferrer"
                      >
                        <img
                          src={androidlogo}
                          className={classes.footerPartner}
                          alt=""
                        />
                      </a>
                    </Grid>
                  </Grid>
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>
                  <Typography
                    className={classes.footerTypograhyLabel}
                    variant="subtitle2"
                  >
                    SOCIAL
                  </Typography>
                  <Grid container>
                    <Grid item xs={4}>
                      <a
                        target="_blank"
                        href="https://apps.apple.com/vn/app/tix-%C4%91%E1%BA%B7t-v%C3%A9-nhanh-nh%E1%BA%A5t/id615186197"
                        rel="noreferrer"
                      >
                        <img
                          alt=""
                          src={fblogo}
                          className={classes.footerPartner}
                        />
                      </a>
                    </Grid>
                    <Grid item xs={4}>
                      <a
                        target="_blank"
                        href="https://play.google.com/store/apps/details?id=vn.com.vng.phim123"
                        rel="noreferrer"
                      >
                        <img alt="" src={zalologo} width="30" />
                      </a>
                    </Grid>
                  </Grid>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Divider className={classes.divider} />
        <Typography className={classes.footerSpacing}>
          <Grid container>
            <Grid item xs={12} sm={3} lg={2} style={{ marginTop: '25px' }}>
              <img alt="" src={zionlogo} width="100" />
            </Grid>
            <Grid item xs={12} sm={6} lg={8}>
              <Typography
                component="h6"
                className={classes.footerTypograhyLabel}
              >
                BEE – SẢN PHẨM CỦA CÔNG TY CỔ PHẦN ZION
              </Typography>
              <Typography variant="h6">
                Địa chỉ: Z06 Đường số 13, Phường Tân Thuận Đông, Quận 7, Tp. Hồ
                Chí Minh, Việt Nam.
              </Typography>
              <Typography component="h6">
                Giấy chứng nhận đăng ký kinh doanh số: 0101659783,
              </Typography>
              <Typography component="h6">
                đăng ký thay đổi lần thứ 30, ngày 22 tháng 01 năm 2020 do Sở kế
                hoạch và đầu tư Thành phố Hồ Chí Minh cấp.
              </Typography>
              <Typography component="h6">
                Số Điện Thoại (Hotline): 1900 545 436
              </Typography>
            </Grid>
            <Grid item xs={12} sm={3} lg={2} style={{ marginTop: '25px' }}>
              <img alt="" src={bctlogo} width="100" />
            </Grid>
          </Grid>
        </Typography>
      </Container>
    </Box>
  )
}

export default Footer
