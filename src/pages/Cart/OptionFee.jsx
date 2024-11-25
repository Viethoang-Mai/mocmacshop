import React from "react";
import { get } from "react-hook-form";
import { date } from "yup";
import handleGetDate from "../../utils/handleGetDate";
import styles from "./Cart.module.css";

export default function OptionFee() {
    return (
        <div>
            <h4>Shipping</h4>
            <div className={styles["option-fee"]}>
                <label>
                    <input type="radio" hidden value={0} />
                    FREE
                    <span> {handleGetDate(60, 100)}</span>
                </label>
                <label>
                    <input type="radio" hidden value={50} />
                    $50
                    <span> {handleGetDate(40, 70)}</span>
                </label>
                <label>
                    <input type="radio" hidden value={75} />
                    $75
                    <span> {handleGetDate(20, 50)}</span>
                </label>
            </div>
        </div>
    );
}
