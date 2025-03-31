import CheckoutForm from '../components/shoppingcart/CheckoutForm'

import { useSelector, useDispatch } from 'react-redux';
import { getShoppingCart } from '../slice/shoppingCartSlice'
import { useEffect, useMemo } from 'react';

import { formatNumber } from '../helpers/helper';

const api = import.meta.env.VITE_API_PATH;

export default function CheckoutPage() {
  const dispatch = useDispatch()

  const shoppingCartList = useSelector((state) => state.shoppingCart.shoppingCartList);

  const cartTotal = useMemo(() => shoppingCartList.reduce((acc, cur) => acc + cur.final_total, 0), [shoppingCartList])

  useEffect(() => {
    dispatch(getShoppingCart())
  }, [])
  return (
    <>
      <section className='gallery-banner'>
        <section className='container position-relative z-index-100'>
          <h1 className='text-light'>建立訂單</h1>
        </section>
        <div className="bg-filter"></div>
        <div className='banner-bg'>
          <img src={`/${api}/images/PicassoGuernica.jpg`} alt="" />
        </div>
      </section>
      <section className="container py-10 py-md-20">
        <div className="row">
          <div className="col-md-8 mb-5 mb-md-0">
            <CheckoutForm></CheckoutForm>
          </div>
          <div className="col-md-4">
            <h4 className='mb-3'>購物車明細</h4>
            <hr />
            <div className="order-form">
              <ul className="list-unstyled row-gap-3 d-flex flex-column">
                {
                  shoppingCartList.map((cartItem) => {
                    return (
                      <li key={cartItem.id}>
                        <div className='d-flex justify-content-between'>
                          <div className='d-flex'>
                            <div className="img-wrap me-3">
                              <img src={cartItem.product.imageUrl} alt={cartItem.product.title} className='w-100' />
                            </div>
                            <div>
                              <h5>{ cartItem.product.title }</h5>
                              <p>總價：${ formatNumber(cartItem.final_total) }</p>
                            </div>
                          </div>
                          <div>x{cartItem.qty}</div>
                        </div>
                      </li>
                    )
                  })
                }
              </ul>
              <hr />
              <h4>總價：{formatNumber(cartTotal)}</h4>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}