import { useEffect, useState } from "react"
import { useForm } from 'react-hook-form';


import { getShoppingCart, deleteProductFromShoppingCart, checkout } from "../helpers/shoppingCart"

export default function ShoppingCart() {
  const [ shoppingCart, setShoppingCart ] = useState([])

  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleShoppingCart = async() => {
    const shoppingCartDetail = await getShoppingCart()
    setShoppingCart(shoppingCartDetail)
  }

  const deleteProduct = async( id ) => {
    const shoppingCartDetail = await deleteProductFromShoppingCart(id)
    setShoppingCart(shoppingCartDetail)
  }

  const checkoutOrder = async(data) => {
    const shoppingCartDetail = await checkout(data)
    setShoppingCart(shoppingCartDetail)
  }

  useEffect(()=> {
    handleShoppingCart()
  },[])

  return (
    <section className="container">
      <div className="row">
        <div className="col-8">
          <ul className="list-unstyled">
            {
              shoppingCart.map( ( cartItem ) => {
                return (
                  <li key={cartItem.id} className="shopping-cart-card">
                    <div className="card-img-wrap">
                      <img src={cartItem.product.imageUrl} alt="product image" className="w-100" />
                    </div>
                    <div className="d-flex align-items-center flex-grow-1">
                      <div className="w-70">
                        <h5 className="mb-2">
                          {cartItem.product.title}
                        </h5>
                        <p>
                        {cartItem.product.content}
                        </p>
                      </div>
                      <div className="w-10">
                        <h4>
                        {cartItem.qty}
                        </h4>
                      </div>
                      <div className="w-15">
                        <h4>${cartItem.final_total}</h4>
                      </div>
                      <div className="flex-grow-1">
                        <button type="button" onClick={() => deleteProduct(cartItem.id)}>
                          <i className="bi bi-trash fs-3 text-danger"></i>
                        </button>
                      </div>
                    </div>
                  </li>
                )
              } )
            }
          </ul>
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
    </section>
  )
}