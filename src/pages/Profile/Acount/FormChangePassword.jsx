import clsx from "clsx";
import styles from "./Account.module.css";

export default function FormChangePassword() {
    return (
        <form action="" className={clsx(styles["form"])}>
            <h4 className={clsx(styles["heading"])}>Password</h4>
            <div className="flex flex-col gap-y-3">
                <div className="flex flex-col  ">
                    <label htmlFor="">Current Password</label>
                    <div className="relative">
                        <input type="password" />
                    </div>
                </div>
                <div className="flex flex-col ">
                    <label htmlFor="">New Password</label>
                    <div className="relative">
                        <input type="password" />
                    </div>
                </div>
                <div className="flex flex-col ">
                    <label htmlFor="">Confirm New Password</label>
                    <div className="relative">
                        <input type="password" />
                    </div>
                </div>
            </div>
            <button>Change Password</button>
        </form>
    );
}
