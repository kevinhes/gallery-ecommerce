import axios from "axios";
// import Swal from 'sweetalert2'
import { getCookie, checkIsLogin } from "../../helpers/auth";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from "react";
import { Modal } from 'bootstrap';
import AddProductModal from "../../components/addProductModal";

export default function ProductsList() {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const api = import.meta.env.VITE_API_PATH;
  const getProductsUrl = `${baseUrl}v2/api/${api}/admin/products/all`
  const navigate =  useNavigate()
  const cookies = document.cookie.split(';');
  const hexToken = getCookie(cookies)

  const [productsList, setProductsList] = useState([])
  const [ isLogin, setIsLogin ] = useState(false)
  // const [ tempProduct, setTempProduct ] = useState(null)
  const productModalRef = useRef(null)

  const getProductsList = async() => {
    try {
      const response = await axios.get(getProductsUrl, {
        headers: { Authorization: hexToken },
      })
      const { products } = response.data
      setProductsList(products)
      console.log(productsList);
    } catch(error) {
      console.log(error);
      
    }
  }

  const openModal = function() {
    productModalRef.current.show()
  }

  const closeModal = function() {
    productModalRef.current.hide()
  }

  useEffect(() => {
    const verifyLogin = async () => {
      await checkIsLogin(hexToken, navigate);
      setIsLogin(true);
    };
    verifyLogin();
  });

  useEffect(() => {
    if ( isLogin ) {
      getProductsList()
    }
  }, [isLogin])

  useEffect(() => {
    productModalRef.current = new Modal(document.querySelector('#productModalRef'), {
      backdrop:'static'
    })
  }, [])

  return (
    <div>
      <header className="d-flex justify-content-between">
        <h1>產品列表</h1>
        <div>
          <button type="button" className="btn btn-primary" onClick={openModal}>新增產品</button>
        </div>
      </header>
      <AddProductModal closeModal={closeModal} />
    </div>
  )
}