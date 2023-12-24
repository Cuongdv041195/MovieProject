import { Button, Grid, TextField } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { useForm } from 'react-hook-form'
import { signinAPI } from '../../../apis/userAPI'
import { LoadingButton } from '@mui/lab'
import { Navigate, json, useNavigate } from 'react-router-dom'
import { PATH } from '../../../routes/path'
import { CURRENT_USER } from '../../../constants'
import { useAuth } from '../../../contexts/UserContext/UserContext'

const SignIn = () => {
  const { currentUser, handleSignin: handleSigninContext } = useAuth()
  const navigate = useNavigate()
  const { handleSubmit, register } = useForm({
    defaultValues: {
      taiKhoan: '',
      matKhau: '',
    },
  })

  const { mutate: handleSignin, isPending } = useMutation({
    mutationFn: (values) => signinAPI(values), //{ taiKhoan : "" , matKhau:""}
    onSuccess: (values) => {
      //values là thông tin user
      handleSigninContext(values)
      if (values.maLoaiNguoiDung === 'KhachHang') navigate(PATH.HOME)
      if (values.maLoaiNguoiDung === 'QuanTri') navigate(PATH.ADMIN)
    },
    onError: (error) => {
      console.log('error', error)
      // alert("Lỗi rồi");
    },
  })

  const onSubmit = (formValues) => {
    handleSignin(formValues) // { taiKhoan : "" , matKhau:""}
  }

  if (currentUser) {
    return <Navigate to={PATH.HOME} />
  }

  return (
    <div>
      <Grid
        container
        justifyContent={'center'}
        alignItems={'center'}
        padding={'50px 0'}
      >
        <Grid item md={6}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField label="Tài khoản" fullWidth {...register('taiKhoan')} />
            <TextField
              label="Mật khẩu"
              type="password"
              fullWidth
              {...register('matKhau')}
            />
            <LoadingButton
              type="submit"
              variant="contained"
              loading={isPending}
            >
              Đăng nhập
            </LoadingButton>
          </form>
        </Grid>
      </Grid>
    </div>
  )
}

export default SignIn
