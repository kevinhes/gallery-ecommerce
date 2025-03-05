const baseUrl = import.meta.env.BASE_URL

export default function HomePage() {
  const backgroundImage = `https://kevinhes.github.io${baseUrl}/images/Tsunami_by_hokusai_19th_century.jpg`
  return (
    <main>
      <h1>Home</h1>
      <img src={backgroundImage} alt="" />
    </main>
  );
}
