import PropTypes from "prop-types"
import { useMemo } from "react"

import { Link } from "react-router-dom"

import { formatNumber } from "../../helpers/helper"

export default function OrderDetail({ shoppingCartList }) {

  const cartTotalQty = useMemo(() => shoppingCartList.reduce((acc, cur) => acc + cur.qty, 0), [shoppingCartList])
  const cartTotal = useMemo(() => shoppingCartList.reduce((acc, cur) => acc + cur.final_total, 0), [shoppingCartList])

  return (
    <>
      <h4 className='mb-3'>訂單摘要</h4>
      <hr />
      <div className="order-form">
        <div className="d-flex justify-content-between pt-3">
          <p>總量</p>
          <p> {cartTotalQty} </p>
        </div>
        <div className="d-flex justify-content-between pb-3">
          <p>總計</p>
          <p> ${formatNumber(cartTotal)} </p>
        </div>
        <hr />
        <div className="d-flex justify-content-between mb-6">
          <h4>訂單總額</h4>
          <h4> ${formatNumber(cartTotal)} </h4>
        </div>
        <Link className="btn btn-primary text-center h5" to={'/checkout'}>前往結帳</Link>
      </div>
    </>
  )
}

OrderDetail.propTypes = {
  shoppingCartList: PropTypes.array
}