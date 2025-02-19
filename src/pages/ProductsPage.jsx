import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// custom library
import { getProductsList } from "../helpers/product";


export default function ProductsPage() {
  const [ productList, setProductList ] = useState([])

  const handleProductList = async( page = 1 ) => {
    const products = await getProductsList( page )
    setProductList(products)
  }

  useEffect(()=> {
    handleProductList()
  }, [])

  return (
    <>
      <section className="container">
        <h1 className="mb-5">Product list</h1>
        <ul className="list-unstyled row">
          {
            productList.map( product => (
              <li key={product.id} className="col-6 mb-5">
                <Link to={ `/product/${product.id}` }>
                  <div className="product-card">
                    <div className="prodct-card-wrap">
                      <img src={product.imageUrl} alt="" className="prodct-card-img" />
                    </div>
                    <div className="prodct-card-wrap prodct-card-title position-absolute d-flex align-items-end">
                      <p>{product.title}</p>
                    </div>
                    <div className="prodct-card-wrap prodct-card-title prodct-card-category position-absolute d-flex align-items-end">
                      <p>{product.category}</p>
                    </div>
                  </div>
                </Link>
              </li>
            ) )
          }
        </ul>
      </section>
    </>
  )
}