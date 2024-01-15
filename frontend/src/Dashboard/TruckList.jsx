import axios from 'axios';
import React, { useEffect, useState } from 'react';
import icons from './services/icons';

export const  API_URL = process.env.REACT_App_API_URL;


export const useTrucksData = () => {
    const[trucksList, setTrucksList] = useState([]);
  
    useEffect(() => {
      const trucksData = async() => {
        try {
          const response = await axios.get(API_URL +'/users/getUsers');
  
          const success = response.data.success;
          setTrucksList(response.data);
          console.log(response);
        }catch(error) {
          console.error(error.message);
        }
      }
      trucksData();
    }, []);
  
    return {trucksList, setTrucksList};
  }

const TruckList = () => {
   const {trucksList} = useTrucksData();
  return (
    <div className="flex justify-center py-[30px]">
    <div className="">
      <table className='border-collapse'>
        <thead>
          <th className='px-[20px] py-[10px] border border-[#ddd]'>Truck Type</th>
          <th className='px-[20px] py-[10px] border border-[#ddd]'>No. Plate</th>
          <th className='px-[20px] py-[10px] border border-[#ddd]'>Phone Number</th>
          <th className='px-[20px] py-[10px] border border-[#ddd]'>Total Space</th>
          <th className='px-[20px] py-[10px] border border-[#ddd]'>Price</th>
          <th className='px-[20px] py-[10px] border border-[#ddd]'>From</th>
          <th className='px-[20px] py-[10px] border border-[#ddd]'>To</th>
          <th className='px-[20px] py-[10px] border border-[#ddd]'>Cover Photo</th>
          <th className='px-[20px] py-[10px] border border-[#ddd]'>Password</th>
        </thead>
        <tbody>
          {trucksList.map((trucks) => (
            <React.Fragment key={trucks.id}>
              <tr>
                <td className='px-[20px] py-[10px] border border-[#ddd]'>{trucks.transist_type}</td>
                <td className='px-[20px] py-[10px] border border-[#ddd]'>{trucks.number_plate}</td>
                <td className='px-[20px] py-[10px] border border-[#ddd]'>{trucks.phone_number}</td>
                <td className='px-[20px] py-[10px] border border-[#ddd]'>{trucks.space}</td>
                <td className='px-[20px] py-[10px] border border-[#ddd]'>{trucks.price}</td>
                <td className='px-[20px] py-[10px] border border-[#ddd]'>{trucks.from}</td>
                <td className='px-[20px] py-[10px] border border-[#ddd]'>{trucks.to}</td>
                <td className='px-[20px] py-[10px] border border-[#ddd]'>{trucks.coverPhoto}</td>
                <td className='px-[20px] py-[10px] border border-[#ddd]'>{trucks.password}</td>
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

export default TruckList