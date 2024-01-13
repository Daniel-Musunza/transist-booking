import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'
import VehicleTracking from './VehicleTracking';
import { searchMyBooking, setMyBooking, confirmReceived, confirmNotReceived } from '../features/bookings/bookingSlice'

function Header() {
  const [showMenu, setShowMenu] = useState(false);

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth);

  const { myBooking, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.bookings
  );

  let numberPlate;
  if(myBooking){
    numberPlate = myBooking.number_plate;
  }

  const [showModal, setShowModal] = useState(false);
  const [id, setID] = useState('');
  const [secret_code, setSecretCode] = useState('');

  const towns = [
    { id: 1, town: "Mombasa" },
    { id: 2, town: "Mariakani" },
    { id: 3, town: "Voi" },
    { id: 4, town: "Mtito Andei" },
    { id: 5, town: "Kibwezi" },
    { id: 6, town: "Emali" },
    { id: 7, town: "Athi River" },
    { id: 8, town: "Nairobi" },
    { id: 9, town: "Nakuru" },
    { id: 10, town: "Kericho" },
    { id: 11, town: "Kisumu" }
  ];

  let getTownName = (id) => {
    const town = towns.find(t => t.id == id);
    return town.town;
  };

  const toggleModal = () => {
    setShowModal((prevShowModal) => !prevShowModal);
  };

  const closeModal = () => {
    localStorage.removeItem('myBooking');
    setShowModal(false);
    dispatch(setMyBooking(null)); // Assuming you have a setMyBooking action to update the Redux state
  };

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

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
  async function handleSearch(event) {
    event.preventDefault();

    const userData = {
      id,
      secret_code,
    }

    dispatch(searchMyBooking(userData));

  }

  async function handleConfirmReceived(event) {
    event.preventDefault();

    const userData = {
      id: myBooking.id,
      received: true
    }

    dispatch(confirmReceived(userData));
    alert("Confirmed Successfully ...");
  }
  async function handleConfirmNotReceived(event) {
    event.preventDefault();

    const userData = {
      id: myBooking.id,
      received: false
    }

    dispatch(confirmNotReceived(userData));
    alert("Confirmed Successfully ...")

  }
  return (
    <section className="header" id="header" style={{ backgroundColor: '#fff', height: '80px' }}>

      <div className="logo1" style={{ marginLeft: '20px' }}>
        <a href="#">
          <h2>Transist</h2>
        </a>
      </div>
      <button style={{ fontSize: '40px', marginRight: '20px', color: 'maroon', background: 'transparent' }} onClick={toggleMenu} className='humbugger'><i class="fa-solid fa-bars"></i></button>

      <nav>
        <div className="navbar" style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Link to="/">Book a Transist</Link>
          {user && (
            <Link to="/bookings">Bookings</Link>
          )}
          <Link onClick={toggleModal}>Track Order</Link>
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
              {/* <button> <Link to="/register"> Register</Link></button> */}
            </>

          )}

        </div>
      </nav>
      {showMenu && (
        <div className='mobile-nav' onClick={closeMenu}>
          <div className="right-data" style={{ marginTop: '50px', marginBottom: '0px' }}>
            <button onClick={closeMenu} style={{ width: '80px', marginBottom: '0px' }}>close</button>
          </div>
          <div className="navbar" style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Link to="/">Book a Transist</Link>
            {user && (
              <Link to="/bookings" >Bookings</Link>
            )}
            <Link onClick={toggleModal}>Track Order</Link>
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
                {/* <button> <Link to="/register"> Register</Link></button> */}
              </>

            )}

          </div>
        </div>
      )}
      {showModal && (
        <div className="booking-modal">
          <div className="booking-container" style={{ background: '#fff', padding: '10px', borderRadius: '5px' }}>
          <section className='heading'>

            <h2>
              Track Order
            </h2>
            </section>
            <button
              onClick={closeModal}
              style={{
                position: 'fixed',
                zIndex: '999',
                top: '10px',
                right: '10px',
                color: 'black',
                background: '#fff',
                borderRadius: '10px'
              }}>
              Close
            </button>
            <section className='form'>
           
              {myBooking ? (
                <div className="">
                  {/* Display cards for small screens */}
                  <div className="">
                    <div key={myBooking.id} className="">
                      <div className="">Booking ID: {myBooking.id}</div>
                      <div className="info" style={{margin: 'auto' }}>
                        <p>From: {getTownName(myBooking.from)}</p>
                        <p>To: {getTownName(myBooking.to)}</p>
                        <p>Space in Square Meters: {myBooking.space}</p>
                        <p>Amount: {myBooking.amount}</p>
                        <h3>Delivery Confirmation </h3>
                        {myBooking.received === 1 ? (
                          <p> Status: Received</p>
                        ) : myBooking.received === 0 ? (
                          <>
                            <button onClick={handleConfirmReceived}>Received</button>
                            <p>Status: Not Received</p>
                          </>
                        ) : (
                          <>
                          
                            <button onClick={handleConfirmReceived} style={{marginRight: '10px', borderRadius: '10px'}}>Received</button>
                            <button onClick={handleConfirmNotReceived} style={{marginRight: '10px', borderRadius: '10px'}}>Not Received</button>
                            <p>Delivery Status: Unknown</p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <h3>Real Time Location for Truck <span style={{color: 'black'}}>{myBooking.number_plate}</span></h3>
                  <VehicleTracking {...numberPlate}/>
                </div>
              ): (
              <form onSubmit={handleSearch}>
                <div className='form-group'>
                  <input
                    type='text'
                    className='form-control'
                    id='id_number'
                    name='id_number'
                    placeholder='Your Booking ID'
                    value={id}
                    onChange={(e) => setID(e.target.value)}
                  />
                </div>
                <div className='form-group'>
                  <input
                    type='password'
                    className='form-control'
                    id='secret_code'
                    name='secret_code'
                    placeholder='Secret Code'
                    value={secret_code}
                    onChange={(e) => setSecretCode(e.target.value)}
                  />
                </div>
                <div className='form-group'>
                  <button type='submit' className='btn btn-block'>
                    Search
                  </button>
                </div>

              </form>
              )}

            </section>
          </div>
        </div>
      )}
    </section>
  )
}

export default Header

