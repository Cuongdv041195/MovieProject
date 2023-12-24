import { Avatar, Box, Container, Tab, Tabs, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getCinemaById, getListCinema } from '../../../apis/cinemaAPI'
import { useQuery } from '@tanstack/react-query'
import { Link, useParams } from 'react-router-dom'
import classes from './styles.module.css'
import moment from 'moment'

function TabPanel(props) {
  const { children, valueLogo, index, ...other } = props
  return (
    <div
      role="tabpanel"
      hidden={valueLogo !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {valueLogo === index && (
        <Box p={3} style={{ padding: 0 }}>
          {children}
        </Box>
      )}
    </div>
  )
}

function TabPanelCinema(props) {
  const { children, valueCinema, index, ...other } = props
  return (
    <div
      role="tabpanel"
      hidden={valueCinema !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {valueCinema === index && <Box>{children}</Box>}
    </div>
  )
}

const ListCinema = ({ id }) => {
  const [valueLogo, setValueLogo] = useState(0)
  const [valueCinema, setValueCinema] = useState(0)
  const cinemaList = useQuery({
    queryKey: ['list-cinema'],
    queryFn: getListCinema,
  })
  const cinemaById = useQuery({
    queryKey: ['list-cinema-Id', id],
    queryFn: () => getCinemaById(id),
    // enabled: !!id,
  })

  const renderCinemaLogo = (arrData) => {
    return arrData.map((item, index) => {
      return (
        <Tab
          className={classes.cinemaLogoTab}
          key={item.maHeThongRap}
          icon={
            <Avatar
              alt={item.biDanh}
              src={item.logo}
              className={classes.cinemaLogoAvatar}
            />
          }
          onClick={() => getCinemaById(item.maHeThongRap)}
        />
      )
    })
  }
  const renderCinemaByIdList = (arrCinemaList) => {
    return arrCinemaList?.map((item, index) => {
      return (
        <TabPanel
          className={classes.cinemaByIdList}
          valueLogo={valueLogo}
          index={index}
          key={item.maHeThongRap}
        >
          <Tabs
            orientation="vertical"
            value={valueCinema}
            onChange={(event, newValue) => {
              setValueCinema(newValue)
            }}
          >
            {cinemaById.data
              ? renderCinemaById(cinemaById?.data?.[valueLogo].lstCumRap)
              : null}
          </Tabs>
        </TabPanel>
      )
    })
  }
  const renderCinemaById = (arrData) => {
    arrData?.find((it) => it?.maHeThongRap === valueLogo)?.lstCumRap ||
      arrData?.[5]?.lstCumRap
    return arrData?.map((item, index) => {
      return (
        <Tab
          key={item.maCumRap}
          label={
            <div style={{ width: '100%' }}>
              <Typography className={classes.cinemaTenCumRap} variant="h4">
                {item.tenCumRap}
              </Typography>
              <Typography className={classes.cinemaDiaChi} variant="h6">
                {item.diaChi}
              </Typography>
              <Link to="/" className={classes.cinemaChiTiet}>
                [chi tiết]
              </Link>
            </div>
          }
          className={classes.cinemaTab}
        />
      )
    })
  }

  const renderMovieByCinema = (arrMovie) => {
    return arrMovie.map((item, index) => {
      return (
        <div key={item.maPhim} className={classes.movieSingle}>
          <img
            alt={item.tenPhim}
            src={item.hinhAnh}
            className={classes.anhPhim}
          />
          <div className={classes.phimInfo}>
            <Typography variant="h2" className={classes.tenPhim}>
              <span className={classes.limitAge}>C18</span>
              {item.tenPhim}
            </Typography>

            <div className={classes.ngayGioChieuContainer}>
              {item.lstLichChieuTheoPhim
                .slice(0, 4)
                .map((childItem, childIndex) => {
                  return (
                    <Link
                      key={childItem.maLichChieu}
                      className={classes.ngayGioChieuBox}
                      to={`purchase/${childItem.maLichChieu}`}
                    >
                      <div className={classes.ngayGioChieuInfo}>
                        <Typography className={classes.ngayChieu}>
                          {moment(childItem.ngayChieuGioChieu).format(
                            'DD-MM-YYYY'
                          )}
                        </Typography>
                        <Typography>&nbsp;~&nbsp;</Typography>
                        <Typography variant="h3" className={classes.gioChieu}>
                          {moment(childItem.ngayChieuGioChieu).format('HH:mm')}
                        </Typography>
                      </div>
                    </Link>
                  )
                })}
            </div>
          </div>
        </div>
      )
    })
  }

  return (
    <Container maxWidth="lg" className={classes.root}>
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: 'background.paper',
          display: 'flex',
          marginTop: '80px',
          marginBottom: '80px',
        }}
      >
        <Tabs
          orientation="vertical"
          value={valueLogo}
          // defaultValue={cinemaById.data?.[0]?.maHeThongRap}
          onChange={(event, newValue) => {
            setValueLogo(newValue)
            setValueCinema(0)
          }}
          className={classes.tabs}
        >
          {cinemaList.data ? renderCinemaLogo(cinemaList.data) : null}
        </Tabs>
        <TabPanelCinema orientation="vertical" className={classes.tab}>
          {cinemaList.data && renderCinemaByIdList(cinemaList.data)}
        </TabPanelCinema>

        <TabPanelCinema
          valueCinema={valueCinema}
          index={valueCinema}
          className={classes.cinemaTabPanel}
        >
          {cinemaById.data &&
            renderMovieByCinema(
              cinemaById.data[0].lstCumRap[valueCinema].danhSachPhim
            )}
        </TabPanelCinema>
      </Box>
    </Container>
  )
}

export default ListCinema
