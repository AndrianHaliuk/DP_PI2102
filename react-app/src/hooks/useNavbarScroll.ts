import { useEffect } from 'react';

export const useNavbarScroll = (
  ref: React.RefObject<HTMLElement | null>
) => {
  useEffect(() => {
    const navbar = ref.current;
    let lastScrollTop = 0;

    const onScroll = () => {
      const scrollTop = document.documentElement.scrollTop;
      if (navbar) {
        navbar.style.top = scrollTop > lastScrollTop ? "-87px" : "0";
        lastScrollTop = scrollTop;
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [ref]);
};
