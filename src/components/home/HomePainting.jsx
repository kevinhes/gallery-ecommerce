import { useDispatch, useSelector, } from "react-redux";
import { Link } from "react-router-dom";

// actions
import { addProductToCart } from "../../slice/shoppingCartSlice";

export default function HomePainting() {
  const dispatch = useDispatch()

  const handleAddProductToCart = async(payload) => {
    dispatch(addProductToCart(payload))
  }

  const productsList = useSelector((state) => {
    return state.frontendProducts.productsList
  });
  return (
    <section className="py-15 py-lg-25 position-relative">
      <div className="container position-relative z-index-100">
        <h2 className="text-center mb-10">
          最新作品
        </h2>
        <div className="row row-gap-5">
          {
            productsList.map((painting, index) => (
              index <= 3 ?
                <div key={painting.id} className="col-12 col-md-6 col-xl-3">
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
  )
}