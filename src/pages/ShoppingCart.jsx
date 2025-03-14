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
          <img src="/images/PicassoGuernica.jpg" alt="" />
        </div>
      </section>
      <section className="container py-20">
        {shoppingCartList.length === 0 ? (
          <CartIsEmpty />
        ) : (
          <div className="row">
            <div className="col-8">
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
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => deleteAllProductFromCart()}
                  >
                    清空購物車
                  </button>
                </>
              )}
            </div>
            <div className="col-4">
              <OrderDetail shoppingCartList={shoppingCartList} />
            </div>
          </div>
        )}
      </section>
    </>
  );
}
