import { RefObject, useEffect, useState } from 'react';

const useClientWidthHeiht = (ref: RefObject<HTMLElement>) => {
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    const setClientWidthHeight = () => {
      if (ref.current) {
        setWidth(ref.current.clientWidth);
        setHeight(ref.current.clientHeight);
      }
    };
    setClientWidthHeight();
    window.addEventListener('resiz', setClientWidthHeight);
    return () => {
      window.removeEventListener('resize', setClientWidthHeight);
    };
  }, []);
  const clientReact = { width, height };
  return clientReact;
};

export default useClientWidthHeiht;
