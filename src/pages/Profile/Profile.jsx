import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, logout } from "../../stores/slices/authSlice";
import Loading from "../../components/Loading/Loading";
import { set } from "react-hook-form";
export default function Profile() {
    const { profile } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        dispatch(getProfile());
        setLoading(false);
    }, []);
    if (loading) {
        return <Loading />;
    }
    const handleLogout = async () => {
        try {
            setLoading(true);
            const result = await dispatch(logout()).unwrap();
            if (result) {
                setTimeout(() => {
                    setLoading(false);
                    window.location.href = "/";
                }, 500);
            }
        } catch (error) {
            setLoading(false);
        }
    };

    return (
        <div>
            Profile
            {profile && (
                <div>
                    <p>{profile.name}</p>
                    <p>{profile.email}</p>
                </div>
            )}
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}
