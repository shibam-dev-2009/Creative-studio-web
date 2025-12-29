import { useState, useEffect } from 'react';
import assets from '../../assets/assets';
import  './Scrolltotop.css';

export default function ScrollToTop() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollUp = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {showButton && (
        <button 
          onClick={scrollUp} 
          className='top'
        >
          <img src={assets.arrowup} className='icon'/>
        </button>
      )}
    </>
  );
}