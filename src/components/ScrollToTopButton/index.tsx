"use client";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    isVisible && (
      <button
        onClick={scrollToTop}
        className="fixed bottom-3 right-3 flex items-center justify-center w-12 aspect-square bg-[#0652e9] text-white rounded-full shadow-lg hover:bg-[#023caf] transition-colors duration-300"
        aria-label="Scroll to top"
      >
      <FontAwesomeIcon icon={faChevronUp} className="w-4 h-4 aspect-square" />
      </button>
    )
  );
};

export default ScrollToTopButton;
