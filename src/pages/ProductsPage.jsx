// hook
import { useEffect, useState, useMemo } from 'react';

// reudx
import { useDispatch, useSelector } from 'react-redux';
import { getFrontProductsListByPage } from '../slice/frontendProductsSlice';

// libray
import ReactLoading from 'react-loading';

// components
import ProductsList from '../components/products/productsList';

const api = import.meta.env.VITE_API_PATH;

export default function ProductsPage() {
  const productsList = useSelector((state) => state.frontendProducts.productsList)
  const dispatch = useDispatch()
  // const [productList, setProductList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleProductList = async () => {
    setIsLoading(true);
    await dispatch(getFrontProductsListByPage());
    setIsLoading(false);
  };

  const randomProductsList = useMemo(() => {
    if (!productsList.length) return [];

    return [...productsList]
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
  }, [productsList])

  useEffect(() => {
    handleProductList()
  }, []);

  return (
    <>
      <section className='gallery-banner'>
        <section className='container position-relative z-index-100'>
          <div className="row mb-5 mb-mb-10">
            <div className="offset-lg-2 col-lg-8">
              <h1 className='text-light'>畫廊</h1>
            </div>
          </div>
          <div className="row">
            <div className="offset-lg-2 col-lg-8">
              <div className="feature-layout">
                <div className='w-67 me-3'>
                  <img src={randomProductsList[0]?.imageUrl} alt="" className='w-100 h-100 objectfit-cover' />
                </div>
                <div className='w-33 d-flex flex-column justify-content-between'>
                  <img src={randomProductsList[1]?.imageUrl} alt="" className='w-100 mb-3' />
                  <img src={randomProductsList[2]?.imageUrl} alt="" className='w-100' />
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="bg-filter"></div>
        <div className='banner-bg'>
          <img src={`/${api}/images/地中海.jpg`} alt="" />
        </div>
      </section>
      <section className="container position-relative py-10 py-md-25">
        {isLoading === true ? (
          <div className="w-100 vh-100 d-flex justify-content-center align-items-center">
            <ReactLoading type="spin" color="#4F46E5" />
          </div>
        ) : (
          <ProductsList productsList={productsList} />
        )}
      </section>
    </>
  );
}
