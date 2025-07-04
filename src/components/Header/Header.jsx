import React from 'react';
import { Container, Logo, LogoutBtn } from '../index';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaHome, FaSignInAlt, FaUserPlus, FaList, FaPlus } from 'react-icons/fa';

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    {
      name: 'Home',
      slug: '/',
      active: true,
      icon: <FaHome />,
    },
    {
      name: 'Login',
      slug: '/login',
      active: !authStatus,
      icon: <FaSignInAlt />,
    },
    {
      name: 'Signup',
      slug: '/signup',
      active: !authStatus,
      icon: <FaUserPlus />,
    },
    {
      name: 'All Posts',
      slug: '/all-posts',
      active: authStatus,
      icon: <FaList />,
    },
    {
      name: 'Add Post',
      slug: '/add-post',
      active: authStatus,
      icon: <FaPlus />,
    },
  ];

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md fixed top-0 left-0 w-full z-20">
      <Container>
        <nav className="flex items-center justify-between py-3 flex-wrap gap-2">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <Logo width="70px" />
          </Link>

          {/* Navigation Buttons */}
          <ul className="flex items-center gap-3 flex-wrap ml-auto">
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <button
                      onClick={() => navigate(item.slug)}
                      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-blue-100 hover:text-blue-600 dark:hover:bg-gray-800 transition rounded-full"
                    >
                      {item.icon}
                      <span>{item.name}</span>
                    </button>
                  </li>
                )
            )}
            {/* Logout */}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
