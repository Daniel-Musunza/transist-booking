import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Front from './Dashboard/Front'
import TruckList from './Dashboard/TruckList'
import Bookings from './pages/Bookings'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import BookingList from './Dashboard/BookingList'
import Header from './components/Header'
function App() {
  return (
    <>
      <Router>
        <div>
          <Header />
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/bookings' element={<Bookings />} />
            <Route path='/login' element={<Login />} />
            <Route path='/dashboard' element={<Front />}>
              <Route path='registerTruck' element={<Register />} />
              <Route path='trucksList' element={<TruckList />} />
              <Route path='bookingList' element={<BookingList />} />
            </Route>
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
