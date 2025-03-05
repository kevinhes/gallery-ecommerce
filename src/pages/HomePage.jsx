import { useDispatch, useSelector } from "react-redux";
import { getFrontProductsListByPage } from "../slice/frontendProductsSlice";
import { useEffect } from "react";

export default function HomePage() {
  const productsList = useSelector((state) => {
    return state.frontendProducts.productsList
  });
  const dispatch = useDispatch()
  const backgroundImage = '/images/Tsunami_by_hokusai_19th_century.jpg';


  useEffect(() => {
    dispatch(getFrontProductsListByPage())
  }, [])

  return (
    <main className="position-relative">
      {/* 第一張投影片 */}
      <section className="vw-100 vh-100 position-relative">
        {/* 畫作 */}
        <ul className="position-absolute w-100 h-100 list-unstyled z-index-100">
          {productsList.map(((paintings, index) => (
            index <= 2 ? (
              <li key={paintings.id} className="card rotate-card">
                <img src={paintings.imageUrl} alt={paintings.title} />
              </li>
            ) : null
          )))}
        </ul>
        {/* 標語 */}
        <div className="text-center position-relative z-index-100 top-85">
          <h2 className="mb-3 h1">
            讓每一幅畫，成為你生活的靈感泉源
          </h2>
          <h1 className="federo">ArtNova</h1>
        </div>
        {/* 背景讀片 */}
        <section className="position-absolute top-0 start-0 vw-100 vh-100 overflow-hidden opacity-25 z-index-1">
          <img src={backgroundImage} alt="背景圖片" className="bg-image" />
        </section>
      </section>
      {/* 關於我們 */}
      <section className="py-20">
        <div className="container">
          <h2 className="text-center mb-8">
            關於我們
          </h2>
          <div className="row">
            <div className="offset-2 col-8">
              <div className="about-card">
                
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
