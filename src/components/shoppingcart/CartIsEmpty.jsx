// router
import { Link } from "react-router-dom"

export default function CartIsEmpty() {
  return (
    <section className="d-flex justify-content-center align-items-center py-32">
      <div className="text-center">
        <div className="mb-3">
          <i className="bi bi-exclamation-circle-fill text-gray display-1"></i>
        </div>
        <p className="h1 mb-3">購物車內沒有商品</p>
        <p className="h3">
          請至
          <Link to={'/products'} className="d-inline link">畫廊</Link>
          添購商品
        </p>
      </div>
    </section>
  )
}