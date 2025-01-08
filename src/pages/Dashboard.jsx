// Outlet 是給巢狀路由放畫面的元件
// link 就是站內的 a 連結（簡單地說）
import { Outlet, Link } from 'react-router-dom'

function Dashboard() {
  console.log(1234);
  
  return (
    <>
      <section className="container">
        <div className="row">
          <section className='col-3'>
            <Link to='/dashboard'><h1>Dashboard</h1></Link>
            <Link to='/dashboard/products-list'>產品列表</Link>
          </section>
          <section className='col-9'>
            <Outlet></Outlet>
          </section>
        </div>
      </section>
    </>
  )
}

export default Dashboard
