import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import { Container, Stack } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { PATH } from '../../routes/path'
import { useAuth } from '../../contexts/UserContext/UserContext'
import beelogo from '../../assets/bee_logo.png'
import classes from './styles.module.css'

const Header = () => {
  const navigate = useNavigate()
  const { currentUser, handleLogout } = useAuth()

  return (
    <Container>
      <Box sx={{ flexGrow: 1 }}>
        <div className={classes.root}>
          <Toolbar style={{ justifyContent: 'space-between' }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => {
                navigate(PATH.HOME)
              }}
              sx={{ mr: 2 }}
            >
              <img src={beelogo} style={{ width: '40px' }} alt="" />
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1, color: '#1976d2', fontWeight: '700' }}
              >
                BEE CINEMA
              </Typography>
            </IconButton>

            {currentUser ? (
              <Stack direction={'row'} spacing={2}>
                <Typography
                  style={{
                    lineHeight: '2.5',
                    fontSize: '16px',
                  }}
                >
                  {currentUser.hoTen}
                </Typography>
                <Button
                  size="large"
                  variant="contained"
                  onClick={() => {
                    handleLogout()
                    navigate(PATH.SIGN_IN)
                  }}
                >
                  Đăng Xuất
                </Button>
              </Stack>
            ) : (
              <Stack spacing={2} direction={'row'}>
                <Button
                  variant="outlined"
                  onClick={() => navigate(PATH.SIGN_UP)}
                >
                  Đăng Ký
                </Button>
                <Button
                  variant="contained"
                  onClick={() => navigate(PATH.SIGN_IN)}
                >
                  Đăng Nhập
                </Button>
              </Stack>
            )}
          </Toolbar>
        </div>
        <div style={{ minHeight: '64px' }}></div>
      </Box>
    </Container>
  )
}

export default Header
