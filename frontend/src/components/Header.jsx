import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'

function Header() {
  const [showMenu, setShowMenu] = useState(false);

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
    <section className="header" id="header" style={{ backgroundColor: '#fff', height: '80px' }}>

      <div className="logo1" style={{ marginLeft: '20px' }}>
        <a href="#">
            <h2>Transist</h2> 
        </a>
      </div>
        <button style={{fontSize: '40px', marginRight: '20px', color: 'maroon' , background: 'transparent'}} onClick={toggleMenu} className='humbugger'><i class="fa-solid fa-bars"></i></button>
  
      <nav>
        <div className="navbar" style={{alignItems: 'center', justifyContent: 'center' }}>
          <Link to="/">Book a Transist</Link>
          {user && (
          <Link to="/bookings">Bookings</Link>
          )}
        </div>

        <div className="right-data">
          {user ? (
            <div className='profile' style={{ display: 'flex' }}>
              <h4>{user && user.number_plate}</h4>
              <button onClick={onLogout}>Log Out</button>
            </div>
          ) : (
            <>
             <button> <Link to="/login"> Log In</Link></button>
             <button> <Link to="/register"> Register</Link></button>
            </>
           
          )}

        </div>
      </nav>
      {showMenu && (
        <div className='mobile-nav' onClick={closeMenu}>
          <div className="right-data" style={{marginTop: '50px', marginBottom: '0px'}}>
            <button onClick={closeMenu} style={{width: '80px',marginBottom: '0px'}}>close</button>
          </div>
          <div className="navbar" style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Link to="/">Book a Transist</Link>
            {user && (
            <Link to="/bookings" >Bookings</Link>
            )}
          </div>

          <div className="right-data">
          {user ? (
            <div className='profile' style={{ display: 'flex' }}>
              <h4>{user && user.number_plate}</h4>
              <button onClick={onLogout}>Log Out</button>
            </div>
          ) : (
            <>
             <button> <Link to="/login"> Log In</Link></button>
             <button> <Link to="/register"> Register</Link></button>
            </>
           
          )}

        </div>
        </div>
      )}

    </section>
  )
}

export default Header

