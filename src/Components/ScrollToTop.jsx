import { useEffect } from 'react';

const ScrollToTop = ({ activePage }) => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smootth',
    });
  }, [activePage]);

  return null;
};

export default ScrollToTop;