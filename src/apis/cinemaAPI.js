import fetcher from './fetcher'
import { GROUP_CODE } from '../constants'

export const getMovieShowTimesAPI = async (movieId) => {
  try {
    const response = await fetcher.get('/QuanLyRap/LayThongTinLichChieuPhim', {
      params: {
        MaPhim: movieId,
      },
    })
    return response.data.content
  } catch (error) {
    throw 'Lỗi'
  }
}
export const getListCinema = async () => {
  try {
    const response = await fetcher.get('/QuanLyRap/LayThongTinHeThongRap')
    return response.data.content
  } catch (error) {
    throw 'Lỗi'
  }
}

export const getCinemaById = async (id) => {
  try {
    const response = await fetcher.get(
      '/QuanLyRap/LayThongTinLichChieuHeThongRap',
      {
        params: {
          maHeThongRap: id,
          maNhom: GROUP_CODE,
        },
      }
    )
    return response.data.content
  } catch (error) {
    throw 'Lỗi'
  }
}
