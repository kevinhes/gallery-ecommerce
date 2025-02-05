import axios from "axios";
import { useEffect } from "react";
import Swal from 'sweetalert2'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { getCookie, checkIsLoginInLoginPage } from "../helpers/auth";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);


function Login() {
  // 基本 react hook form 的元件
  const { register, handleSubmit, formState: { errors } } = useForm();
  // react router 跳轉功能
  const navigate =  useNavigate()
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const signinUrl = `${baseUrl}v2/admin/signin`;
  
  // 取得 cookie
  const cookies = document.cookie.split(';');
  const hexToken = getCookie(cookies);

  // const [ userInfo, setUserInfo ] = useState({
  //   username:'',
  //   password: ''
  // })

  // const handleUserInfo = (event) => {
  //   // 使用解構的方式放入 name 以及 value 變數
  //   const { name, value } = event.target
  //   // 寫入新的資訊 備註：如果物件遇到同樣的屬性，新的會覆蓋舊的
  //   setUserInfo({
  //     ...userInfo,
  //     [ name ]: value
  //   })
  // }



  const onSubmit = async(data) => {
    try {
      const response = await axios.post(signinUrl, {
        ...data
      })
      const { token, expired } = response.data
      const formattedExpired = dayjs.unix(expired).utc().format('ddd, DD MMM YYYY HH:mm:ss [UTC]');
      const susseccAlert =  await Swal.fire({
        title: response.data.message,
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
      })
      if( susseccAlert.isDismissed === true ) {
        document.cookie = `hexschool=${token}; expires=${formattedExpired}; path=/`;
        navigate('/dashboard')
      };
      
    } catch( error ) {
      Swal.fire({
        title: error.response.data.message,
        icon: 'error',
        confirmButtonText: '確認'
      })
    }
  };

  useEffect(() => {
    checkIsLoginInLoginPage( hexToken, navigate )
  },[])

  return (
    <>
      <section className="vw-100 vh-100 d-flex">
        <div className="w-60 p-5">
          <img src={`https://kevinhes.github.io${import.meta.env.BASE_URL}/images/login_img.jpeg`} alt="登入照片" className="w-100 h-100 rounded-5" />
          </div>
        <div className="w-40 d-flex justify-content-center align-items-center">
          <div className="w-80 p-5 border rounded-5">
            <h1 className="mb-3 text-center">Login</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="username"
                  {...register('username', {
                    required: 'Email 是必填的',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: '請輸入有效的 Email',
                    },
                  })}
                />
                <label htmlFor="username">Email address</label>
              </div>
              {errors.username && <p className="text-danger">{errors.username.message}</p>}
              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  {...register('password', {
                    required: 'Password 是必填的',
                    minLength: {
                      value: 6,
                      message: 'Password 至少需要 6 個字元',
                    },
                  })}
                />
                <label htmlFor="password">Password</label>
              </div>
              {errors.password && <p className="text-danger">{errors.password.message}</p>}
              <button type="submit" className="btn btn-primary w-100">登入</button>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}

export default Login
