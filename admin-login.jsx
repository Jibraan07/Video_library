  import { Link } from "react-router-dom";
  import axios from "axios";
  import { Formik, useFormik } from "formik";
  import { useState, useEffect } from "react";
  import { useNavigate } from "react-router-dom";
  import { useCookies } from "react-cookie";
  import { TextField, Button } from '@mui/material';

export function AdminLogin(){

    let navigate = useNavigate();
    const [users, setUsers] = useState([{UserId:'', Password:''}]);
    const [usererror, setUserError] = useState('');
    const [cookies, setCookie,removieCookie] = useCookies('adminName')

    const formik = useFormik({
        initialValues: {
            UserId: '',
            Password:''
        },
        onSubmit: (values)=>{
            var user = users.find(item=> item.UserId===values.UserId);
            if(user.Password===values.Password){
                setCookie("adminName",user.UserId)
                navigate("/admindashboard");
            } else {
                setUserError('Invalid Credentials')
            }
        }
    })

    useEffect(()=>{
        axios.get('http://127.0.0.1:4000/admin')
        .then((res)=>{
            setUsers(res.data);
        })
    },[])
    return(
        <div className="container-fluid">
            <form onSubmit={formik.handleSubmit}>
                <div className="admin">
                    <h1>Admin Login</h1>
                    <dl>
                        <dt>Admin Id</dt>
                        <dd><input type="text"  onChange={formik.handleChange} required  name="UserId" className="form-control w-auto" /></dd>
                        <dt>Password</dt>
                        <dd><input type="text" onChange={formik.handleChange} required  name="Password" className="form-control w-auto" /></dd>
                    </dl>
                    <button className="btn btn-primary">Login</button>
                    <Link to="/userdashboard" className="btn btn-success ms-3">Back</Link>
                </div>
                <p className="h3 text-danger">{usererror}</p>
            </form>
        </div>
    )
}