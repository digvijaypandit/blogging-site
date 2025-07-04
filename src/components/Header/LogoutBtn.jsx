import React from 'react'
import {useDispatch} from 'react-redux'
import authService from '../../appwrite/auth'
import {logout} from '../../store/authSlice'
import { FaSignInAlt } from 'react-icons/fa';

function LogoutBtn() {
    const dispatch = useDispatch()
    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout())
        })
    }
  return (
    <button
    className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 hover:text-blue-700 rounded-full flex items-center'
    onClick={logoutHandler}
    ><FaSignInAlt />Logout</button>
  )
}

export default LogoutBtn