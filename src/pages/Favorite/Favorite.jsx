export default function Favorite() {
    return (
        <section className="py-10 px-16 xl:px-10 xxs:px-5 text-gray-800 ">
            <h1 className="text-3xl  ">Favorite items</h1>
            <div className="text-center py-10">
                <div className="icon w-[150px] h-[150px] mx-auto bg-gray-100 rounded-full flex items-center justify-center">
                    <i className="text-[90px] text-gray-600 fa-solid fa-cat"></i>
                </div>
                <p className=" font-semibold my-2">Nothing here... yet.</p>
                <p className="font-medium  w-1/2 mx-auto">
                    These are a few of your favorite things... or they will be,
                    once you favorite something.
                </p>
            </div>
        </section>
    );
}
