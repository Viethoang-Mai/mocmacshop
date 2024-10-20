import dataCategories from "../../../../utils/MockData/mockDataCategories";
export default function NavSlide() {
    return (
        <div className="nav-slide  pb-4 text-[#fff8ed]  ">
            <div className="header px-6 py-3 flex gap-x-2 bg-[#1c4c51]">
                <i className="fa-regular fa-user text-2xl"></i>
                <span className="text-2xl ">Hi, </span>
            </div>
            <div className="content px-6 text-black">
                <ul>
                    {dataCategories.map((item, index) => (
                        <li key={index}>
                            <a href="/">{item.title}</a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
