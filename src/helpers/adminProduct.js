import axios from "axios";
import { getCookie } from "./auth";
import Swal from 'sweetalert2'
const baseUrl = import.meta.env.VITE_API_BASE_URL;
const api = import.meta.env.VITE_API_PATH;

export const deleteProduct = async(productId, closeModal) => {
  console.log(productId);
  
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
      getProductsList()
      closeModal()
    }
  } catch(error) {
    Swal.fire({
      title: error.response.data.message,
      icon: 'warning',
      timer: 1500,
      showConfirmButton: false,
    })
  }
}

export const getProductsList = async() => {
  const getProductsUrl = `${baseUrl}v2/api/${api}/admin/products/all`
  const cookies = document.cookie.split(';');
  const hexToken = getCookie(cookies)
  try {
    const response = await axios.get(getProductsUrl, {
      headers: { Authorization: hexToken },
    })
    const { products } = response.data
    const productsArray = Object.values(products)
    return productsArray
  } catch(error) {
    Swal.fire({
      title: error.response.data.message,
      icon: 'warning',
      timer: 1500,
      showConfirmButton: false,
    })
    
  }
}

export const getProductsListByPage = async(page = 1, maxPage) => {
  if ( page === 0 || page > maxPage ) return
  const getProductsUrl = `${baseUrl}v2/api/${api}/admin/products?page=${page}`
  console.log(getProductsUrl);
  
  const cookies = document.cookie.split(';');
  const hexToken = getCookie(cookies)
  try {
    const response = await axios.get(getProductsUrl, {
      headers: { Authorization: hexToken },
    })
    
    const { products } = response.data
    const { pagination } = response.data
    // const productsArray = Object.values(products)
    return {
      products,
      pagination
    }
  } catch(error) {
    Swal.fire({
      title: error.response.data.message,
      icon: 'warning',
      timer: 1500,
      showConfirmButton: false,
    })
    
  }
}

export const addNewProduct = async(newProduct, closeModal) => {
  const addProductUrl = `${baseUrl}v2/api/${api}/admin/product`
  const cookies = document.cookie.split(';');
  const hexToken = getCookie(cookies)
  try {
    const response = await axios.post(addProductUrl,{
      data: {
        ...newProduct
      }},
      {
        headers: { Authorization: hexToken },
      }
    )
    if( response.data.success ) {
      await Swal.fire({
        title: '已新增商品',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
      })
    }
    closeModal()
    getProductsListByPage()
  } catch(error) {
    Swal.fire({
      title: error.response.data.message,
      icon: 'warning',
      timer: 1500,
      showConfirmButton: false,
    })
  }
}

export const editProduct = async(newProduct, closeModal) => {
  const editProductUrl = `${baseUrl}v2/api/${api}/admin/product/${newProduct.id}`
  const cookies = document.cookie.split(';');
  const hexToken = getCookie(cookies)
  try {
    const response = await axios.put(editProductUrl,{
      data: {
        ...newProduct
      }},
      {
        headers: { Authorization: hexToken },
      }
    )
    if( response.data.success ) {
      await Swal.fire({
        title: '已編輯商品',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
      })
    }
    closeModal()
  } catch(error) {
    Swal.fire({
      title: error.response.data.message,
      icon: 'warning',
      timer: 1500,
      showConfirmButton: false,
    })
  }
}