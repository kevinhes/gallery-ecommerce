import { useDispatch, useSelector } from "react-redux";
import { getFrontProductsListByPage } from "../slice/frontendProductsSlice";
import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";

// actions
import { addProductToCart } from "../slice/shoppingCartSlice";

// components
import HomeBanner from "../components/home/HomeBanner";

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

  const handleAddProductToCart = async(payload) => {
    dispatch(addProductToCart(payload))
  }


  useEffect(() => {
    dispatch(getFrontProductsListByPage())
  }, [])

  return (
    <main className="position-relative">
      {/* banner */}
      <HomeBanner randomProductsList={randomProductsList} />
      {/* 關於我們 */}
      <section className="py-20">
        <div className="container">
          <h2 className="text-center mb-10">
            關於我們
          </h2>
          <div className="row">
            <div className="offset-2 col-8">
              <div className="about-card">
                <div className="w-50 pe-3">
                  <img src="/images/photo-1537884557178-342a575d7d16.jpeg" alt="about" className="side-img" />
                </div>
                <div className="w-50 d-flex flex-column justify-content-between align-items-end ps-3">
                  <p className="pt-4"><span className="fs-2">A</span>rtNova 由創辦者 阿特拉斯 創立，致力於打造獨特的藝術體驗，將創意與工藝完美結合。我們的作品涵蓋數位藝術、油畫、水彩及多媒材創作，為熱愛藝術的你帶來獨一無二的視覺享受。<br /> 我們相信，每一件藝術品都是情感的流露與故事的承載。透過細膩的筆觸與色彩的運用，我們希望喚起觀者的共鳴，讓藝術成為生活的一部分。不論是個人收藏、商業合作，或是客製化創作，artNova 皆以最高標準呈現最優質的作品。<br />artNova 不僅專注於創作，還積極推動藝術教育與交流。我們提供藝術工作坊、線上課程以及展覽策劃，讓更多人能夠接觸並理解藝術的美好。我們相信，藝術沒有界限，每個人都能在藝術的世界裡找到屬於自己的色彩。<br />歡迎與我們聯繫，一起探索藝術的無限可能！</p>
                  <img src="/images/sign.png" alt="sign" className="sign" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* 最新作品 */}
      <section className="py-20 position-relative">
        <div className="container position-relative z-index-100">
          <h2 className="text-center mb-10">
            最新作品
          </h2>
          <div className="row">
            {
              productsList.map((painting, index) => (
                index <= 3 ?
                  <div key={painting.id} className="col-3">
                    <div className="card painting-card">
                      <div className="card-img-wrap">
                        <img
                          src={painting.imageUrl}
                          alt={painting.title}
                        />
                      </div>
                      <div className="card-body">
                        <h5 className="mb-3">{painting.title}</h5>
                        <p className="text-clamp-2 mb-5">{painting.description}</p>
                        <div className="d-flex justify-content-end">
                          <Link to={`/product/${painting.id}`} className="btn btn-outline-dark me-2">查看詳情</Link>
                          <button type="button" className="btn btn-dark" onClick={() => handleAddProductToCart({product_id:painting.id, qty:1})}>加入購物車</button>
                        </div>
                      </div>
                    </div>
                  </div> :
                  null
              ))
            }
          </div>
        </div>
        <img src="/images/Starry_Night.jpg" alt="最新作品背景圖片" className="bg-image position-absolute top-0 start-0 opacity-50" />
      </section>
    </main>
  );
}
