import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Define the ScrollToTop component, which accepts 'children' as a prop
const ScrollToTop = ({ children }) => {
  // Get the current pathname from the router's location object
  const { pathname } = useLocation();

  // useEffect hook to perform an action whenever the pathname changes
  useEffect(() => {
    // Scroll the window to the top of the page (0, 0) when the pathname changes
    window.scrollTo(0, 0);
  }, [pathname]); // Dependency array includes pathname, so this effect runs whenever the pathname changes

  // Render the children components or return null if no children are passed
  return children || null;
};

export default ScrollToTop;
