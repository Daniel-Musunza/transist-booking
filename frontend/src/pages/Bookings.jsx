import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'
import {useNavigate } from 'react-router-dom'
import { getbookings } from '../features/bookings/bookingSlice'

function Bookings() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user} = useSelector(
    (state) => state.auth
  );
  const { bookings, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.bookings
  );

  
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

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    dispatch(getbookings());
  }, [user, isError, isSuccess, message, navigate, dispatch])

 
  if(!user){
    navigate('/');
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className="bookings-container">
    <div className="heading">Bookings</div>
    <div className="bookings">
      {/* Display cards for small screens */}
      <div className="cards-container">
        {bookings
        .filter((booking) => booking.number_plate === user.number_plate)
        .map((booking) => (
          <div key={booking.id} className="booking-card">
            <div className="card-header">Booking ID: {booking.id}</div>
            <div className="card-content">
              <p>Client's Name: {booking.full_names}</p>
              <p>Client's National ID: {booking.national_id}</p>
              <p>Phone Number: {booking.phone_number}</p>
              <p>From: {getTownName(booking.from)}</p>
              <p>To: {getTownName(booking.to)}</p>
              <p>Space in Square Meters: {booking.space}</p>
              <p>Amount: {booking.amount}</p>
              {/* Add more card content as needed */}
            </div>
          </div>
        ))}
      </div>

      {/* Display table for large screens */}
      <table className="bookings-table">
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>Client's Name</th>
            <th>Client's National ID</th>
            <th>Phone Number</th>
            <th>From</th>
            <th>To</th>
            <th>Space in Square Meters</th>
            <th>Amount</th>
            {/* Add more table headers as needed */}
          </tr>
        </thead>
        <tbody>
          {bookings
          .filter((booking) => booking.number_plate === user.number_plate)
          .map((booking) => (
            <tr key={booking.id}>
              <td>{booking.id}</td>
              <td>{booking.full_names}</td>
              <td>{booking.national_id}</td>
              <td>{booking.phone_number}</td>
              <td>{getTownName(booking.from)}</td>
              <td>{getTownName(booking.to)}</td>
              <td>{booking.space}</td>
              <td>{booking.amount}</td>
              {/* Add more table cells as needed */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
   
  )
}

export default Bookings
