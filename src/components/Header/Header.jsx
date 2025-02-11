import React from 'react'
import {Container, Logo, LogoutBtn} from '../index'
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FaHome, FaSignInAlt, FaUserPlus, FaList, FaPlus } from 'react-icons/fa';

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true,
      icon: <FaHome />
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
      icon: <FaSignInAlt />
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
      icon: <FaUserPlus />
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
      icon: <FaList />
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
      icon: <FaPlus />
    },
  ]


  return (
    <header className='py-3 shadow bg-white fixed top-0 left-0 w-full z-10'>
      <Container>
        <nav className='flex'>
          <div className='mr-4'>
            <Link to='/'>
              <Logo width='70px' />
            </Link>
          </div>
          <ul className='flex ml-auto'>
            {navItems.map((item) => 
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 hover:text-blue-700 rounded-full flex items-center'
                  >
                    {item.icon}
                    <span className='ml-2'>{item.name}</span>
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header