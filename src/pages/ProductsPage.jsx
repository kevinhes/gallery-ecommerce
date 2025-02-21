import { useEffect, useState } from "react";
import ReactLoading from 'react-loading';

// custom library
import { getProductsList } from "../helpers/product";

// components
import ProductsList from "../components/products/productsList";


export default function ProductsPage() {
  const [ productList, setProductList ] = useState([])
  const [ isLoading, setIsLoading ] = useState(false)

  const handleProductList = async( page = 1 ) => {
    setIsLoading(true)
    const products = await getProductsList( page )
    setProductList(products)
    setIsLoading(false)
  }

  useEffect(()=> {
    handleProductList()
  }, [])

  return (
    <>
      <section className="container position-relative">
        <h1 className="mb-5">Product list</h1>
        {
          isLoading === true ?
            <div className="w-100 vh-100 d-flex justify-content-center align-items-center">
              <ReactLoading type="spin" color="#4F46E5" />
            </div>
            :
            <ProductsList productList={productList} />
        }
      </section>
    </>
  )
}