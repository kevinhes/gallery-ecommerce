import axios from 'axios';
import Swal from 'sweetalert2';
const baseUrl = import.meta.env.VITE_API_BASE_URL;
const checkLoginUrl = `${baseUrl}v2/api/user/check`;

export const getCookie = (cookies) => {
  let authToken = '';
  cookies.forEach((cookie, index) => {
    if (cookie.includes('hexschool')) {
      authToken = cookies[index];
      authToken = authToken.split('=')[1];
    }
  });
  return authToken;
};

export const checkIsLoginInLoginPage = async (token, navigate) => {
  const cookies = document.cookie.split(';');
  const hexToken = getCookie(cookies);
  try {
    const response = await axios.post(
      checkLoginUrl,
      {},
      {
        headers: { Authorization: hexToken },
      }
    );
    if (response.data.success) {
      const successAlert = await Swal.fire({
        title: '用戶已登入，準備跳轉後台頁面',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
      });
      if (successAlert.isDismissed) {
        navigate('/dashboard');
      }
    }
  } catch (error) {
    if (error) return;
  }
};

export const checkIsLogin = async (navigate) => {
  const cookies = document.cookie.split(';');
  const hexToken = getCookie(cookies);
  try {
    const response = await axios.post(
      checkLoginUrl,
      {},
      {
        headers: { Authorization: hexToken },
      }
    );
    if (response.data.success) {
      return true;
    }
  } catch (error) {
    const errorAlert = await Swal.fire({
      title: error.response.data.message,
      icon: 'error',
      timer: 1500,
      showConfirmButton: false,
    });
    if (errorAlert.isDismissed) {
      navigate('/');
    }
  }
};

export const logout = async (navigate) => {
  const cookies = document.cookie.split(';');
  const hexToken = getCookie(cookies);
  const logoutUrl = `${baseUrl}v2/logout`;

  try {
    await axios.post(
      logoutUrl,
      {},
      {
        headers: { Authorization: hexToken },
      }
    );
    await Swal.fire({
      title: '已成功登出',
      icon: 'success',
      timer: 1500,
      showConfirmButton: false,
    });
    navigate('/login');
  } catch (error) {
    Swal.fire({
      title: error.response.data.message,
      icon: 'error',
      timer: 1500,
      showConfirmButton: false,
    });
  }
};
