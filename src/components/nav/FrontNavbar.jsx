import { Link } from 'react-router-dom';

export default function FrontNavbar() {
  return (
    <nav className="front-navbar">
      <Link to="/">首頁</Link>
      <Link to="/products" className="me-3">畫廊</Link>
      <Link to="/shopping-cart" className='me-3'>購物車</Link>
      <Link to="/news" className='me-3'>最新消息</Link>
      {/* <Link to="/login">登入頁</Link> */}
    </nav>
  );
}