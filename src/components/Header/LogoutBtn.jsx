import React from 'react';
import { useDispatch } from 'react-redux';
import authService from '../../appwrite/auth';
import { logout } from '../../store/authSlice';
import { FaSignOutAlt } from 'react-icons/fa';

function LogoutBtn() {
    const dispatch = useDispatch();

    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout());
        }).catch((err) => {
            console.error("Logout failed:", err.message);
        });
    };

    return (
        <button
            onClick={logoutHandler}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900 transition rounded-full"
            aria-label="Logout"
        >
            <FaSignOutAlt className="text-lg" />
            <span>Logout</span>
        </button>
    );
}

export default LogoutBtn;
