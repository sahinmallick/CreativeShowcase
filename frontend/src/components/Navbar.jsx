import React from 'react';
import { useAuthStore } from '../store/useAuthStore';
import logo from '../assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { authUser, logout, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 w-full py-4">
      <div className="mx-auto max-w-5xl px-4">
        <div className="navbar bg-base-100/80 backdrop-blur border rounded-lg border-base-300 px-4 lg:px-8 sticky top-0 z-50">
          <div className="flex-1">
            <Link
              to="/"
              className="flex items-center gap-2 text-xl font-semibold tracking-tight w-60"
            >
              <span className="w-11 h-10 rounded-x flex items-center justify-center font-bold">
                <img src={logo} alt="logo" />
              </span>
              <span className="text-lg lg:text-xl">Creative Showcase</span>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            {!isAuthenticated ? (
              <Link to={'/login'}>
                <button className="btn btn-neutral rounded-md px-6">
                  Log In
                </button>
              </Link>
            ) : (
              <div className="dropdown dropdown-end">
                <label
                  tabIndex={0}
                  className="btn btn-ghost btn-circle avatar hover:ring-2 hover:ring-primary/40 transition"
                >
                  <div className="w-10 rounded-full">
                    <img alt="User avatar" src={authUser?.avatar.url} />
                  </div>
                </label>

                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 w-52 rounded-xl bg-base-100 shadow-lg border border-base-300"
                >
                  <li
                    onClick={() => navigate('/profile')}
                    className="px-3 py-3 rounded-lg bg-base-200/60 mb-1"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden">
                        <img
                          src={authUser?.avatar?.url}
                          alt="Avatar"
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex flex-col">
                        <span className="text-sm font-semibold leading-tight">
                          {authUser?.fullname}
                        </span>
                        <span className="text-xs opacity-60 truncate max-w-[180px]">
                          {authUser?.email}
                        </span>
                      </div>
                    </div>
                  </li>
                  <div className="divider my-1"></div>
                  <li>
                    <a className="rounded-lg text-error" onClick={logout}>
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
