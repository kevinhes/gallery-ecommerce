// Outlet 是給巢狀路由放畫面的元件
// link 就是站內的 a 連結（簡單地說）
import { Outlet, Link, useNavigate } from 'react-router-dom';

import Toast from '../components/adminproduct/Toast';

import { logout } from '../helpers/auth';

function Dashboard() {
  const navigate = useNavigate();

  return (
    <>
      <section className="">
        <section className="dashboard-navbar">
          <div>
            <Link to="/dashboard" className="d-block mb-3">
              <i className="bi bi-house-fill text-light fs-3"></i>
            </Link>
            <Link to="/dashboard/products-list" className="d-block mb-3">
              <i className="bi bi-archive-fill text-light fs-3"></i>
            </Link>
            <Link to="/dashboard/news-dashboard" className="d-block mb-3">
              <i className="bi bi-newspaper text-light fs-3"></i>
            </Link>
            <Link to="/dashboard/order-dashboard" className="d-block">
              <i className="bi bi-list-ol text-light fs-3"></i>
            </Link>
          </div>
          <div>
            <button type="button" onClick={() => logout(navigate)}>
              <i className="bi bi-box-arrow-right text-light fs-3"></i>
            </button>
          </div>
        </section>
        <section className="ps-20 pt-10 pe-10">
          <Outlet></Outlet>
        </section>
      </section>

      <Toast />
    </>
  );
}

export default Dashboard;
