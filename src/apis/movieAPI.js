import { GROUP_CODE } from '../constants'
import fetcher from './fetcher'

export const getBannerAPI = async () => {
  try {
    const response = await fetcher.get('/QuanLyPhim/LayDanhSachBanner')
    return response.data.content // [];
  } catch (error) {}
}

export const getListMovieAPI = async () => {
  try {
    const response = await fetcher.get('/QuanLyPhim/LayDanhSachPhim', {
      params: {
        maNhom: GROUP_CODE,
      },
    })
    return response.data.content
  } catch (error) {}
}

export const getMovieDetailsAPI = async (movieId) => {
  try {
    const response = await fetcher.get('/QuanLyPhim/LayThongTinPhim', {
      params: {
        MaPhim: movieId,
      },
    })
    return response.data.content
  } catch (error) {}
}
