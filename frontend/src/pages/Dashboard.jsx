import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { reset, fetchUsers } from '../features/auth/authSlice'
const Dashboard = () => {


  // Move the declaration of 'navigate' here before using it in the useEffect
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, users, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

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

  const transistTypes = [
    { value: "any", label: "Any" },
    { value: "rigid", label: "Rigid Truck" },
    { value: "articulated", label: "Articulated Truck" },
    { value: "box", label: "Box Lorry" },
    { value: "flatbed", label: "Flatbed Lorry" },
    { value: "tipper", label: "Tipper Lorry" },
    { value: "refrigerated", label: "Refrigerated Lorry" },
    { value: "curtain-side", label: "Curtain-side Lorry" },
    { value: "low-loader", label: "Low-Loader Lorry" },
    { value: "car", label: "Car Transporter" },
    { value: "skip", label: "Skip Homes" },
    { value: "livestock", label: "Livestock Lorry" }
  ];

  let getTransistType = (value) => {
    const truck = transistTypes.find(t => t.value == value);
    return truck.label;
  };

  const [searchResults, setSearchResults] = useState([] || null);
  const [selectedTransist, setSelectedTransist] = useState(null);

  const [transist_type, setTransistType] = useState('');
  const [space, setSpace] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [departure_date, setDepartureDate] = useState('');

  const [showModal, setShowModal] = useState(false);

  const toggleModal = (id) => {
    const newTransist = users.find((transist) => transist.id == id);
    setSelectedTransist(newTransist);
    setShowModal((prevShowModal) => !prevShowModal);
  };

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    dispatch(fetchUsers());
    return () => {
      dispatch(reset());

    };
  }, [user, navigate, isError, message, dispatch]);
  const imageUrl = 'images/img-1a.jpg';

  async function Search(event) {
    event.preventDefault();

    // Log the current state of users before filtering
    console.log("Users before filtering:", users);

    const newSearchResults = users.filter((user) =>
      (user.transist_type === transist_type || transist_type === 'any') &&
      user.departure_date === departure_date &&
      user.space >= space &&
      (
        (user.from <= from && user.to >= to && user.from < to && user.to > from) ||  // Check if the user's route includes the desired route
        (user.from >= from && user.to <= to && user.from > to && user.to < from)     // Check if the user's route is included in the desired route
      )
    );

    // Log the search parameters and results
    console.log("Search parameters:", transist_type, departure_date, space, from, to);
    console.log("Results:", newSearchResults);

    // Set the search results state
    setSearchResults(newSearchResults);
  }




  return (
    <div>
      <section id="content"
        style={{ backgroundImage: `url(${imageUrl})`, backgroundPosition: 'center', minHeight: 'auto', paddingBottom: '20px', paddingTop: '20px' }}>
        <div className="search-box-wrapper">
          <div className="search-box container" style={{ marginTop: 0 }}>
            <ul className="search-tabs clearfix" style={{ display: 'none' }}>
              <li><a href="#hotels-tab" data-toggle="tab">Sign up</a></li>
              <li><a href="#flights-tab" data-toggle="tab">Login</a></li>
            </ul>
            <div className="search-tab-content">
              <form action="" method="post" onSubmit={Search}>
                <div className="row">
                  <div className="col-md-12">
                    <h2 style={{ color: '#fff', fontSize: '25px' }}>
                      Transist - Online Booking
                    </h2>
                  </div>

                  <div className="col-md-2">
                    <div className="form-group row">
                      <div className="col-md-12 visible-xs">&nbsp;</div>
                      <div className="col-md-12 col-xs-12">
                        <label style={{ color: 'white' }}>Transist Type</label>
                        <select className="form-control schedule_type" id="train_type"
                          name="schedule_type"
                          value={transist_type}
                          onChange={(e) => setTransistType(e.target.value)}
                        >
                          <option value="" selected>Select....</option>
                          <option value="any">Any</option>
                          <option value="rigid">Rigid Truck</option>
                          <option value="articulated">Articulated Truck</option>
                          <option value="box">Box Lorry</option>
                          <option value="flatbed">Flatbed Lorry</option>
                          <option value="tipper">Tipper Lorry</option>
                          <option value="refrigerated">Refrigerated Lorry</option>
                          <option value="curtain-side">Curtain-side Lorry</option>
                          <option value="low-loader">Low-Loader Lorry</option>
                          <option value="car">Car Transporter</option>
                          <option value="skip">Skip Homes</option>
                          <option value="livestock">Livestock Lorry</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-3 changetype">
                    <div className="form-group row">
                      <div className="col-md-12 col-xs-12">
                        <label style={{ color: 'white' }}>From</label>
                        <select className="form-control terminal_id" id="depature_references"
                          name="terminal_id" required="true"
                          value={from}
                          onChange={(e) => setFrom(e.target.value)}
                        >
                          <option selected value=''>Select...</option>
                          <option value='1'>Mombasa</option>
                          <option value='2'>Mariakani</option>
                          <option value='3'>Voi</option>
                          <option value='4'>Mtito Andei</option>
                          <option value='5'>Kibwezi</option>
                          <option value='6'>Emali</option>
                          <option value='7'>Athi River</option>
                          <option value='8'>Nairobi</option>
                          <option value='9'>Nakuru</option>
                          <option value='10'>Kericho</option>
                          <option value='11'>Kisumu</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 changetype">
                    <div className="form-group row">
                      <div className="col-md-12 col-xs-12">
                        <label style={{ color: 'white' }}>To</label>
                        <select className="form-control destination_id" id="destination_references"
                          required="true" name="destination_id"
                          value={to}
                          onChange={(e) => setTo(e.target.value)}
                        >
                          <option selected value=''>Select...</option>
                          <option value='1'>Mombasa</option>
                          <option value='2'>Mariakani</option>
                          <option value='3'>Voi</option>
                          <option value='4'>Mtito Andei</option>
                          <option value='5'>Kibwezi</option>
                          <option value='6'>Emali</option>
                          <option value='7'>Athi River</option>
                          <option value='8'>Nairobi</option>
                          <option value='9'>Nakuru</option>
                          <option value='10'>Kericho</option>
                          <option value='11'>Kisumu</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-2 col-xs-12">
                    <div className="form-group">
                      <label style={{ color: 'white' }}>Space - In Square Meters</label>

                      <input type="number" required="true" className="form-control schedule_type"
                        placeholder="1" min="1"
                        value={space}
                        onChange={(e) => setSpace(e.target.value)}
                      />

                    </div>
                  </div>
                  <div className="col-md-2 col-xs-12">
                    <div className="form-group">
                      <label style={{ color: 'white' }}>Departure Date</label>

                      <input type="date" required="true" className="form-control schedule_type"
                        placeholder="mm/dd/yyyy"
                        value={departure_date}
                        onChange={(e) => setDepartureDate(e.target.value)}
                      />

                    </div>
                  </div>



                  <div className="form-group col-md-2">
                    <label className="hidden-xs">&nbsp;</label>
                    <button className="full-width" type="submit" style={{ background: '#ff5624' }}>Search</button>

                  </div>

                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      {searchResults.length > 0 && (
        <div>
          <div className="page-title-container style1">
            <div className="container">
              <div className="page-title pull-left">
                <h2 className="entry-title">Search Results</h2>
              </div>
            </div>
          </div>


          <section id="content" className="gray-area">
            <div className="container car-detail-page">
              <div className="row">
                <div className="col-sm-12 col-md-12">


                  <div className="sort-by-section box search-tab-content clearfix"
                    style={{ padding: '0px', marginBottom: '20px', borderBottom: '#ccc 1px solid' }}>
                    <div className="row">
                      <div className="col-sm-12 col-md-10 clearfix">
                        <h4 className="sort-by-title block" style={{ marginTop: '9px', width: '100px' }}>
                          <b>Your Search: </b>
                        </h4>
                        <br />
                        <ul className="check-square filters-option">
                          <li><a href="#"><span style={{ fontWeight: 600 }}>TRANSIST TYPE :</span> {getTransistType(transist_type)}</a></li>
                          <li><a href="#"><span style={{ fontWeight: 600 }}>FROM :</span> {getTownName(from)}</a></li>
                          <li><a href="#"><span style={{ fontWeight: 600 }}>TO :</span>{getTownName(to)}</a></li>
                          <li><a href="#"><span style={{ fontWeight: 600 }}>SPACE :</span> {space} square meters</a></li>
                          <li><a href="#"><span style={{ fontWeight: 600 }}>DEPARTURE DATE :</span> {departure_date}</a></li>

                        </ul>
                      </div>
                    </div>
                  </div>


                  <div id="form-tags">

                    <div className="intro box table-wrapper full-width hidden-table-sms">
                      <div className="row image-box style3">
                        {users.map((transist) => (
                          <div className="col-sm-6 col-md-6 card" key={transist.id}>
                            <article className="box">
                              <figure>
                                <img width="270" height="160" alt="" src={`/uploads/${transist.coverPhoto}`} />
                              </figure>
                              <div className="details text-center">
                                <h4 className="box-title" style={{ paddingBottom: '10px' }}>
                                  {getTownName(transist.from)} to {getTownName(transist.to)}
                                </h4>
                                <ul className="filters-option" style={{ display: 'flex', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                                  <li><a href="#"><span style={{ fontWeight: 600 }}>Vehicle Number Plate:</span> {transist.number_plate}</a></li>
                                  <li><a href="#"><span style={{ fontWeight: 600 }}>Truck Type:</span> {getTransistType(transist.transist_type)}</a></li>
                                  <li><a href="#"><span style={{ fontWeight: 600 }}>Departure Date:</span> {transist.departure_date}</a></li>
                                  {/* <li><a href="#"><span style={{ fontWeight: 600 }}>Time in Mombasa:</span> 8:00 am</a></li> */}
                                  <li><a href="#"><span style={{ fontWeight: 600 }}>Space Available:</span> {transist.space} Square Meters</a></li>
                                </ul>
                                <p className="description"></p>
                                <button className="full-width btn-small" type="submit" onClick={() => toggleModal(transist.id)}>
                                  Book this Transist
                                </button>
                              </div>
                            </article>
                          </div>
                        ))}

                      </div>

                    </div>

                  </div>


                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {showModal && (
        <div className="booking-modal">
          <div className="booking-container" style={{ background: '#fff', padding: '10px', borderRadius: '5px' }}>
            <section className='heading' >

              <h1>
                Booking
              </h1>
            </section>
            <button
              onClick={toggleModal}
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
              <article className="box">
                <figure>
                  <img style={{ width: '400px' }} alt="" src={`/uploads/${selectedTransist.coverPhoto}`} />

                </figure>
                <div className="details text-center">
                  <h4 className="box-title" style={{ paddingBottom: '10px' }}> {getTownName(from)} to {getTownName(to)}</h4>
                  <ul className="filters-option" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                    <li><a href="#"><span style={{ fontWeight: 600 }}>Vehicle Number Plate: </span>{selectedTransist.number_plate}</a></li>
                    <li><a href="#"><span style={{ fontWeight: 600 }}>Truck Type: </span> {getTransistType(selectedTransist.transist_type)}</a></li>
                    <li><a href="#"><span style={{ fontWeight: 600 }}>Depature Date: </span>{selectedTransist.departure_date}</a></li>
                    {/* <li><a href="#"><span style={{ fontWeight: 600 }}>Time in {getTownName(from)}:</span> 8:00 am</a></li> */}
                    <li><a href="#"><span style={{ fontWeight: 600 }}>Space:</span> {space} Square Meters</a></li>
                  </ul>
                  <p className="description">
                    <h4>{space} X {selectedTransist.price}KSH per square meter</h4>
                    <h3>Total Amount (KSH): {space * selectedTransist.price}</h3>
                  </p>
                </div>
              </article>
              <form >
                <div className='form-group'>
                  <input
                    type='text'
                    className='form-control'
                    id='name'
                    name='name'
                    placeholder='Your Full Names'
                  />
                </div>
                <div className='form-group'>
                  <input
                    type='text'
                    className='form-control'
                    id='id_number'
                    name='id_number'
                    placeholder='National ID Number'
                  />
                </div>
                <div className='form-group'>
                  <input
                    type='text'
                    className='form-control'
                    id='phone_number'
                    name='phone_number'
                    placeholder='Your Phone Number'
                  />
                </div>

                <div className='form-group'>
                  <button type='submit' className='btn btn-block'>
                    Book Now
                  </button>
                </div>

              </form>
            </section>
          </div>

        </div>
      )}


    </div>
  );
};

export default Dashboard;
