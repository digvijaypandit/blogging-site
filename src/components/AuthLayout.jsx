import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Protected({ children, authentication = true }) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const authStatus = useSelector((state) => state.auth.status);

    useEffect(() => {
        if (authentication) {
            if (!authStatus) {
                navigate('/login');
            } else {
                setLoading(false);
            }
        } else {
            if (authStatus) {
                navigate('/');
            } else {
                setLoading(false);
            }
        }
    }, [authStatus, authentication, navigate]);

    return loading ? <div className="text-center py-10 text-xl">Loading...</div> : <>{children}</>;
}
