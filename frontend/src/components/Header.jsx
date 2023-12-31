import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'

function Header() {
  const [ showMenu, setShowMenu] = useState(false);

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)


  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    // if (!user) {
    //   navigate('/login');
    // }
    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }
  

  const toggleMenu = () => {
    setShowMenu((prevShowMenu) => !prevShowMenu);
  };
  const closeMenu = () => {
    setShowMenu(false);
  };


  return (
    <header id="header" className="navbar-static-top">

            <div className="main-header">

                <i className="fa-solid fa-bars mobile-menu-toggle"></i>


                <div className="container">
                    <h1 className="logo navbar-brand">
                        <h2 title="Buupass - home">
                            Kenya Transists
                        </h2>
                    </h1>
                    <nav id="main-menu" role="navigation">
                        <ul className="menu">
                            <li >
                                <Link to="/">Book a Transist</Link>
                            </li>
                            
                            <li >
                                <a href="/bookings">Bookings</a>
                            </li>
                            {user ? (
                                <>
                                <li >
                                    <Link> <h3>{user && user.number_plate}</h3></Link>
                                
                                </li>
                                <li >
                                    <Link><button onClick={onLogout} >Log Out</button></Link>
                                
                                </li>
                                </>
                                
                            ) : (
                                <>
                                <li >
                                <Link to="/register">Register</Link>
                                </li>
                                <li >
                                <Link to="/login">LogIn</Link>
                            </li>
                            </>
                            )}
                            
                            
                        </ul>
                    </nav>
                </div>

                <nav id="mobile-menu-01" className="mobile-menu collapse">
                    <ul id="mobile-primary-menu" className="menu">
                        <li >
                            <a href="index.html">Book a Transist</a>
                        </li>
                       
                        <li >
                            <a href="stations.html">Stations</a>
                        </li>
                        <li >
                                <Link to="/register">Register</Link>
                            </li>
                            <li >
                                <Link to="/login">LogIn</Link>
                            </li>
                    </ul>

                   
                    <ul className="mobile-topnav container">
                        <li><a href="#">MY ACCOUNT</a></li>
                        <li><a href="#sgr-login" className="soap-popupbox">LOGIN</a></li>
                        <li><a href="#sgr-signup" className="soap-popupbox">SIGNUP</a></li>
                    </ul>
                  

                </nav>
            </div>


        </header>
  )
}

export default Header
