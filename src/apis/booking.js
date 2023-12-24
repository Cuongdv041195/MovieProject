import axios from 'axios'
import fetcher from './fetcher'

export const getMovieBookingApi = async (showTimesID) => {
  try {
    const response = await fetcher.get('/QuanLyDatVe/LayDanhSachPhongVe', {
      params: {
        MaLichChieu: showTimesID,
      },
    })
    return response.data.content
  } catch (error) {
    throw 'Lỗi'
  }
}
// export const actBookTicket = async (ticketInfo) => {
//   try {
//     const response = await fetcher.post('/QuanLyDatVe/DatVe', {
//       params: {
//         data: ticketInfo,
//         headers: {
//           Authorization: `Bearer ${
//             JSON.parse(localStorage.getItem('CURRENT_USER')).accessToken
//           }`,
//         },
//       },
//     })

//     return response.data.content
//   } catch (error) {}
// }
// export const actBookTicket = async (ticketInfo) => {
//   try {
//     const response = await fetcher.post('/QuanLyDatVe/DatVe', {
//       params: {
//         data: ticketInfo,
//         headers: {
//           Authorization: `Bearer ${
//             JSON.parse(localStorage.getItem('CURRENT_USER')).accessToken
//           }`,
//         },
//       },
//     })

//     if (response.status === 200) {
//       // window.location.reload();
//     }
//   } catch (error) {}
// }
export const actBookTicket = (ticketInfo) => {
  return async () => {
    try {
      const response = await axios({
        url: 'https://movienew.cybersoft.edu.vn/api/QuanLyDatVe/DatVe',
        method: 'POST',
        data: ticketInfo,
        headers: {
          TokenCybersoft:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA1MyIsIkhldEhhblN0cmluZyI6IjA1LzA1LzIwMjQiLCJIZXRIYW5UaW1lIjoiMTcxNDg2NzIwMDAwMCIsIm5iZiI6MTY4Njc2MjAwMCwiZXhwIjoxNzE1MDE0ODAwfQ.5ch0U3B88fGDn067ipN5mT-pHyAOZTzdwpBiwr4p5Aw',
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem('CURRENT_USER')).accessToken
          }`,
        },
      })
      if (response.status === 200) {
        // window.location.reload();
      }
    } catch (error) {
      throw 'Lỗi'
    }
  }
}
