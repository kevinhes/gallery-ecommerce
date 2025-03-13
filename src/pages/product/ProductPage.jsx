import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ReactLoading from 'react-loading';

// custom library
import { getProduct } from '../../helpers/product';
import { addProductToCart } from '../../helpers/shoppingCart';

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState('');
  const [qty, setQty] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleProduct = async (id) => {
    const productDetail = await getProduct(id);
    setProduct(productDetail);
  };

  const handelQty = (num) => {
    if ( num <= 0 ) return
    setQty(num)
  }

  const handleAddProduct = async (product_id, qty = 1) => {
    setIsLoading(true);
    await addProductToCart(product_id, qty);
    setIsLoading(false);
  };

  useEffect(() => {
    handleProduct(id);
  }, []);

  return (
    <>
      <section className='paintion-banner'>
        <div className="container position-relative z-index-100">
          <div className="row">
            <div className="offset-2 col-8">
              <h1 className='text-light mb-10'>{product.title}</h1>
            </div>
          </div>
          <div className="row">
            <div className="offset-3 col-6">
              <img src={product.imageUrl} alt="" className='w-100 p-5 bg-light rounded-4' />
            </div>
          </div>
        </div>
        <div className="bg-filter"></div>
        <div className="banner-bg">
          <img src={product.imageUrl} alt={product.title} />
        </div>
      </section>
      <section className="container py-20">
        {isLoading === true && (
          <div className="full-screen-loading">
            <ReactLoading />
          </div>
        )}
        <div className="row mb-12">
          <div className="offset-2 col-8">
            <h3>畫作描述</h3>
            <hr />
            <div>
              <p className='mb-5'>作者：<span>{product.content}</span></p>
              <p>{product.description}</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="offset-2 col-8">
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <p>
                  價格：
                </p>
                <h2>
                  {product.price}
                </h2>
              </div>
              <div className="d-flex align-items-center">
                <div className='d-flex me-5'>
                  <button type="button" className='me-3' onClick={() => handelQty(qty - 1)}>
                    <i className="bi bi-dash-lg"></i>
                  </button>
                  <h3 className='me-3'>
                    { qty }
                  </h3>
                  <button type="button" onClick={() => handelQty(qty + 1)}>
                    <i className="bi bi-plus-lg"></i>
                  </button>
                </div>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleAddProduct(product.id, qty)}
                >
                  加入購物車
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
