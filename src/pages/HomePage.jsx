import { useDispatch, useSelector } from "react-redux";
import { getFrontProductsListByPage } from "../slice/frontendProductsSlice";
import { useEffect, useMemo } from "react";

// components
import HomeBanner from "../components/home/HomeBanner";
import HomeAbout from "../components/home/HomeAbout";
import HomePainting from "../components/home/HomePainting";

export default function HomePage() {
  const productsList = useSelector((state) => {
    return state.frontendProducts.productsList
  });
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
    </main>
  );
}
