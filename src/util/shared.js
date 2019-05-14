import { useState, useEffect } from 'react';

export const useSort = () => {
  const [sortBy, setSort] = useState();
  const handleSort = type => () => setSort(type);

  return {
    sortBy,
    handleSort
  }
}

export const applySort = (data, value) => data.sort(
  (a, b) => (a[value] > b[value]) ? 1 : ((b[value] > a[value]) ? -1 : 0)
);

export const formatPrice = (price) => {
  return price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

export const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}