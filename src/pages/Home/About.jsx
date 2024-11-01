export default function About() {
    return (
        <div className="text-center  py-8  px-20 xs:px-10 lg:px-16 bg-blue-100">
            <div>
                <h2 className="text-3xl font-semibold">What is Mocmac?</h2>
                <span>
                    <a href="#!" className="underline text-sm">
                        Read our wonderfully weird story
                    </a>
                </span>
            </div>
            <div>
                <ul className="grid grid-cols-3 mt-6 gap-5 lg:grid-cols-1">
                    <li>
                        <h3 className="font-semibold text-2xl mb-2">
                            A community doing good{" "}
                        </h3>
                        <p>
                            Mocmac is a global online marketplace, where people
                            come together to make, sell, buy, and collect unique
                            items. We’re also a community pushing for positive
                            change for small businesses, people, and the plane
                        </p>
                    </li>
                    <li>
                        <h3 className="font-semibold text-2xl mb-2">
                            Support independent creators
                        </h3>
                        <p>
                            There’s no Etsy warehouse – just millions of people
                            selling the things they love. We make the whole
                            process easy, helping you connect directly with
                            makers to find something extraordinary.
                        </p>
                    </li>
                    <li>
                        <h3 className="font-semibold text-2xl mb-2">
                            Peace of mind
                        </h3>
                        <p>
                            Your privacy is the highest priority of our
                            dedicated team. And if you ever need assistance, we
                            are always ready to step in for support.
                        </p>
                    </li>
                </ul>
            </div>
            <div className="mt-10">
                <p className="text-lg font-semibold">
                    Have a question? Well, we’ve got some answers.
                </p>
                <button className="border-2 border-black font-semibold text-gray-800 px-4 py-2 rounded-full hover:shadow transition-all duration-150 mt-4 transform hover:scale-105">
                    Go to Help Center
                </button>
            </div>
        </div>
    );
}
