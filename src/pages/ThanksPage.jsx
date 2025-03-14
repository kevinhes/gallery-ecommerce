import { Link } from "react-router-dom"

export default function ThanksPage() {
  return (
    <>
      <section className='gallery-banner w-100 vh-100 d-flex justify-content-center align-items-center'>
        <section className='container position-relative z-index-100'>
          {/* <h1 className='text-light'>建立訂單</h1> */}
          <div className="text-center mb-10">
            <i className="bi bi-hearts text-light display-1"></i>
          </div>
          <h1 className="text-center text-light">感謝您的購買，回到<Link className="text-light link d-inline" to={'/'}>首頁</Link> </h1>
        </section>
        <div className="bg-filter"></div>
        <div className='banner-bg'>
          <img src="/images/PicassoGuernica.jpg" alt="" />
        </div>
      </section>
    </>
  )
}