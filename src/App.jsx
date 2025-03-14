// Routes 是一個使用 children 包裹 Route 的容器
// 元件載入
import { Routes, Route } from 'react-router-dom';

// 樣式表載入
import './assets/scss/main.scss';

// 頁面載入 後台
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import DashboardIndex from './pages/Dashboard/DashboardIndex';
import ProductsList from './pages/Dashboard/ProductsList';
import NewsDashboard from './pages/Dashboard/NewsDashboard';
import NewsDetail from './pages/Dashboard/NewsDashborad/NewsDetail';

// 頁面匯入前台
import ProductsPage from './pages/ProductsPage';
import ProductPage from './pages/product/ProductPage';
import HomePage from './pages/HomePage';
import IndexPage from './pages/IndexPage';
import ShoppingCart from './pages/ShoppingCart';
import News from './pages/News';
import SingleNews from './pages/News/SingleNews';
import NotFound from './pages/NotFound';
import CheckoutPage from './pages/CheckoutPage';
import ThanksPage from './pages/ThanksPage';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<IndexPage />}>
          <Route index element={<HomePage />}></Route>
          <Route path="/products" element={<ProductsPage />}></Route>
          <Route path="/shopping-cart" element={<ShoppingCart />}></Route>
          <Route path="/checkout" element={<CheckoutPage />}></Route>
          <Route path="/thank" element={<ThanksPage />}></Route>
          <Route path="/product/:id" element={<ProductPage />}></Route>
          <Route path="/news" element={<News />}></Route>
          <Route path="/news/:id" element={<SingleNews />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Route>
        <Route path="/login" element={<Login />}></Route>
        {/* Route 裡面包裹 Route 就是代表巢狀路由 */}
        <Route path="/dashboard" element={<Dashboard />}>
          {/* 這裡沒有 path 使用 index 是代表這一個元件是預設的 */}
          <Route index element={<DashboardIndex />}></Route>
          <Route path="products-list" element={<ProductsList />}></Route>
          <Route path="news-dashboard" element={<NewsDashboard/>}></Route>
          <Route path='add-news' element={ <NewsDetail/> } ></Route>
          <Route path='edit-news/:id' element={ <NewsDetail/> } ></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
