// react
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import ReactLoading from 'react-loading';

import PropTypes from 'prop-types';

// import { checkout } from '../../helpers/shoppingCart';

import axios from 'axios';
import Swal from 'sweetalert2';
const baseUrl = import.meta.env.VITE_API_BASE_URL;
const api = import.meta.env.VITE_API_PATH;

// router
import { useDispatch } from 'react-redux';
import { getShoppingCart } from '../../slice/shoppingCartSlice';

// router
import { useNavigate } from 'react-router-dom';

export default function CheckoutForm() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isOrderLoading, setIsOrderLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const checkout = async (data) => {
    const checkoutUrl = `${baseUrl}v2/api/${api}/order`;
    const orderInfo = {
      data: {
        user: {
          name: data.name,
          email: data.email,
          tel: data.tel,
          address: data.address,
        },
        message: data.message,
      },
    };
  
    try {
      const response = await axios.post(checkoutUrl, {
        ...orderInfo,
      });
      await Swal.fire({
        title: response.data.message,
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
      });
      await dispatch(getShoppingCart())
      navigate('/')
    } catch (error) {
      Swal.fire({
        title: error.response.data.message,
        icon: 'error',
        confirmButtonText: '確認',
      });
    }
  };

  const checkoutOrder = async (data) => {
    setIsOrderLoading(true);
    await checkout(data);
    setIsOrderLoading(false);
  };

  return (
    <>
      {isOrderLoading === true && (
        <div className="full-screen-loading">
          <ReactLoading />
        </div>
      )}
      <h4 className='mb-3'>配送資料</h4>
      <hr />
      <form onSubmit={handleSubmit(checkoutOrder)} className="order-form">
        <div className="mb-3">
          <label htmlFor="username" className='mb-2'>姓名<sapn className="text-danger">*</sapn></label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="王小明"
            {...register('name', {
              required: '姓名是必填的',
            })}
          />

        </div>
        {errors.name && (
          <p className="text-danger mb-4">{errors.name.message}</p>
        )}
        <div className=" mb-3">
          <label htmlFor="email" className='mb-3'>Email<sapn className="text-danger">*</sapn></label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="XXXX@gmail.com"
            {...register('email', {
              required: 'Email 是必填的',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: '請輸入有效的 Email',
              },
            })}
          />

        </div>
        {errors.email && (
          <p className="text-danger mb-4">{errors.email.message}</p>
        )}
        <div className="mb-3">
          <label htmlFor="tel" className='mb-3'>手機號碼<sapn className="text-danger">*</sapn></label>
          <input
            type="tel"
            className="form-control"
            id="tel"
            placeholder="09XXXXXXXX"
            {...register('tel', {
              required: '手機號碼是必填的',
              pattern: {
                value: /^09\d{8}$/, // 台灣手機號碼驗證
                message: '請輸入有效的台灣手機號碼（09 開頭，共 10 碼）',
              },
            })}
          />

        </div>
        {errors.tel && (
          <p className="text-danger mb-4">{errors.tel.message}</p>
        )}
        <div className="mb-3">
          <label htmlFor="address" className='mb-3'>地址<sapn className="text-danger">*</sapn></label>
          <input
            type="text"
            className="form-control"
            id="address"
            placeholder="地址"
            {...register('address', {
              required: '地址是必填的',
            })}
          />

        </div>
        {errors.address && (
          <p className="text-danger mb-4">{errors.address.message}</p>
        )}
        <div className="mb-10">
          <label htmlFor="message" className='mb-3'>留言</label>
          <textarea
            className="form-control floating-area"
            placeholder="留言"
            id="message"
            rows='5'
            {...register('message')}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary w-100">
          訂單送出
        </button>
      </form>
    </>
  )
}

CheckoutForm.propTypes = {
  handleShoppingCart: PropTypes.func, // 如果 closeModal 是必填的
};