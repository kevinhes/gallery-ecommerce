import { useEffect, useState } from "react"
import { useForm } from 'react-hook-form';
import ReactLoading from 'react-loading';
import Swal from 'sweetalert2'

// custome func library
import { getShoppingCart, deleteProductFromShoppingCart, checkout, editProductQty, deleteAllProduct } from "../helpers/shoppingCart"

//components
import ShoppingCartList from "../components/shoppingcart/ShoppingCartList";

// page
export default function ShoppingCart() {
  const [ shoppingCart, setShoppingCart ] = useState([])
  const [ isCartLoading, setIsCartLoading ] = useState(false)
  const [ isOrderLoading, setIsOrderLoading ] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleShoppingCart = async() => {
    setIsCartLoading(true)
    const shoppingCartDetail = await getShoppingCart()
    setShoppingCart(shoppingCartDetail)
    setIsCartLoading(false)
  }

  const handleEditShoppingCart = async(product_id, qty) => {
    if ( qty <= 0 ) {
      await Swal.fire({
        title: '產品數量不得為零',
        icon: 'warning',
        timer: 1500,
        showConfirmButton: false,
      })
      return
    }
    setIsCartLoading(true)
    const shoppingCartDetail = await editProductQty(product_id, qty)
    setShoppingCart(shoppingCartDetail)
    setIsCartLoading(false)
  }

  const deleteProduct = async( id ) => {
    const shoppingCartDetail = await deleteProductFromShoppingCart(id)
    setShoppingCart(shoppingCartDetail)
  }

  const deleteAllProductFromCart = async() => {
    setIsCartLoading(true)
    const shoppingCartDetail = await deleteAllProduct()
    setShoppingCart(shoppingCartDetail)
    setIsCartLoading(false)
  }

  const checkoutOrder = async(data) => {
    setIsOrderLoading(true)
    const shoppingCartDetail = await checkout(data)
    setShoppingCart(shoppingCartDetail)
    setIsOrderLoading(false)
  }

  useEffect(()=> {
    handleShoppingCart()
  },[])

  return (
    <section className="container">
      {
        isOrderLoading === true &&
        <div className="full-screen-loading">
          <ReactLoading />
        </div>
      }
      {
        shoppingCart.length === 0 ? 
        <div>
          <p className="h1">購物車內無商品</p>
        </div>
        :
        <div className="row">
          <div className="col-12 d-flex justify-content-end mb-5">
            <button type="button" className="btn btn-danger" onClick={() => deleteAllProductFromCart() }>
              清空購物車
            </button>
          </div>
          <div className="col-8">
            {
              isCartLoading === true ?
              <div className="w-100 vh-100 d-flex justify-content-center align-items-center">
                <ReactLoading type="spin" color="#4F46E5" />
              </div>
              :
              <ShoppingCartList
                shoppingCart={shoppingCart}
                deleteProduct={deleteProduct}
                handleEditShoppingCart={handleEditShoppingCart}
                deleteAllProductFromCart = {deleteAllProductFromCart}
              />
            }
          </div>
          <div className="col-4">
            <form onSubmit={handleSubmit(checkoutOrder)} className="order-form">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="姓名"
                  {...register('name', {
                    required: '姓名是必填的',
                  })}
                />
                <label htmlFor="username">姓名</label>
              </div>
              {errors.name && <p className="text-danger">{errors.name.message}</p>}
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Email"
                  {...register('email', {
                    required: 'Email 是必填的',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: '請輸入有效的 Email',
                    },
                  })}
                />
                <label htmlFor="email">Email</label>
              </div>
              {errors.email && <p className="text-danger">{errors.email.message}</p>}
              <div className="form-floating mb-3">
                <input
                  type="tel"
                  className="form-control"
                  id="tel"
                  placeholder="手機號碼"
                  {...register('tel', {
                    required: '手機號碼是必填的',
                    pattern: {
                      value: /^09\d{8}$/,  // 台灣手機號碼驗證
                      message: '請輸入有效的台灣手機號碼（09 開頭，共 10 碼）',
                    },
                  })}
                />
                <label htmlFor="tel">手機號碼</label>
              </div>
              {errors.tel && <p className="text-danger">{errors.tel.message}</p>}
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  placeholder="地址"
                  {...register('address', {
                    required: '地址是必填的',
                  })}
                />
                <label htmlFor="address">地址</label>
              </div>
              {errors.address && <p className="text-danger">{errors.address.message}</p>}
              <div className="form-floating mb-3">
                <textarea className="form-control floating-area" placeholder="留言" id="message" { ...register('message') }></textarea>
                <label htmlFor="message">留言</label>
              </div>
              <button type="submit" className="btn btn-primary w-100">訂單送出</button>
            </form>
          </div>
      </div>
      }

    </section>
  )
}