import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import ReactLoading from 'react-loading';

// custom library
import { getProduct } from "../../helpers/product"
import { addProductToCart } from "../../helpers/shoppingCart"

export default function ProductPage() {
  const { id } = useParams()
  const [ product, setProduct ] = useState('')
  const [ isLoading, setIsLoading ] = useState(false)

  const handleProduct = async(id) => {
    const productDetail = await getProduct(id)
    setProduct(productDetail)
  }

  const handleAddProduct = async(  product_id, qty = 1 ) => {
    setIsLoading(true)
    await addProductToCart( product_id, qty )
    setIsLoading(false)
  }

  useEffect(()=> {
    handleProduct(id)
  },[])
  
  return (
    <section className="container mt-6">
      {
        isLoading === true &&
        <div className="full-screen-loading">
          <ReactLoading />
        </div>
      }
      <div className="row">
        <div className="col-4 offset-2">
          <img src={product.imageUrl} alt="" className="w-100" />
        </div>
        <div className="col-4 d-flex flex-column justify-content-between">
          <div>
            <h1 className="h2 mb-5">
              {product.title}
            </h1>
            <p className="mb-3">
              <span>作者：</span>
              <span>{product.content}</span>
            </p>
            <p>
              {product.description}
            </p>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <p><span>價格：</span><span>{product.price}</span></p>
            <button type="button" className="btn btn-danger" onClick={() => handleAddProduct(product.id)}>
              加入購物車
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}