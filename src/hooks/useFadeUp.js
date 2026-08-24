import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Re-creates the original site's IntersectionObserver fade-up behaviour.
// Runs on every route change so newly-mounted .fade-up elements animate in.
export default function useFadeUp() {
  const location = useLocation();

  useEffect(() => {
    // Reset scroll position on navigation, like a fresh page load
    window.scrollTo(0, 0);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    // Wait a tick so the new page's DOM is painted before observing
    const id = window.setTimeout(() => {
      document.querySelectorAll(".fade-up").forEach((el) => observer.observe(el));
    }, 50);

    return () => {
      window.clearTimeout(id);
      observer.disconnect();
    };
  }, [location.pathname]);
}
