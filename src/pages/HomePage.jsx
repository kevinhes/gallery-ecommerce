// hook
import { useEffect, useMemo } from "react";

// redux
import { useDispatch, useSelector } from "react-redux";
import { getFrontProductsListByPage } from "../slice/frontendProductsSlice";

// components
import HomeBanner from "../components/home/HomeBanner";
import HomeAbout from "../components/home/HomeAbout";
import HomePainting from "../components/home/HomePainting";
import HomeNews from "../components/home/HomeNews";

export default function HomePage() {
  const productsList = useSelector((state) => state.frontendProducts.productsList);
  
  const dispatch = useDispatch()

  const randomProductsList = useMemo(() => {
    if (!productsList.length) return [];

    // 建立一個陣列副本以避免修改原始 state
    return [...productsList]
      .sort(() => Math.random() - 0.5)
      .slice(0, 3); // 只取前三個
  }, [productsList])

  useEffect(() => {
    dispatch(getFrontProductsListByPage())
  }, [])

  return (
    <main className="position-relative">
      {/* banner */}
      <HomeBanner randomProductsList={randomProductsList} />
      {/* 關於我們 */}
      <HomeAbout />
      {/* 最新作品 */}
      <HomePainting />
      {/* 最新消息 */}
      <HomeNews />
    </main>
  );
}
