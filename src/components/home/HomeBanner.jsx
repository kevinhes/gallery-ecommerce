import PropTypes from 'prop-types';

export default function HomeBanner({ randomProductsList }) {
  return (
    <section className="v-100 vh-100 position-relative">
      {/* 畫作 */}
      <ul className="position-absolute w-100 h-100 list-unstyled z-index-100">
        {randomProductsList.map(((paintings) => (
          <li key={paintings.id} className="card rotate-card">
            <img src={paintings.imageUrl} alt={paintings.title} />
          </li>
        )))}
      </ul>
      {/* 標語 */}
      <div className="text-center position-relative z-index-100 top-78 top-md-85 container-fluid">
        <h2 className="mb-3 h1">
          讓每一幅畫，成為你生活的靈感泉源
        </h2>
        <h1 className="federo">ArtNova</h1>
      </div>
      {/* 背景讀片 */}
      <section className="position-absolute top-0 start-0 w-100 vh-100 overflow-hidden opacity-25 z-index-1">
        <img src={'/images/Tsunami_by_hokusai_19th_century.jpg'} alt="背景圖片" className="bg-image" />
      </section>
    </section>
  )
}

HomeBanner.propTypes = {
  randomProductsList: PropTypes.array,
};
