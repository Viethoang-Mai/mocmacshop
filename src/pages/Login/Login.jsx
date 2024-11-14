import React, { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import styles from "./form.module.css";
import clsx from "clsx";

export default function Login() {
    const [isLogin, setIsLogin] = useState(true);
    return (
        <>
            <section
                className="fixed z-[1000] w-full h-full pt-20 pb-10 top-0 left-0 right-0 bottom-0   rounded-3xl  overflow-y-auto [&::-webkit-scrollbar]:w-1 
                    [&::-webkit-scrollbar-track]:rounded-full 
                    [&::-webkit-scrollbar-track]:bg-gray-200
                    [&::-webkit-scrollbar-thumb]:rounded-full
                    [&::-webkit-scrollbar-thumb]:bg-gray-500"
            >
                <div className="form-wrapper w-[27%] xl:w-[32%] lg:w-[35%] md:w-[43%] sm:w-[60%] xs:w-[90%] bg-gray-50 rounded-3xl m-auto ">
                    <div className="form-inner p-6 ">
                        <header className="flex justify-between">
                            <h1 className="font-semibold">
                                {isLogin ? "Login" : "Register"}
                            </h1>{" "}
                            <button
                                onClick={() => setIsLogin(!isLogin)}
                                className="text-xs font-medium px-3 py-1.5 border-2 border-gray-800 rounded-full hover:shadow-trendItem transition-all duration-150"
                            >
                                {isLogin ? "Register" : "Login"}
                            </button>
                        </header>
                        {isLogin ? <LoginForm /> : <RegisterForm />}
                    </div>
                    <div className="relative w-[]  h-[0.2px] bg-gray-300  ">
                        <span className=" absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] px-2 py-1 bg-gray-50 rounded text-xs font-medium text-gray-800">
                            OR
                        </span>
                    </div>
                    <div className="form-footer p-6">
                        <button className={clsx(styles["btn-social"])}>
                            <i className="fa-brands fa-google"></i>Continue with
                            Google
                        </button>
                        <button className={clsx(styles["btn-social"])}>
                            <i className="fa-brands fa-facebook"></i>Continue
                            with Facebook
                        </button>
                        <p className="term text-xs mt-7">
                            By clicking Sign in, Continue with Google, Facebook,
                            you agree to Mocmac's{" "}
                            <span className="font-semibold text-blue-600">
                                Terms of Use
                            </span>{" "}
                            and{" "}
                            <span className="font-semibold text-blue-600">
                                Privacy Policy
                            </span>
                            .
                        </p>
                        <p className="desc text-xs mt-2">
                            Mocmac may send you communications; you may change
                            your preferences in your account settings. We'll
                            never post without your permission.
                        </p>
                    </div>
                </div>
            </section>
            <span className="overlay fixed bg-black/40 top-0 left-0  w-screen h-screen z-[999]">
                {" "}
            </span>
        </>
    );
}
