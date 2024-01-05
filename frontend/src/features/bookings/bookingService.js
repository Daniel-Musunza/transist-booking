import axios from 'axios'

const API_URL = 'https://transist-api.onrender.com/api/bookings/'

const addbooking = async (bookingData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL , bookingData, config)

  return response.data
}

const getbookings = async () => {
    const response = await axios.get(API_URL)

  return response.data
}
const searchMyBooking = async (userData) => {
  const response = await axios.post(API_URL + 'searchMyBooking', userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}
const confirmReceived = async (userData, userId) => {


  const response = await axios.put(API_URL + 'received/' + userId, userData)

  return response.data
}
const confirmNotReceived = async (userData, userId) => {


  const response = await axios.put(API_URL + 'notReceived/' + userId, userData)

  return response.data
}
const bookingService = {
  getbookings,
  addbooking,
  searchMyBooking,
  confirmReceived,
  confirmNotReceived
}


export default bookingService
