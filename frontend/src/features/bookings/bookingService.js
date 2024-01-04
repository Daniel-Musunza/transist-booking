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

const getbookings = async (token) => {
    const response = await axios.get(API_URL)

  return response.data
}

const bookingService = {
  getbookings,
  addbooking
}


export default bookingService
