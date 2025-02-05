import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { deleteProduct } from '../../helpers/adminProduct'


export default function DeleteProductModal({ closeDeleteProductModal, tempProduct }) {

  const [ tempNewProduct, setTempNewProduct ] = useState({
    "title": "",
    "category": "",
    "origin_price": 0,
    "price": 0,
    "unit": "",
    "description": "",
    "content": "",
    "is_enabled": 0,
    "imageUrl": "https://fakeimg.pl/1024x1024/",
    imagesUrl:[]
  })


  useEffect(()=> {
    setTempNewProduct(tempProduct)
  },[tempProduct])


  return (
    <div className="modal fade" id="deleteProductModalRef" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog modal-m">
      <div className="modal-content">
        <div className="modal-header">
          <h1 className="modal-title fs-5" id="exampleModalLabel">刪除商品</h1>
          <button type="button" className="btn-close" aria-label="Close" onClick={()=> closeDeleteProductModal()}></button>
        </div>
        <div className="modal-body">
          <h3>確定刪除{tempNewProduct.title}？</h3>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={()=> closeDeleteProductModal()}>關閉</button>
          <button type="button" onClick={() =>deleteProduct(tempNewProduct.id, closeDeleteProductModal)} className='btn btn-danger'>刪除</button>
        </div>
      </div>
    </div>
  </div>
  )
}

DeleteProductModal.propTypes = {
  closeDeleteProductModal: PropTypes.func, // 如果 closeModal 是必填的
  getProductsList: PropTypes.func,
  modalType: PropTypes.string,
  tempProduct: PropTypes.array,
  setProductsList: PropTypes.func,
};
