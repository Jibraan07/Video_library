import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route,  Routes, useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

import { VideosMain } from './Components/videos-main';
import { UserRegister } from './Components/user-register';
import { UserLogin } from './Components/user-login';
import { UserDashboard } from './Components/user-dashboard';
import { useCookies } from 'react-cookie';
import { AdminLogin } from './Components/admin-login';
import { AdminDashboard } from './Components/admin-dashboard';
import { AddVideo } from './Components/add-video';
import { EditVideo } from './Components/edit-video';
import { DeleteVideo } from './Components/delete-video';




function SignoutComponent(){
  const [cookies, setCookie, removeCookie] = useCookies('userName');
  let navigate = useNavigate();
  function handleSignout(){
    removeCookie('userName');
    navigate('/userlogin');
  }
  return(
    <button onClick={handleSignout}  className='btn btn-light me-2'>Sign out</button>
  )
}

function App() {

  const [cookies, setCookie, removeCookie] = useCookies('userName');
  
  return (
     <div className='bg-dark text-light '  style={{height:'200vh'}} >
      <BrowserRouter>
         <header className=' p-2 d-flex justify-content-between'>
          <div>
            <span className='h1 fw-bold '><Link style={{color:'white' , textDecoration: 'none'}} to="/" >Video Home <span className='bi bi-youtube btn btn-danger'></span></Link></span>
          </div>
          <div>
            {
              (cookies['userName']===undefined) ? <Link className='btn btn-info me-2' to="/userlogin">Sign in<span className='bi bi-person'></span></Link> : <SignoutComponent /> 
            }
            
            <Link to="/adminlogin" className='btn btn-warning'>Admin Dashboard <span className=' bi bi-person-fill'></span></Link>
          </div>
         </header>
         <section>
           <Routes>
            <Route path='/' element={<VideosMain />} />
            <Route path='uregister' element={<UserRegister />} />
            <Route path='userlogin' element={<UserLogin />} />
            <Route path='userdashboard' element={<UserDashboard />} />
            <Route path='adminlogin' element={<AdminLogin />} />
            <Route path='admindashboard' element={<AdminDashboard />} />
            <Route path='addvideo' element={<AddVideo />} />
            <Route path='editvideo/:id' element={<EditVideo />}/>
            <Route path='deletevideo/:id' element={<DeleteVideo />} />
           </Routes>
         </section>
      
      </BrowserRouter>

     </div>
    
  );
}

export default App;
