import { useState, useEffect } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { login, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'
import {useNavigate } from 'react-router-dom'
import Header from '../components/Header'

function Login() {
  const [number_plate, setNumberPlate] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    // if (isSuccess || user) {
    //   navigate('/');
    // }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

 
  const onSubmit = (e) => {
    e.preventDefault()

    const userData = {
      number_plate,
      password,
    }

    dispatch(login(userData));
    navigate('/');
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
    <Header/>
    <div className="register">
      

      <section className='heading' >
       
       <h1>
         <FaSignInAlt /> Login
       </h1>
     </section>
      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              id='number_plate'
              name='number_plate'
              placeholder='Vehicle Number Plate'
              value={number_plate}
              onChange={(e) => setNumberPlate(e.target.value)}
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password'
              name='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Enter password'
            />
          </div>

          <div className='form-group'>
            <button type='submit' className='btn btn-block'>
              Submit
            </button>
          </div>
          
        </form>
      </section>
    </div>
    </>
    
   
  )
}

export default Login
