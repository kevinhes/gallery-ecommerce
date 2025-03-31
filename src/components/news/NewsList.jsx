import { useEffect, useState} from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { getNewsListByPage } from '../../slice/frontendNewsSlice';

import ReactLoading from 'react-loading';

import { Link } from 'react-router-dom';

export default function NewsList() {
  const dispatch = useDispatch()

  const newsList = useSelector((state) => state.frontendNews.newsList);
  const pagination = useSelector((state) => state.frontendNews.pagination);

  const [isLoading, setIsLoading] = useState(false);

  const handelNewsPage = async() => {
    setIsLoading(true);
    await dispatch(getNewsListByPage()).unwrap()
    setIsLoading(false);
  }

  useEffect(() => {
    handelNewsPage()
  }, [])


  return (
    <>
    <section className="container position-relative py-10 py-md-25">
        {isLoading === true ? (
          <div className="w-100 vh-100 d-flex justify-content-center align-items-center">
            <ReactLoading type="spin" color="#4F46E5" />
          </div>
        ) : (
        <div className="row">
          <ul className="list-unstyled grid gap-6 offset-lg-2 col-lg-8 mb-10">
            {
              newsList.map((news) => (
                <li key={news.id} className="card news-card g-col-12">
                  <div className="w-md-25 card-img-wrap mb-4 mb-xl-0">
                    <img src={news.image} alt="" className="w-100" />
                  </div>
                  <div className="w-md-73 d-flex flex-column justify-content-between">
                    <div>
                      <h4 className=""> {news.title} </h4>
                      <p className="mb-2"><small> {news.author} </small></p>
                      <p className="description" > {news.description} </p>
                    </div>
                    <Link className="text-end link" to={`/news/${news.id}`}>
                      <i>Read more</i>
                    </Link>
                  </div>
                </li>
              ))
            }
          </ul>
          <div className="d-flex justify-content-center">
            <nav aria-label="Page navigation">
              <ul className="pagination">
                <li className="page-item">
                  <button
                    className="page-link"
                    type='button'
                    aria-label="Previous"
                    onClick={() =>
                      dispatch(getNewsListByPage(
                        {
                          page: pagination.current_page - 1,
                          maxPage: pagination.total_pages
                        }
                      ))
                    }
                  >
                    <span aria-hidden="true">&laquo;</span>
                  </button>
                </li>
                {[...Array(pagination.total_pages).keys()].map((page) => {
                  return (
                    <li className="page-item" key={page}>
                      <button
                        className="page-link"
                        type='button'
                        onClick={() =>
                          dispatch(getNewsListByPage(
                            {
                              page: page + 1,
                              maxPage: pagination.total_pages
                            }
                          ))
                        }
                      >
                        {page + 1}
                      </button>
                    </li>
                  );
                })}
                <li className="page-item">
                  <button
                    className="page-link"
                    type='button'
                    aria-label="Next"
                    onClick={() =>
                      dispatch(getNewsListByPage(
                        {
                          page: pagination.current_page + 1,
                          maxPage: pagination.total_pages
                        }
                      ))
                    }
                  >
                    <span aria-hidden="true">&raquo;</span>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        )}
      </section>
    </>
  )
}