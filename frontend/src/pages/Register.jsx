import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaUser } from 'react-icons/fa'
import { register, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function Register() {
  const [transist_type, setTransistType] = useState('');
  const [number_plate, setNumberPlate] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [space, setSpace] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [departure_date, setDepartureDate] = useState('');
  const [price, setPrice] = useState('');
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');



  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  
  
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    // if (isSuccess || user) {
     
    //     navigate('/');
    // }
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const handleRegister = async (e) => {
    e.preventDefault();


    if (password !== password2) {
      toast.error('Passwords do not match');
    } else {
      const formData = new FormData(); // Create a FormData object


      formData.append('transist_type', transist_type); 
      formData.append('number_plate', number_plate);
      formData.append('phone_number', phone_number);
      formData.append('space', space); 
      formData.append('from', from);
      formData.append('to', to);
      formData.append('departure_date', departure_date); 
      formData.append('price', price); 
      formData.append('password', password); 
      formData.append('coverPhoto', coverPhoto);
  
      // Now you can dispatch your API call with the formData
      dispatch(register(formData));;
        navigate('/');
 
    }

  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="register">
      
      <section className='heading'>
        <h1>
          <FaUser /> Register
        </h1>
      </section>
    <section className='form'>
      <form onSubmit={handleRegister}>
        {/* ... */}
        <div className='form-group'>
         
        <label style={{ display: 'flex', height: '20px' }}>Transist Type <span style={{marginLeft: '10px', cursor: 'pointer', color: 'green', textTransform: 'none' }}>Learn More</span></label>
                        <select 
                        className="form-control schedule_type"
                         id="transist_type"
                          name="schedule_type"
                          value={transist_type}
                          onChange={(e) => setTransistType(e.target.value)}>
                          <option value="" selected>Select....</option>
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
              type='number'
              className='form-control'
              id='phone_number'
              name='phone_number'
              placeholder='Driver Phonenumber'
              value={phone_number}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div className='form-group'>
            <input
              type='number'
              className='form-control'
              id='space'
              name='space'
              placeholder='Space Available (in Square Meters)'
              value={space}
              onChange={(e) => setSpace(e.target.value)}
            />
          </div>
          
          <div className='form-group'>
          <label>From</label>
                        <select 
                        className="form-control terminal_id" 
                        id="from"
                          name="town_id" 
                          required="true"
                          value={from}
                          onChange={(e) => setFrom(e.target.value)}>
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
            <div className='form-group'>
            <label>To</label>
                        <select 
                        className="form-control terminal_id" 
                        id="to"
                          name="town_id"
                          value={to}
                          onChange={(e) => setTo(e.target.value)} 
                          required="true">
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
            <div className='form-group'>
              <label htmlFor="depature">Depature Date</label>
            <input
              type='date'
              className='form-control'
              id='departure_date'
              name='departure_date'
              value={departure_date}
              onChange={(e) => setDepartureDate(e.target.value)}
            />
            </div>
            <div className='form-group'>
            <input
              type='number'
              className='form-control'
              id='price'
              name='price'
              placeholder='Price (KSH) per square meters'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className='form-group'>
            <label htmlFor="image">upload Cover photo</label>
            <input
              type='file'
              className='form-control'
              id='image'
              name='image'
              onChange={(e) => setCoverPhoto(e.target.files[0])}
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
            <input
              type='password'
              className='form-control'
              id='password2'
              name='password2'
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              placeholder='Confirm password'
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
  )
}

export default Register
