export default function HomePage() {
  const backgroundImage = '/images/Tsunami_by_hokusai_19th_century.jpg';

  return (
    <main className="position-relative">
      <section className="position-absolute top-0 start-0 vw-100 vh-100 overflow-hidden opacity-50">
        <img src={backgroundImage} alt="背景圖片" className="bg-image" />
      </section>
    </main>
  );
}
