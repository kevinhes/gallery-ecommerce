import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate('/');
    }, 4000);
  }, [navigate]);
  return (
    <section className="gallery-banner w-100 vh-100 position-relative d-flex justify-content-center align-items-center">
      <h1 className='position-relative z-index-1000'>404 Not found</h1>
      <div className="bg-filter"></div>
      <div className='banner-bg'>
        <img src="/images/地中海.jpg" alt="" />
      </div>
    </section>
  );
}
