import clsx from "clsx";
import { useState, useRef, useEffect } from "react";

export default function ScrollToTop() {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            const scrolled = document.documentElement.scrollTop;

            setIsVisible(scrolled > 350);
        };

        window.addEventListener("scroll", toggleVisibility);

        return () => {
            window.removeEventListener("scroll", toggleVisibility);
        };
    }, []);
    const handleClick = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };
    return (
        <div
            onClick={handleClick}
            ref={ref}
            className={clsx(
                "fixed bottom-10 right-5 w-9 h-9 rounded-full bg-amber-500 flex items-center justify-center z-50 animate-bounce",
                { hidden: !isVisible }
            )}
        >
            <i className="fa-solid fa-arrow-up text-xl text-white cursor-pointer"></i>
        </div>
    );
}
