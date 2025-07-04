import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import authService from "./appwrite/auth";
import { login, logout, setLoading } from "./store/authSlice";
import { Footer, Header } from './components';
import { Outlet } from 'react-router-dom';

function App() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);

  useEffect(() => {
    const loadUser = async () => {
      dispatch(setLoading(true));
      try {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      } catch (err) {
        dispatch(logout());
      }
    };

    loadUser();
  }, [dispatch]);

  return loading ? (
    <div className="h-screen w-full flex items-center justify-center text-xl">
      Loading...
    </div>
  ) : (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-100'>
      <div className='w-full block'>
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
