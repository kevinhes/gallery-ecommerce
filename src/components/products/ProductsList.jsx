import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// redux
import { useDispatch, useSelector } from "react-redux";
import { addProductToCart } from '../../slice/shoppingCartSlice';
import { getFrontProductsListByPage, getFrontProductsList } from '../../slice/frontendProductsSlice';
import { useEffect, useMemo } from 'react';

// component
import Pagination from './Pagination'

export default function ProductsList({ productsList }) {
  const allProductsList = useSelector((state) => state.frontendProducts.allProductsList);
  const pagination = useSelector((state) => state.frontendProducts.pagination);

  const allCategory = useMemo(() => {
    const caregory = new Set(allProductsList.map((item) => item.category))
    return [...caregory]
  }, [allProductsList])

  const dispatch = useDispatch()

  const handleAddProductToCart = async (payload) => {
    dispatch(addProductToCart(payload))
  }

  const handleGetProductsList = async(payload) => {
    dispatch(getFrontProductsListByPage(payload))
  }

  useEffect(() => {
    dispatch(getFrontProductsList())
  }, [])

  return (
    <div className="row">
      <div className="col-3">
        <ul className='list-unstyled list'>
          <li className='list-item'>依流派選擇</li>
          {
            allCategory.map((category) => (
              <li key={category} className='list-item'>
                <button type='button' className='p-0' onClick={() => handleGetProductsList({category})}>
                  {category}
                </button>
              </li>
            ))
          }
        </ul>
      </div>
      <ul className="list-unstyled col-9 grid gap-8 mb-10">
        {
          productsList.map((painting) => (
            <li key={painting.id} className="g-col-6">
              <div className="card painting-card product-card">
                <div className="card-img-wrap">
                  <img
                    src={painting.imageUrl}
                    alt={painting.title}
                  />
                </div>
                <div className="card-body">
                  <h5 className="mb-3">{painting.title}</h5>
                  <p className="text-clamp-2 mb-5">{painting.description}</p>
                  <div className="d-flex justify-content-end">
                    <Link to={`/product/${painting.id}`} className="btn btn-outline-dark me-2">查看詳情</Link>
                    <button type="button" className="btn btn-dark" onClick={() => handleAddProductToCart({ product_id: painting.id, qty: 1 })}>加入購物車</button>
                  </div>
                </div>
              </div>
            </li>
          ))
        }
      </ul>
      <div className="d-flex justify-content-center">
        <Pagination pagination={ pagination } changeProductPage={handleGetProductsList}></Pagination>
      </div>
    </div>
  );
}

ProductsList.propTypes = {
  productsList: PropTypes.array,
};
