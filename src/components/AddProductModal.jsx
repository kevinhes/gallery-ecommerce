import { useState } from 'react'
import PropTypes from 'prop-types'

export default function AddProductModal({ closeModal }) {
  const [ tempNewProduct, setTempNewProduct ] = useState({
    "title": "",
    "category": "",
    "origin_price": 0,
    "price": 0,
    "unit": "",
    "description": "",
    "content": "",
    "is_enabled": 0,
    "imageUrl": "",
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


  return (
    <div className="modal fade" id="productModalRef" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h1 className="modal-title fs-5" id="exampleModalLabel">新增產品</h1>
          <button type="button" className="btn-close" aria-label="Close" onClick={()=> closeModal()}></button>
        </div>
        <div className="modal-body">
          <div className='mb-4'>
            <label htmlFor="title">產品名稱</label>
            <input type="text" id='title' name='title' value={tempNewProduct.title} className='form-control' onChange={(event) => {handleTempProduct(event)}} />
          </div>
          <input type="text" value={tempNewProduct.category} name='category' className='form-control' onChange={(event) => {handleTempProduct(event)}} />
          <input type="number" value={tempNewProduct.price} name='price' className='form-control' onChange={(event) => {handleTempProduct(event)}} />
          <input type="number" value={tempNewProduct.origin_price} name='origin_price' className='form-control' onChange={(event) => {handleTempProduct(event)}} />
          <input type="text" value={tempNewProduct.unit} name='unit' className='form-control' onChange={(event) => {handleTempProduct(event)}} />
          <input type="text" value={tempNewProduct.description} name='description' className='form-control' onChange={(event) => {handleTempProduct(event)}} />
          <input type="text" value={tempNewProduct.content} name='content' className='form-control' onChange={(event) => {handleTempProduct(event)}} />
          <input type="checkbox" name='is_enabled' className='' onChange={(event) => {handleTempProduct(event)}} />
          <input type="text" value={tempNewProduct.imageUrl} name='imageUrl' className='form-control' onChange={(event) => {handleTempProduct(event)}} />
          <p>
            {JSON.stringify(tempNewProduct)}
          </p>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={()=> closeModal()}>Close</button>
        </div>
      </div>
    </div>
  </div>
  )
}

AddProductModal.propTypes = {
  closeModal: PropTypes.func, // 如果 closeModal 是必填的
};
