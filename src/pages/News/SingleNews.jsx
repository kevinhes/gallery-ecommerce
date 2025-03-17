// react
import { useState, useEffect } from 'react'

// router
import { useParams } from 'react-router-dom';

// custom library
import axios from 'axios';
import ReactLoading from 'react-loading';

// base
const baseUrl = import.meta.env.VITE_API_BASE_URL;
const api = import.meta.env.VITE_API_PATH;

export default function SingleNews() {
  const { id } = useParams();
  const [singleNews, setSingleNews] = useState({})
  const [isLoading, setIsLoading] = useState(false);


  const getSingleNews = async (id) => {
    setIsLoading(true)
    const getSingleNewsUrl = `${baseUrl}v2/api/${api}/article/${id}`;
    try {
      const response = await axios.get(getSingleNewsUrl)
      const { article } = response.data
      setSingleNews(article)
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false)
  }

  useEffect(() => {
    getSingleNews(id)
  }, [id])

  return (
    <>
      <section className='gallery-banner'>
        <section className='container position-relative z-index-100'>
          <div className="row mb-10">
            <div className="offset-lg-2 col-lg-8">
              <h1 className='text-light'>{singleNews.title}</h1>
            </div>
          </div>
          <div className="row">
            <div className="offset-lg-2 col-lg-8">
              <div className="feature-layout">
                <img src={singleNews.image} alt={singleNews.title} className='w-100 single-news-banner' />
              </div>
            </div>
          </div>
        </section>
        <div className="bg-filter"></div>
        <div className='banner-bg'>
          <img src={singleNews.image} alt='背景圖片' />
        </div>
      </section>
      <section className="container py-10 py-md-20">
        {isLoading === true && (
          <div className="full-screen-loading">
            <ReactLoading />
          </div>
        )}
        <div className="row mb-12">
          <div className="offset-lg-2 col-lg-8">
            <h3>文章</h3>
            <hr />
            <div>
              <p className='mb-5'>作者：<span>{singleNews.author}</span></p>
              <div dangerouslySetInnerHTML={{ __html: singleNews.content }} className='editor-content'></div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}