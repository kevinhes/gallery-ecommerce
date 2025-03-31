import PropTypes from "prop-types"
import { useEffect, useState } from "react";

export default function OrderDetailModal({ tempOrder, closeOrderModal }) {
  const [ tempOrderInfo, setTempOrderInfo ] = useState(null)

  const handleTempOrder = (event) => {
    const { name, value } = event.target
    console.log('name', name, 'value', value);
    if ( name === 'is_paid' ) {
      setTempOrderInfo({
        ...tempOrderInfo,
        [name]: +event.target.checked,
      });
    } else {
      const keys = name.split('.');
      setTempOrderInfo({
        ...tempOrderInfo,
        [name]: value,
      });
    }
    
  }
  useEffect(() => {
    setTempOrderInfo(tempOrder)
  }, [tempOrder])
  return (
    <div
      className="modal fade"
      id="orderModalRef"
      tabIndex="-1"
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h4>訂單編號：{tempOrderInfo?.id}</h4>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={() => closeOrderModal()}
            />
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-5">
                <label htmlFor="userName" className="mb-2">顧客姓名</label>
                <input type="text" name='user.name' value={ tempOrderInfo?.user.name } onChange={(event) => {handleTempOrder(event);}} />
              </div>
              <div className="form-check form-switch w-25">
                <input
                  className="form-check-input"
                  checked={tempOrderInfo?.is_paid === 1}
                  type="checkbox"
                  role="switch"
                  name='is_paid'
                  id="isEnabled"
                  onChange={(event) => {
                    handleTempOrder(event);
                  }}
                />
                <label className="form-check-label" htmlFor="isEnabled">
                  是否付款
                </label>
              </div>
            </form>
          </div>
          <div className="modal-footer"></div>
        </div>
      </div>
    </div>
  )
}

OrderDetailModal.propTypes = {
  tempOrder: PropTypes.object,
  closeOrderModal: PropTypes.func
}