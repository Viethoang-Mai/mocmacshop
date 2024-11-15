import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../stores/slices/authSlice";
export default function Profile() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);

    useEffect(() => {
        dispatch(login(user));
    }, []);

    return <div>Profile</div>;
}
