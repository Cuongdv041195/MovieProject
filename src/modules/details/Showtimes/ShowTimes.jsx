import React, { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getMovieShowTimesAPI } from '../../../apis/cinemaAPI'
import {
  Box,
  Button,
  Container,
  Stack,
  Tab,
  Tabs,
  Typography,
} from '@mui/material'
import dayjs from 'dayjs'
import { useNavigate } from 'react-router-dom'
import { PATH } from '../../../routes/path'

function TabPanel(props) {
  const { children, value, index, ...other } = props
  //value =  "BHDStar" , index= "BHDStar"
  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
      style={{ width: '100%' }}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </Box>
  )
}

const ShowTimes = ({ movieId }) => {
  const [value, setValue] = useState('')
  const handleChange = (newValue) => {
    setValue(newValue)
  }
  const { data = {}, isLoading } = useQuery({
    queryKey: ['showtimes', movieId],
    queryFn: () => getMovieShowTimesAPI(movieId),
    enabled: !!movieId,
  })
  const navigate = useNavigate()
  const cinemaSystems = data.heThongRapChieu || []
  // console.log('cinemaSystems', cinemaSystems)

  useEffect(() => {
    if (cinemaSystems.length > 0) {
      setValue(cinemaSystems[0].maHeThongRap)
    }
  }, [cinemaSystems])

  return (
    <Container>
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: 'background.paper',
          display: 'flex',
          marginTop: '80px',
        }}
      >
        <Tabs
          orientation="vertical"
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: 'divider' }}
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue)
          }}
        >
          {cinemaSystems.map((item) => {
            return (
              <Tab
                key={item.maHeThongRap}
                label={<img src={item.logo} style={{ width: 80 }} />}
                value={item.maHeThongRap}
              />
            )
          })}
        </Tabs>
        {cinemaSystems.map((item) => (
          <TabPanel value={value} index={item.maHeThongRap}>
            {item.cumRapChieu.map((rap) => (
              <Box sx={{ mb: 4 }} key={rap.tenCumRap}>
                <Typography component={'h4'}>{rap.tenCumRap}</Typography>
                <Stack spacing={2} direction={'row'}>
                  {rap.lichChieuPhim.map((lichChieu) => {
                    const times = dayjs(lichChieu.ngayChieuGioChieu).format(
                      'DD-MM-YYYY ~ HH:mm'
                    )

                    return (
                      <Button
                        key={lichChieu.maRap}
                        variant="outlined"
                        onClick={() => {
                          navigate(`/purchase/${lichChieu.maLichChieu}`)
                        }}
                      >
                        {times}
                      </Button>
                    )
                  })}
                </Stack>
              </Box>
            ))}
            {/* </Stack> */}
          </TabPanel>
        ))}
      </Box>
    </Container>
  )
}

export default ShowTimes
