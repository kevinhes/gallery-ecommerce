import { Link } from 'react-router-dom';

export default function FrontNavbar() {
  return (
    <nav className="front-navbar">
      <Link to="/" className='px-3 py-md-0'>
        <i className="bi bi-house-door-fill fs-3"></i>
      </Link>
      <Link to="/products" className='px-3 py-md-0'>
        <i className="bi bi-palette-fill fs-3"></i>
      </Link>
      <Link to="/shopping-cart" className='px-3 py-md-0'>
        <i className="bi bi-cart-fill fs-3"></i>
      </Link>
      <Link to="/news" className='px-3 py-md-0'>
        <i className="bi bi-newspaper fs-3"></i>
      </Link>
      {/* <Link to="/login">登入頁</Link> */}
    </nav>
  );
}