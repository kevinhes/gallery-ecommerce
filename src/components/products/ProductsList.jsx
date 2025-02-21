import PropTypes from 'prop-types'
import { Link } from "react-router-dom";

export default function ProductsList( { productList } ) {
  return (
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
  )
}

ProductsList.propTypes = {
  productList: PropTypes.array,
};
