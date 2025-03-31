// react router components
import { Link, useNavigate } from "react-router-dom"

// react hook
import { useEffect, useRef, useState } from "react";

// redux
import { useSelector, useDispatch } from "react-redux";
import { getOrdersList } from "../../slice/adminOrdersSlice";

// custome library
import { getCookie } from "../../helpers/auth";
import { checkIsLogin } from "../../helpers/auth";
import { formatNumber } from "../../helpers/helper";
const baseUrl = import.meta.env.VITE_API_BASE_URL;
const api = import.meta.env.VITE_API_PATH;

// library
import axios from "axios";
import Swal from "sweetalert2";
import { Modal } from 'bootstrap';

// components
// import Pagination from '../../components/adminproduct/Pagination';
import OrderDetailModal from "../../components/adminOrder/OrderDetailModal";

export default function OrderDashboard() {
  // get redux
  const dispatch = useDispatch()
  const ordersList = useSelector((state) => state.adminOrders.ordersList)

  const navigate = useNavigate()

  // order modal
  const [ tempOrder, setTempOrder ] = useState(null)
  const orderModalRef = useRef(null);
  const openOrderModal = (order) => {
    setTempOrder(order)
    orderModalRef.current.show()
  }
  const closeOrderModal = () => {
    orderModalRef.current.hide()
  }

  // edit news
  const editPublicStatus = async (news, status) => {
    const newsStatus = status ? true : false
    const { id, title, description, image, author } = news
    const { content } = await getSingleNews(id)

    const cookies = document.cookie.split(';');
    const hexToken = getCookie(cookies);
    try {
      await axios.put(`${baseUrl}v2/api/${api}/admin/article/${id}`,
        {
          "data": {
            title,
            description,
            image,
            "tag": [
              "tag1"
            ],
            "create_at": Date.now(),
            author,
            "isPublic": newsStatus,
            content
          }
        },
        {
          headers: { Authorization: hexToken },
        }
      )
      // dispatch(getNewsList())
    } catch (error) {
      Swal.fire({
        title: error.response.data.message,
        icon: 'warning',
        timer: 1500,
        showConfirmButton: false,
      });
    }
  }

  // delete news
  const deleteNews = async (id) => {
    const cookies = document.cookie.split(';');
    const hexToken = getCookie(cookies);
    try {
      await axios.delete(`${baseUrl}v2/api/${api}/admin/article/${id}`, { headers: { Authorization: hexToken } })
      // dispatch(getNewsList())
    } catch (error) {
      Swal.fire({
        title: error.response.data.message,
        icon: 'warning',
        timer: 1500,
        showConfirmButton: false,
      });

    }
  }

  useEffect(() => {
    (async () => {
      await checkIsLogin(navigate)
      await dispatch(getOrdersList()).unwrap()
    })();
    orderModalRef.current = new Modal(
      document.querySelector('#orderModalRef'),
      {
        backdrop: 'static',
      }
    );
  }, [])

  return (
    <>
      <header className="d-flex justify-content-between align-items-center">
        <h1>訂單管理</h1>
        <div>
          <Link
            to={'/dashboard/add-news'}
            className="btn btn-primary"
          >
            新增文章
          </Link>
        </div>
      </header>
      <section>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">客戶</th>
              <th scope="col">客戶 Email</th>
              <th scope="col">聯絡電話</th>
              <th scope="col">運送地址</th>
              <th scope="col">是否已付款</th>
              <th scope="col">訂單金額</th>
              <th scope="col">動作</th>
            </tr>
          </thead>
          <tbody>
            {ordersList.map((order, index) => (
              <tr
                key={order.id}
                className={order.is_paid ? '' : 'table-secondary'}
              >
                <td> {index + 1} </td>
                <td> {order.user.name} </td>
                <td> {order.user.email} </td>
                <td> {order.user.tel} </td>
                <td> {order.user.address} </td>
                <td> {order.is_paid ? '是' : '否'} </td>
                <td> {formatNumber(order.total)} </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-warning"
                    onClick={() => openOrderModal(order)}
                  >
                    訂單詳情
                  </button>
                  <button type="button" className="btn btn-danger">刪除</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* <Pagination
                pagination={pagination}
                changeProductPage={changeProductPage}
              /> */}
      </section>
      <OrderDetailModal
        tempOrder={tempOrder}
        closeOrderModal={closeOrderModal}
      />
    </>
  )
}