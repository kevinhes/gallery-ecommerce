export default function FooterNavbar() {
  return (
    <footer className="bg-dark py-10">
      <section className="container text-light">
        <div className="d-flex justify-content-between mb-10">
          <h2 className="h1 federo">ArtNova</h2>
          <div className="d-flex">
            <a href="#" className="text-light me-8"><i className="bi bi-facebook fs-2"></i></a>
            <a href="#" className="text-light me-8"><i className="bi bi-instagram fs-2"></i></a>
            <a href="#" className="text-light"><i className="bi bi-threads fs-2"></i></a>
          </div>
        </div>
        <div className="d-flex justify-content-between">
          <div><a href="mailto:xxx@gmail.com" className="text-light d-inline">xxx@gmail.com</a></div>
          <p>© 2020 LOGO All Rights Reserved.</p>
        </div>
      </section>
    </footer>
  )
}