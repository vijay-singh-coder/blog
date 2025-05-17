import React, { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";

const PrivateRoute = () => {
    const [isAuth, setIsAuth] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await axios.get(
                    `${import.meta.env.VITE_SERVER_URL}/api/v1/user/dashboard`,
                    { withCredentials: true }
                );
                setIsAuth(res.data.success);
            } catch {
                setIsAuth(false);
            }
        };
        checkAuth();
    }, []);

    if (isAuth === null) return <div>Loading...</div>;
    if (!isAuth) return <Navigate to="/login" replace />;

    return <Outlet />; 
};

export default PrivateRoute;

