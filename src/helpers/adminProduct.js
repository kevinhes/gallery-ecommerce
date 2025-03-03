import axios from 'axios';
import { getCookie } from './auth';
import Swal from 'sweetalert2';
const baseUrl = import.meta.env.VITE_API_BASE_URL;
const api = import.meta.env.VITE_API_PATH;

export const deleteProduct = async (productId) => {
  const deleteProductUrl = `${baseUrl}v2/api/${api}/admin/product/${productId}`;
  const cookies = document.cookie.split(';');
  const hexToken = getCookie(cookies);
  try {
    const response = await axios.delete(deleteProductUrl, {
      headers: { Authorization: hexToken },
    });
    const renewProductsList = {
      data: await getProductsListByPage(),
      result: true,
      response,
    };
    return renewProductsList;
  } catch (error) {
    const result = {
      data: error,
      result: false,
    };
    return result;
  }
};

export const getProductsList = async () => {
  const getProductsUrl = `${baseUrl}v2/api/${api}/admin/products/all`;
  const cookies = document.cookie.split(';');
  const hexToken = getCookie(cookies);
  try {
    const response = await axios.get(getProductsUrl, {
      headers: { Authorization: hexToken },
    });
    const { products } = response.data;
    const productsArray = Object.values(products);
    return productsArray;
  } catch (error) {
    alert(error.response.data.message);
  }
};

export const getProductsListByPage = async (page = 1, maxPage) => {
  if (page === 0 || page > maxPage) return;
  const getProductsUrl = `${baseUrl}v2/api/${api}/admin/products?page=${page}`;
  const cookies = document.cookie.split(';');
  const hexToken = getCookie(cookies);
  try {
    const response = await axios.get(getProductsUrl, {
      headers: { Authorization: hexToken },
    });

    const { products } = response.data;
    const { pagination } = response.data;
    // const productsArray = Object.values(products)
    return {
      products,
      pagination,
    };
  } catch (error) {
    Swal.fire({
      title: error.response.data.message,
      icon: 'warning',
      timer: 1500,
      showConfirmButton: false,
    });
  }
};

export const addNewProduct = async (newProduct) => {
  const addProductUrl = `${baseUrl}v2/api/${api}/admin/product`;
  const cookies = document.cookie.split(';');
  const hexToken = getCookie(cookies);
  try {
    const response = await axios.post(
      addProductUrl,
      {
        data: {
          ...newProduct,
        },
      },
      {
        headers: { Authorization: hexToken },
      }
    );
    const renewProductsList = {
      data: await getProductsListByPage(),
      result: true,
      response,
    };
    return renewProductsList;
  } catch (error) {
    const result = {
      data: error,
      result: false,
    };
    return result;
  }
};

export const editProduct = async (newProduct) => {
  const editProductUrl = `${baseUrl}v2/api/${api}/admin/product/${newProduct.id}`;
  const cookies = document.cookie.split(';');
  const hexToken = getCookie(cookies);
  try {
    const response = await axios.put(
      editProductUrl,
      {
        data: {
          ...newProduct,
        },
      },
      {
        headers: { Authorization: hexToken },
      }
    );
    const renewProductsList = {
      data: await getProductsListByPage(),
      result: true,
      response,
    };
    return renewProductsList;
  } catch (error) {
    const result = {
      data: error,
      result: false,
    };
    return result;
  }
};

export const uploadImage = async (event) => {
  const uploadImageUrl = `${baseUrl}v2/api/${api}/admin/upload`;
  const cookies = document.cookie.split(';');
  const hexToken = getCookie(cookies);
  const uploadFile = event.target.files[0];
  if (!uploadFile) return;
  const formData = new FormData();
  formData.append('file-to-upload', uploadFile);

  try {
    const response = await axios.post(uploadImageUrl, formData, {
      headers: { Authorization: hexToken },
    });
    return response;
  } catch (error) {
    alert(error.response.data.message);
  }
};
