import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop: React.FC = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        // Scroll to top when pathname changes
        const scrollToTop = () => {
            // Find the main content area (the scrollable element)
            const mainElement = document.querySelector('main');
            
            if (mainElement) {
                // Scroll the main element to top
                mainElement.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: 'smooth'
                });
            } else {
                // Fallback to window scroll
                window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: 'smooth'
                });
            }
        };

        // Use setTimeout to ensure the DOM has updated
        setTimeout(scrollToTop, 100);
    }, [pathname]);

    return null;
};

export default ScrollToTop; 