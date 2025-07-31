// ScrollToHashElement.jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToHashElement() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 0);
      }
    }
  }, [hash]);

  return null;
}
