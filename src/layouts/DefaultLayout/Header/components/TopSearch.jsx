const topSearchData = [
    "Handmade Ceramics",
    "Wooden Bowls",
    "Stone Sculptures",
    "Unique Mugs",
    "Wooden Bowls",
];
export default function TopSearch() {
    return (
        <div className="text-black overflow-hidden overflow-y-auto h-full">
            <h2 className="text-sm font-semibold">Top searches this week</h2>
            <ul className="list mt-2 flex flex-col gap-2  ">
                {topSearchData.map((item, index) => (
                    <li className="flex items-center h-10" key={index}>
                        <img
                            className="object-cover rounded w-10 h-10 "
                            src="https://res.cloudinary.com/dszxqzf9t/image/upload/v1729789623/Book-Nooks_pi5nyl.webp"
                            alt=""
                        />
                        <a
                            className="h-full text-sm text-gray-700 hover:bg-gray-300 grow flex items-center p-2 "
                            href="#"
                        >
                            {item}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}
