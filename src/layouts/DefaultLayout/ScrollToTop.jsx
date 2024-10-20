export default function ScrollToTop() {
    const handleClick = () => {
        window.scrollTo(0, 0, { behavior: "smooth" });
    };
    return (
        <div className="fixed bottom-5 right-5 w-10 h-10 rounded-full bg-[#4f46e5] flex items-center justify-center">
            <i
                className="fa-solid fa-arrow-up text-xl text-white cursor-pointer"
                onClick={handleClick}
            ></i>
        </div>
    );
}
