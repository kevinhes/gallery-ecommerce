import NewsList from "../components/news/NewsList";

const api = import.meta.env.VITE_API_PATH;

export default function News() {
  return (
    <>
      <section className='gallery-banner'>
        <section className='container position-relative z-index-100'>
          <div className="row mb-10">
            <div className="offset-lg-2 col-lg-8">
              <h1 className='text-light'>最新消息</h1>
            </div>
          </div>
          <div className="row">
            <div className="offset-lg-2 col-lg-8">
              <div className="feature-layout">
              </div>
            </div>
          </div>
        </section>
        <div className="bg-filter"></div>
        <div className='banner-bg'>
          <img src={`/${api}/images/the_kiss.jpg`} alt="" />
        </div>
      </section>
      <NewsList />
      
    </>
  )
}