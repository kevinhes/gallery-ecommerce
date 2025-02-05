import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { addNewProduct, editProduct } from '../../helpers/adminProduct';


export default function AddProductModal({ closeProductModal, modalType, tempProduct }) {

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

  const handleTempProduct = (event) => {
    const { name, value } = event.target
    if(['price', 'origin_price'].includes(name)) {
      setTempNewProduct({
        ...tempNewProduct,
        [name]: Number(value)
      })
    } else if( name === 'is_enabled' ) {
      setTempNewProduct({
        ...tempNewProduct,
        [name]: +event.target.checked
      })
    } else {
      setTempNewProduct({
        ...tempNewProduct,
        [name]: value
      })
    } 
  }


  useEffect(()=> {
    if(modalType === 'edit') {
      setTempNewProduct(tempProduct)
    } else if(modalType === 'create') {
      setTempNewProduct({
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
    }
    
  },[modalType, tempProduct])


  return (
    <div className="modal fade" id="productModalRef" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog modal-xl">
      <div className="modal-content">
        <div className="modal-header">
          <h1 className="modal-title fs-5" id="exampleModalLabel">{ modalType === 'create' ? '新增商品' : '編輯商品' }</h1>
          <button type="button" className="btn-close" aria-label="Close" onClick={()=> closeProductModal()}></button>
        </div>
        <div className="modal-body">
          <div className="d-flex justify-content-between">
            <div className='w-50 me-5'>
              <img src={tempNewProduct.imageUrl} alt="" className='img-fluid mb-3' />
              <label htmlFor="imageUrl">商品網址</label>
              <input type="text" id='imageUrl' value={tempNewProduct.imageUrl} name='imageUrl' className='form-control' onChange={(event) => {handleTempProduct(event)}} />
            </div>
            <div className='w-100'>
              {/* 產品名稱 */}
              <label htmlFor="title" className='mb-2'>產品名稱</label>
              <div className='d-flex justify-content-between align-items-center mb-4'>
                <div className='w-70'>
                  <input type="text" id='title' name='title' value={tempNewProduct.title} className='form-control' onChange={(event) => {handleTempProduct(event)}} />
                </div>
                <div className="form-check form-switch w-25">
                  <input className="form-check-input" checked={tempNewProduct.is_enabled === 1}  type="checkbox" role="switch" name='is_enabled' id="isEnabled" onChange={(event) => {handleTempProduct(event)}} />
                  <label className="form-check-label" htmlFor="isEnabled" >是否啟用</label>
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="category" className='mb-2'>產品分類</label>
                <input type="text" id='category' value={tempNewProduct.category} name='category' className='form-control' onChange={(event) => {handleTempProduct(event)}} />
              </div>
              <div className="d-flex justify-content-between mb-4">
                <div className="w-30">
                  <label htmlFor="price">售價</label>
                  <input type="number" id='price' value={tempNewProduct.price} name='price' className='form-control' onChange={(event) => {handleTempProduct(event)}} />
                </div>
                <div className="w-30">
                  <label htmlFor="originPrice">原始價格</label>
                  <input type="number" id='originPrice' value={tempNewProduct.origin_price} name='origin_price' className='form-control' onChange={(event) => {handleTempProduct(event)}} />
                </div>
                <div className="w-30">
                  <label htmlFor="unit">單位</label>
                  <input type="text" id='unit' value={tempNewProduct.unit} name='unit' className='form-control' onChange={(event) => {handleTempProduct(event)}} />
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="description" className='mb-3'>描述</label>
                <textarea
                  id="description"
                  rows='5'
                  name='description'
                  className='form-control'
                  onChange={(event) => {handleTempProduct(event)}}
                  value={tempNewProduct.description}
                >
                </textarea>
              </div>
              <div className="mb-4">
                <label htmlFor="content" className='mb-3'>作者</label>
                <input type="text" id='content' name='content' className='form-control' onChange={(event) => {handleTempProduct(event)}} value={tempNewProduct.content} />
              </div>

            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={()=> closeProductModal()}>關閉</button>
          {
            modalType === 'create' ?
              (<button type="button" onClick={() =>addNewProduct(tempNewProduct, closeProductModal)} className='btn btn-primary'>新增</button>) :
              (<button type="button" onClick={() =>editProduct(tempNewProduct, closeProductModal)} className='btn btn-primary'>編輯</button>)
          }
        </div>
      </div>
    </div>
  </div>
  )
}

AddProductModal.propTypes = {
  closeProductModal: PropTypes.func, // 如果 closeProductModal 是必填的
  getProductsList: PropTypes.func,
  modalType: PropTypes.string,
  tempProduct: PropTypes.array,
  setProductsList: PropTypes.func,
};
