import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../stores/slices/authSlice";
import Loading from "../../components/Loading/Loading";
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

    return (
        <div>
            Profile
            {profile && (
                <div>
                    <p>{profile.name}</p>
                    <p>{profile.email}</p>
                </div>
            )}
        </div>
    );
}
