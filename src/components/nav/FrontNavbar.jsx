import { Link } from "react-router-dom"

export default function FrontNavbar() {
  return (
    <section className="py-5">
      <section className="container">
        <section className="d-flex justify-content-between">
          <div>
            <Link to='/'>Home</Link>
          </div>
          <nav>
            <Link to='/products' className="me-3">產品列表</Link>
            <Link to='/shopping-cart'>購物車</Link>
          </nav>
        </section>
      </section>
    </section>
  )
}