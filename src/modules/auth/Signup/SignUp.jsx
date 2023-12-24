import React from 'react'
import {
  Button,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { GROUP_CODE } from '../../../constants'
import { useMutation } from '@tanstack/react-query'
import { signupAPI } from '../../../apis/userAPI'
import { LoadingButton } from '@mui/lab'
import { Navigate, useNavigate } from 'react-router-dom'
import { PATH } from '../../../routes/path'
import { useAuth } from '../../../contexts/UserContext/UserContext'

const schemaSignup = yup.object({
  taiKhoan: yup
    .string()
    .required('Vui lòng nhập thông tin')
    .min(6, 'Tài khoản ít nhất 6 ký tự')
    .max(8, 'Tài khoản không vượt quá 8 ký tự'),
  matKhau: yup
    .string()
    .required('Vui lòng nhập thông tin')
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
      'Mật khẩu chưa chỉnh xác'
    ),
  email: yup.string().required('Vui lòng nhập thông tin'),
  hoTen: yup.string().required('Vui lòng nhập thông tin'),
  soDt: yup.string().required('Vui lòng nhập thông tin'),
})

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      taiKhoan: '',
      matKhau: '',
      email: '',
      soDt: '',
      maNhom: GROUP_CODE,
      hoTen: '',
    },
    resolver: yupResolver(schemaSignup),
    mode: 'all',
  })

  const { currentUser } = useAuth()

  const navigate = useNavigate()

  const { mutate: handleSignup, isPending } = useMutation({
    mutationFn: (values) => signupAPI(values),
    onSuccess: (values) => {
      navigate(PATH.SIGN_IN)
    },
    onError: (error) => {
      console.log('error', error)
      alert('Lỗi rồi')
    },
  })

  // const handleSubmit = (onSubmit, onError) => {
  //   // do something
  //   // const innerFunction = () => {};
  //   // return innerFunction;
  //   onSubmit(values);//
  // };

  const onSubmit = (values) => {
    // gọi API
    handleSignup(values)

    // Gọi api xong thì, redirect sang trang đăng nhập
  }

  if (currentUser) {
    return <Navigate to={PATH.HOME} />
  }

  return (
    <Container maxWidth="sm">
      <Typography component={'h2'}>Sign up</Typography>
      <Grid
        container
        spacing={3}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Grid item lg={8}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
              <TextField
                label="Họ tên"
                fullWidth
                {...register('hoTen')}
                error={Boolean(errors.hoTen)}
                helperText={Boolean(errors.hoTen) && errors.hoTen.message}
              />

              <TextField
                label="Email"
                fullWidth
                {...register('email')}
                error={Boolean(errors.email)}
                helperText={Boolean(errors.email) && errors.email.message}
              />

              <TextField
                label="Tài khoản"
                fullWidth
                {...register('taiKhoan')}
                error={Boolean(errors.taiKhoan)}
                helperText={Boolean(errors.taiKhoan) && errors.taiKhoan.message}
              />
              <TextField
                label="Mật khẩu"
                fullWidth
                type="password"
                {...register('matKhau')}
                error={Boolean(errors.matKhau)}
                helperText={Boolean(errors.matKhau) && errors.matKhau.message}
              />

              <TextField
                label="Số điện thoại"
                fullWidth
                {...register('soDt')}
                error={Boolean(errors.soDt)}
                helperText={Boolean(errors.soDt) && errors.soDt.message}
              />
              <LoadingButton
                variant="contained"
                fullWidth
                type="submit"
                size="large"
                loading={isPending}
              >
                Signup
              </LoadingButton>
            </Stack>
          </form>
        </Grid>
      </Grid>
    </Container>
  )
}

export default SignUp
