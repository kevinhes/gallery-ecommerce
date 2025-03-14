// hook
import { useEffect, useState } from "react";

// redux
import { useDispatch, useSelector } from "react-redux";
import { getNewsListByPage } from "../slice/frontendNewsSlice";

// libray
import ReactLoading from 'react-loading';

import NewsList from "../components/news/NewsList";

export default function News() {
  const newsList = useSelector((state) => state.frontendNews.newsList);
  const pagination = useSelector((state) => state.frontendNews.pagination);
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    dispatch(getNewsListByPage())
    setIsLoading(false);
  }, [])

  return (
    <>
      <section className='gallery-banner'>
        <section className='container position-relative z-index-100'>
          <div className="row mb-10">
            <div className="offset-2 col-8">
              <h1 className='text-light'>最新消息</h1>
            </div>
          </div>
          <div className="row">
            <div className="offset-2 col-8">
              <div className="feature-layout">
              </div>
            </div>
          </div>
        </section>
        <div className="bg-filter"></div>
        <div className='banner-bg'>
          <img src="/images/the_kiss.jpg" alt="" />
        </div>
      </section>
      <section className="container position-relative py-25">
        {isLoading === true ? (
          <div className="w-100 vh-100 d-flex justify-content-center align-items-center">
            <ReactLoading type="spin" color="#4F46E5" />
          </div>
        ) : (
          <NewsList newsList={newsList} pagination={pagination} />
        )}
      </section>
    </>
  )
}