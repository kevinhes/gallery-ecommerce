import PropTypes from 'prop-types'

export default function ShoppingCartList( { shoppingCart, deleteProduct, handleEditShoppingCart } ) {
  return (
    <ul className="list-unstyled">
      {
        shoppingCart.map( ( cartItem ) => {
          return (
            <li key={cartItem.id} className="shopping-cart-card">
              <div className="card-img-wrap">
                <img src={cartItem.product.imageUrl} alt="product image" className="w-100" />
              </div>
              <div className="d-flex align-items-center flex-grow-1">
                <div className="w-65">
                  <h5 className="mb-2">
                    {cartItem.product.title}
                  </h5>
                  <p>
                  {cartItem.product.content}
                  </p>
                </div>
                <div className="w-15 d-flex align-items-center">
                  <button type="button" onClick={() => handleEditShoppingCart(cartItem.id, cartItem.qty - 1)}>
                    <i className="bi bi-dash-lg"></i>
                  </button>
                  <h4 className='mx-3'>
                  {cartItem.qty}
                  </h4>
                  <button type="button" onClick={() => handleEditShoppingCart(cartItem.id, cartItem.qty + 1)}>
                    <i className="bi bi-plus-lg"></i>
                  </button>
                </div>
                <div className="w-15">
                  <h4>${cartItem.final_total}</h4>
                </div>
                <div className="flex-grow-1">
                  <button type="button" onClick={() => deleteProduct(cartItem.id)}>
                    <i className="bi bi-trash fs-3 text-danger"></i>
                  </button>
                </div>
              </div>
            </li>
          )
        } )
      }
    </ul>
  )
}

ShoppingCartList.propTypes = {
  shoppingCart: PropTypes.array,
  deleteProduct: PropTypes.func,
  handleEditShoppingCart: PropTypes.func,
};