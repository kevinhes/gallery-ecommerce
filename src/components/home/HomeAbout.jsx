const api = import.meta.env.VITE_API_PATH;

export default function HomeAbout() {
  return (
    <section className="py-10 py-md-25">
      <div className="container">
        <h2 className="text-center mb-5 mb-md-10">
          關於我們
        </h2>
        <div className="row">
          <div className="offset-xl-2 col-12 col-xl-8">
            <div className="about-card">
              <div className="w-xl-50 pe-3">
                <img src="/images/photo-1537884557178-342a575d7d16.jpeg" alt="about" className="side-img" />
              </div>
              <div className="w-xl-50 d-flex flex-column justify-content-between align-items-end ps-3">
                <p className="pt-4"><span className="fs-2">A</span>rtNova 由創辦者 阿特拉斯 創立，致力於打造獨特的藝術體驗，將創意與工藝完美結合。我們的作品涵蓋數位藝術、油畫、水彩及多媒材創作，為熱愛藝術的你帶來獨一無二的視覺享受。<br /> 我們相信，每一件藝術品都是情感的流露與故事的承載。透過細膩的筆觸與色彩的運用，我們希望喚起觀者的共鳴，讓藝術成為生活的一部分。不論是個人收藏、商業合作，或是客製化創作，artNova 皆以最高標準呈現最優質的作品。<br />artNova 不僅專注於創作，還積極推動藝術教育與交流。我們提供藝術工作坊、線上課程以及展覽策劃，讓更多人能夠接觸並理解藝術的美好。我們相信，藝術沒有界限，每個人都能在藝術的世界裡找到屬於自己的色彩。<br />歡迎與我們聯繫，一起探索藝術的無限可能！</p>
                <img src={`/${api}/images/sign.png`} alt="sign" className="sign" />
              </div>
            </div>
          </div>
        </div>
      </div>
      </section>
  )
}