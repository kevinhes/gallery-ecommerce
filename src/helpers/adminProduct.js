import axios from "axios";
import { getCookie } from "./auth";
import Swal from 'sweetalert2'
const baseUrl = import.meta.env.VITE_API_BASE_URL;
const api = import.meta.env.VITE_API_PATH;

export const deleteProduct = async(productId, setProductsList) => {
  const deleteProductUrl = `${baseUrl}v2/api/${api}/admin/product/${productId}`
  const cookies = document.cookie.split(';');
  const hexToken = getCookie(cookies)
  try {
    const response = await axios.delete(deleteProductUrl, {
      headers: { Authorization: hexToken },
    })
    if( response.data.success ) {
      await Swal.fire({
        title: '產品已刪除',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
      })
    }
    getProductsList(setProductsList)
  } catch(error) {
    console.log(error);
    
  }
}

export const getProductsList = async( setProductsList ) => {
  const getProductsUrl = `${baseUrl}v2/api/${api}/admin/products/all`
  const cookies = document.cookie.split(';');
  const hexToken = getCookie(cookies)
  try {
    const response = await axios.get(getProductsUrl, {
      headers: { Authorization: hexToken },
    })
    const { products } = response.data
    const productsArray = Object.values(products)
    setProductsList(productsArray)
  } catch(error) {
    console.log(error);
    
  }
}
