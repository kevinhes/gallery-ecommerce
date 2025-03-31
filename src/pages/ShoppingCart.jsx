import { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';
import Swal from 'sweetalert2';

// redux
import { useSelector, useDispatch } from 'react-redux';

// action
import { getShoppingCart, editProductQty, deleteProductFromShoppingCart, deleteAllProduct } from "../slice/shoppingCartSlice";

//components
import ShoppingCartList from '../components/shoppingcart/ShoppingCartList';
import CartIsEmpty from '../components/shoppingcart/CartIsEmpty';
import OrderDetail from '../components/shoppingcart/OrderDetail';

const api = import.meta.env.VITE_API_PATH;

// page
export default function ShoppingCart() {
  const dispatch = useDispatch()

  const shoppingCartList = useSelector((state) => state.shoppingCart.shoppingCartList);
  const [isCartLoading, setIsCartLoading] = useState(false);

  const handleShoppingCart = async () => {
    setIsCartLoading(true);
    try {
      await dispatch(getShoppingCart()).unwrap(); // ✅ 這樣 `dispatch` 會等 `getShoppingCart` 完成
    } catch (error) {
      console.error("取得購物車失敗:", error);
    }
    setIsCartLoading(false);
  };


  const handleEditShoppingCart = async (payload) => {
    const { qty } = payload
    if (qty <= 0) {
      await Swal.fire({
        title: '產品數量不得為零',
        icon: 'warning',
        timer: 1500,
        showConfirmButton: false,
      });
      return;
    }
    setIsCartLoading(true);
    try {
      await dispatch(editProductQty(payload)).unwrap();
    } catch (error) {
      console.error("修改數量失敗:", error);
    }
    setIsCartLoading(false);
  };

  const deleteProduct = async (payload) => {
    try {
      await dispatch(deleteProductFromShoppingCart(payload)).unwrap()
    } catch (error) {
      console.error("刪除失敗:", error);
    }
  };

  const deleteAllProductFromCart = async () => {
    setIsCartLoading(true);
    try {
      await dispatch(deleteAllProduct()).unwrap()
    } catch (error) {
      console.error("刪除失敗:", error);
    }
    setIsCartLoading(false);
  };



  useEffect(() => {
    handleShoppingCart();
  }, []);

  return (
    <>
      <section className='gallery-banner'>
        <section className='container position-relative z-index-100'>
          <h1 className='text-light'>購物車</h1>
        </section>
        <div className="bg-filter"></div>
        <div className='banner-bg'>
          <img src={`/${api}/images/PicassoGuernica.jpg`} alt="" />
        </div>
      </section>
      <section className="container py-10 py-md-20 shopping-cart-container">
        {shoppingCartList.length === 0 ? (
          <CartIsEmpty />
        ) : (
          <div className="row">
            <div className="col-12 col-lg-8 mb-5 mb-lg-0">
              {isCartLoading === true ? (
                <div className="w-100 vh-100 d-flex justify-content-center align-items-center">
                  <ReactLoading type="spin" color="#4F46E5" />
                </div>
              ) : (
                <>
                  <ShoppingCartList
                    shoppingCartList={shoppingCartList}
                    deleteProduct={deleteProduct}
                    handleEditShoppingCart={handleEditShoppingCart}
                    deleteAllProductFromCart={deleteAllProductFromCart}
                  />
                  <div className="d-flex d-lg-block justify-content-end">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => deleteAllProductFromCart()}
                    >
                      清空購物車
                    </button>
                  </div>
                </>
              )}
            </div>
            <div className="col-lg-4">
              <OrderDetail shoppingCartList={shoppingCartList} />
            </div>
          </div>
        )}
      </section>
    </>
  );
}
