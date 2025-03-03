import axios from 'axios';
import Swal from 'sweetalert2';
const baseUrl = import.meta.env.VITE_API_BASE_URL;
const api = import.meta.env.VITE_API_PATH;

export const addProductToCart = async (product_id, qty = 1) => {
  const addCartUrl = `${baseUrl}v2/api/${api}/cart`;
  try {
    const response = await axios.post(addCartUrl, {
      data: {
        product_id,
        qty,
      },
    });
    if (response.data.success) {
      await Swal.fire({
        title: '已加入購物車',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getShoppingCart = async () => {
  const addCartUrl = `${baseUrl}v2/api/${api}/cart`;
  try {
    const response = await axios.get(addCartUrl);
    const { carts } = response.data.data;
    return carts;
  } catch (error) {
    console.log(error);
  }
};

export const editProductQty = async (product_id, qty) => {
  const editCartUrl = `${baseUrl}v2/api/${api}/cart/${product_id}`;
  try {
    const response = await axios.put(editCartUrl, {
      data: {
        product_id,
        qty,
      },
    });
    if (response.data.success) {
      await Swal.fire({
        title: '產品數量已調整',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
      });
    }
    const carts = await getShoppingCart();
    return carts;
  } catch (error) {
    console.log(error);
  }
};

export const deleteProductFromShoppingCart = async (id) => {
  const deleteCartUrl = `${baseUrl}v2/api/${api}/cart/${id}`;
  try {
    const response = await axios.delete(deleteCartUrl);
    if (response.data.success) {
      await Swal.fire({
        title: '產品已刪除',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
      });
    }
    const carts = await getShoppingCart();
    return carts;
  } catch (error) {
    console.log(error);
  }
};

export const deleteAllProduct = async () => {
  const deleteCartUrl = `${baseUrl}v2/api/${api}/carts`;
  try {
    const response = await axios.delete(deleteCartUrl);
    if (response.data.success) {
      await Swal.fire({
        title: '購物車已清空',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
      });
    }
    const carts = await getShoppingCart();
    return carts;
  } catch (error) {
    console.log(error);
  }
};

export const checkout = async (data) => {
  const checkoutUrl = `${baseUrl}v2/api/${api}/order`;
  console.log(data);

  const orderInfo = {
    data: {
      user: {
        name: data.name,
        email: data.email,
        tel: data.tel,
        address: data.address,
      },
      message: data.message,
    },
  };

  try {
    const response = await axios.post(checkoutUrl, {
      ...orderInfo,
    });
    await Swal.fire({
      title: response.data.message,
      icon: 'success',
      timer: 1500,
      showConfirmButton: false,
    });
    const carts = await getShoppingCart();
    return carts;
  } catch (error) {
    Swal.fire({
      title: error.response.data.message,
      icon: 'error',
      confirmButtonText: '確認',
    });
  }
};
