import axios from "axios";
// import Swal from 'sweetalert2'
const baseUrl = import.meta.env.VITE_API_BASE_URL;
const api = import.meta.env.VITE_API_PATH;

export const getProductsList = async ( page = 1 ) => {
  const getProductsUrl = `${baseUrl}v2/api/${api}/products?page=${page}`
  try {
    const response = await axios.get(getProductsUrl)
    const { products } = response.data
    return products
    
  } catch (error) {
    console.log(error);
    
  }
}

export const getProduct = async ( id ) => {
  const getProductsUrl = `${baseUrl}v2/api/${api}/product/${id}`
  try {
    const response = await axios.get(getProductsUrl)
    const { product } = response.data
    console.log(product);
    
    return product
    
  } catch (error) {
    console.log(error);
  }
}