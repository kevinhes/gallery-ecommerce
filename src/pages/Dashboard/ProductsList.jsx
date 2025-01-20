import { checkIsLogin } from "../../helpers/auth";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from "react";
import { Modal } from 'bootstrap';
import AddProductModal from "../../components/addProductModal";
import { deleteProduct, getProductsList } from "../../helpers/adminProduct";

export default function ProductsList() {
  const navigate =  useNavigate()
  const [ modalType, setModalType ] = useState('create')
  const [ tempProduct, setTempProudct ] = useState({})

  const [productsList, setProductsList] = useState([])
  const [ isLogin, setIsLogin ] = useState(false)
  const productModalRef = useRef(null)

  const openModal = function(modalType, tempProduct) {
    setModalType(modalType);
    setTempProudct(tempProduct)
    productModalRef.current.show()
  }

  const closeModal = function() {
    productModalRef.current.hide()
  }

  useEffect(() => {
    const verifyLogin = async () => {
      await checkIsLogin(navigate);
      setIsLogin(true);
    };
    verifyLogin();
  });

  useEffect(() => {
    if ( isLogin ) {
      getProductsList(setProductsList)
    }
  }, [isLogin])

  useEffect(() => {
    productModalRef.current = new Modal(document.querySelector('#productModalRef'), {
      backdrop:'static'
    })
  }, [])

  return (
    <div>
      <header className="d-flex justify-content-between align-items-center">
        <h1>產品列表</h1>
        <div>
          <button type="button" className="btn btn-primary" onClick={()=>openModal('create', {})}>新增產品</button>
        </div>
      </header>
      <section>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">商品名稱</th>
            <th scope="col">商品售價</th>
            <th scope="col">商品原價</th>
            <th scope="col">是否啟用</th>
            <th scope="col">Handle</th>
          </tr>
        </thead>
        <tbody>
          {productsList.map( (product, index) => (
            <tr key={product.id} className={product.is_enabled === 1 ? '' : 'table-secondary'}>
              <td> {index + 1} </td>
              <td> {product.title} </td>
              <td>{product.origin_price}</td>
              <td>{product.price}</td>
              <td>{product.is_enabled === 1 ? '是' : '否'}</td>
              <td>
                <button type="button" className="btn btn-warning" onClick={()=>openModal('edit', product)}>編輯</button>
                <button type="button" className="btn btn-danger" onClick={()=> deleteProduct(product.id, setProductsList)}>刪除</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
        
      </section>
      <AddProductModal closeModal={closeModal} getProductsList={getProductsList} modalType={modalType} tempProduct={tempProduct} setProductsList={setProductsList}  />
    </div>
  )
}