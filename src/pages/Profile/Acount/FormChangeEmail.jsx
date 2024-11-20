import clsx from "clsx";
import styles from "./Account.module.css";
import { useSelector } from "react-redux";

export default function FormChangeEmail() {
    const { user } = useSelector((state) => state.auth);
    return (
        <form action="" className={clsx(styles["form"])}>
            <h4 className={clsx(styles["heading"])}>Email</h4>
            <label htmlFor="">Current Email</label>
            <p className="text-sm mt-1 pb-3 border-b border-gray-300">
                {user.email}
            </p>
            <h4 className={clsx(styles["heading"])}>Change your Email</h4>
            <div className="flex flex-col gap-y-3">
                <div className="flex flex-col  ">
                    <label htmlFor="">New Email</label>
                    <div className="relative">
                        <input type="email" />
                    </div>
                </div>
                <div className="flex flex-col ">
                    <label htmlFor="">Confirm New Email</label>
                    <div className="relative">
                        <input type="email" />
                    </div>
                </div>
                <div className="flex flex-col ">
                    <label htmlFor="">Your Mocmac Password</label>
                    <div className="relative">
                        <input type="password" />
                    </div>
                </div>
            </div>
            <button>Change Email</button>
        </form>
    );
}
