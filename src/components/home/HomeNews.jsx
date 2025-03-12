// hook
import { useEffect } from "react";

// router
import { Link } from "react-router-dom"

// redux
import { useDispatch, useSelector } from "react-redux";
import { getNewsListByPage } from "../../slice/frontendNewsSlice"

export default function HomeNews() {
  const newsList = useSelector((state) => state.frontendNews.newsList);
  const dispatch = useDispatch()

  useEffect(() => {
      dispatch(getNewsListByPage())
    }, [])

  return (
    <section className="container py-25">
        <h2 className="text-center mb-10">最新消息</h2>
        <div className="row">
          <div className="offset-2 col-8">
            <ul className="list-unstyled grid gap-6">
              {
                newsList.map( ( news, index ) => 
                  index <= 2 ? (
                    <li key={news.id} className="card news-card g-col-12 d-flex justify-content-between">
                      <div className="w-25 card-img-wrap">
                        <img src={ news.image } alt="" className="w-100" />
                      </div>
                      <div className="w-73 d-flex flex-column justify-content-between">
                        <div>
                          <h4 className=""> { news.title } </h4>
                          <p className="mb-2"><small> { news.author } </small></p>
                          <p> { news.description } </p>
                        </div>
                        <Link className="text-end link" to={`/news/${news.id}`}>
                          <i>Read more</i>
                        </Link>
                      </div>
                    </li>
                  ) : null
                )
              }
            </ul>
          </div>
        </div>
      </section>
  )
}