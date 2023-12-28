
import { BrowserRouter, Link, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './main.css';

function RegisterLink(){
    return(
      <div className='ms-3 mt-1'>
        Account Not found -  <Link className='btn btn-primary' to="/uregister" > Register</Link>
      </div>
    )
  }

export function VideosMain(){

  const [userEmail, setEmail] = useState(['']);
  const [users, setUsers] = useState([{UserId:'', UserName:'', Password:'', Email:'', Mobile:''}]);
  const [userError, setuserError] = useState('');
  let navigate = useNavigate();
  useEffect(()=>{
    axios.get('http://127.0.0.1:4000/users')
    .then(response=>{
     setUsers(response.data);
    })
  },[]); 

  function handleEmailChange(e){
    setEmail(e.target.value);
  }
  
  function handleGetStartedClick(){
    var user = users.find(item => item.Email=== userEmail);
    if(user==undefined){
      setuserError(< RegisterLink />);
    }
  }

    return(
        <div id='bag'>
            <main className=' d-flex justify-content-center mt-5'>
            <div className='brand'>
              <h1 className='fw-bold'>Watch Videos Any where</h1>
              <p className='text-center mt-4 mb-4'>Please register for more technology videos</p>
              <div className='input-group input-group-lg'>
                <input onChange={handleEmailChange} type='email' className='form-control' placeholder=' Email address' />
                <Button onClick={handleGetStartedClick}  variant='contained' color='error'>GET STARTED<span className='bi bi-chevron-right'></span></Button>
              </div>
              <p className='text-danger'>{userError}</p>
            </div>
          </main>
        </div>
    )
}