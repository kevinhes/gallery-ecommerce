// Outlet 是給巢狀路由放畫面的元件
// link 就是站內的 a 連結（簡單地說）
import { Outlet, Link } from 'react-router-dom'


function Dashboard() {
  return (
    <>
      <section className="">
          <section className='dashboard-navbar'>
            <Link to='/dashboard' className='d-block mb-3'>
              <i className="bi bi-house-fill text-light fs-3"></i>
            </Link>
            <Link to='/dashboard/products-list' className='d-block'>
              <i className="bi bi-archive-fill text-light fs-3"></i>
            </Link>
          </section>
          <section className='ps-20 pt-10 pe-10'>
            <Outlet></Outlet>
          </section>
      </section>
    </>
  )
}

export default Dashboard
