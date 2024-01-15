import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_URL } from './TruckList';
import icons from './services/icons';
export const useBookingData = () => {
    const[bookingList, setBookingList] = useState([]);
  
    useEffect(() => {
      const trucksData = async() => {
        try {
            console.log(API_URL);
          const response = await axios.get(API_URL +'/bookings');
  
          const success = response.data.success;
          setBookingList(response.data);
          console.log('response',response);
        }catch(error) {
          console.error(error.message);
        }
      }
      trucksData();
    }, []);
  
    return {bookingList, setBookingList};
  }

const BookingList = () => {
    const {bookingList} = useBookingData();
    console.log('bookingList',bookingList)
  return (
    <div className="flex justify-center py-[30px]">
    <div className="">
      <table className='border-collapse'>
        <thead>
          <th className='px-[20px] py-[10px] border border-[#ddd]'>Full Name</th>
          <th className='px-[20px] py-[10px] border border-[#ddd]'>Phone Number</th>
          <th className='px-[20px] py-[10px] border border-[#ddd]'>National Id</th>
          <th className='px-[20px] py-[10px] border border-[#ddd]'>No. Plate</th>
          <th className='px-[20px] py-[10px] border border-[#ddd]'>Total Space</th>
          <th className='px-[20px] py-[10px] border border-[#ddd]'>Amount</th>
          <th className='px-[20px] py-[10px] border border-[#ddd]'>From</th>
          <th className='px-[20px] py-[10px] border border-[#ddd]'>To</th>
          <th className='px-[20px] py-[10px] border border-[#ddd]'>Received</th>
          <th className='px-[20px] py-[10px] border border-[#ddd]'>Departure Date</th>
          <th className='px-[20px] py-[10px] border border-[#ddd]'>Secret Code</th>
        </thead>
        <tbody>
          {bookingList.map((trucks) => (
            <React.Fragment key={trucks.id}>
              <tr>
                <td className='px-[20px] py-[10px] border border-[#ddd]'>{trucks.full_names}</td>
                <td className='px-[20px] py-[10px] border border-[#ddd]'>{trucks.phone_number}</td>
                <td className='px-[20px] py-[10px] border border-[#ddd]'>{trucks.national_id}</td>
                <td className='px-[20px] py-[10px] border border-[#ddd]'>{trucks.number_plate}</td>
                <td className='px-[20px] py-[10px] border border-[#ddd]'>{trucks.space}</td>
                <td className='px-[20px] py-[10px] border border-[#ddd]'>{trucks.amount}</td>
                <td className='px-[20px] py-[10px] border border-[#ddd]'>{trucks.from}</td>
                <td className='px-[20px] py-[10px] border border-[#ddd]'>{trucks.to}</td>
                <td className='px-[20px] py-[10px] border border-[#ddd]'>{trucks.received}</td>
                <td className='px-[20px] py-[10px] border border-[#ddd]'>{trucks.departure_date}</td>
                <td className='px-[20px] py-[10px] border border-[#ddd]'>{trucks.secret_code}</td>
                <td className='px-[20px] py-[10px] border border-[#ddd]'><span>{icons.eye}</span></td>
                <td className='px-[20px] py-[10px] border border-[#ddd]'><span>{icons.edit}</span></td>
                <td className='px-[20px] py-[10px] border border-[#ddd]'><span>{icons.delete}</span></td>
              </tr>
            </React.Fragment>
          ))}
          
        </tbody>
      </table>
    </div>
  </div>
  )
}

export default BookingList