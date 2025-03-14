import PropTypes from 'prop-types';
import { formatNumber } from '../../helpers/helper';

export default function ShoppingCartList({
  shoppingCartList,
  deleteProduct,
  handleEditShoppingCart,
}) {
  return (
    <>
      <h4 className='mb-3'>商品資料</h4>
      <hr />
      <ul className="list-unstyled mb-10">
        {shoppingCartList.map((cartItem) => {
          return (
            <li key={cartItem.id} className="shopping-cart-card">
              <div className="card-img-wrap">
                <img
                  src={cartItem.product.imageUrl}
                  alt="product image"
                  className="w-100"
                />
              </div>
              <div className="d-flex align-items-center flex-grow-1">
                <div className="w-35">
                  <h5 className="mb-2">{cartItem.product.title}</h5>
                  <p>作者：{cartItem.product.content}</p>
                </div>
                <div className="w-20 me-5">單價：{formatNumber(cartItem.product.price)}</div>
                <div className="w-30 d-flex align-items-center me-5">
                  <p className='me-3'>數量</p>
                  <button
                    type="button"
                    onClick={() =>
                      handleEditShoppingCart({ cart_id:cartItem.id ,product_id:cartItem.product.id, qty:cartItem.qty - 1})
                    }
                  >
                    <i className="bi bi-dash-lg"></i>
                  </button>
                  <h4 className="mx-3">{cartItem.qty}</h4>
                  <button
                    type="button"
                    onClick={() =>
                      handleEditShoppingCart({cart_id:cartItem.id ,product_id:cartItem.product.id, qty:cartItem.qty + 1})
                    }
                  >
                    <i className="bi bi-plus-lg"></i>
                  </button>
                </div>
                <div className="w-25">
                  <h4>總價 ${ formatNumber(cartItem.final_total)}</h4>
                </div>
                <div className="flex-grow-1">
                  <button
                    type="button"
                    onClick={() => deleteProduct({product_id:cartItem.id})}
                  >
                    <i className="bi bi-trash fs-3 text-danger"></i>
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}

ShoppingCartList.propTypes = {
  shoppingCartList: PropTypes.array,
  deleteProduct: PropTypes.func,
  handleEditShoppingCart: PropTypes.func,
};
