import axios from "axios";
import Swal from 'sweetalert2'
const baseUrl = import.meta.env.VITE_API_BASE_URL;
const checkLoginUrl = `${baseUrl}v2/api/user/check`;

export const getCookie = (cookies) => {
  let authToken = '';
  cookies.forEach( ( cookie, index ) => {
    if ( cookie.includes('hexschool') ) {
      authToken = cookies[index]
      authToken = authToken.split('=')[1]
    }
  } )
  return authToken
}

export const checkIsLoginInLoginPage = async(token, navigate) => {
  try {
    const response = await axios.post(checkLoginUrl,{}, {
      headers: { Authorization: token },
    })
    if ( response.data.success ) {
      const successAlert = await Swal.fire({
        title: '用戶已登入，準備跳轉後台頁面',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
      })
      if ( successAlert.isDismissed ) {
        navigate('/dashboard')
      }
    }
    
  } catch(error) {
    if (error) return
  }
}

export const checkIsLogin = async(token, navigate) => {
  try {
    const response = await axios.post(checkLoginUrl,{}, {
      headers: { Authorization: token },
    })
    if ( response.data.success ) return
  } catch(error) {
    const errorAlert = await Swal.fire({
      title: error.response.data.message,
      icon: 'error',
      timer: 1500,
      showConfirmButton: false,
    })
    if ( errorAlert.isDismissed ) {
      navigate('/')
    }
  }
}