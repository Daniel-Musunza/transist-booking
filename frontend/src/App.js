import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import Bookings from './pages/Bookings'
import Front from './Dashboard/Front'
function App() {
  return (
    <>
      <Router>
        <div>
          {/* <Header /> */}
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/bookings' element={<Bookings />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/dashboard' element={<Front />}>

            </Route>
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
