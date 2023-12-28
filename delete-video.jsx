import { useEffect, useState } from "react"
import axios from "axios";
import { useFormik } from "formik";
import { Link, useNavigate, useParams } from "react-router-dom";
export function DeleteVideo(){

    const [categories, setCategories] = useState([{Category_Id:0, CategoryName: ''}]);
    const [videos, setVideos] = useState([{VideoId:0, Url: '', Like:0, Comments:'', Category_Id:0}]);
    let navigate = useNavigate();

    let params = useParams();

    useEffect(()=>{
        axios.get(`http://127.0.0.1:4000/video/${params.id}`)
        .then(response=>{
            setVideos(response.data);
        })
    },[]);

    function handleDeleteClick(){
        axios.delete(`http://127.0.0.1:4000/deletevideo/${params.id}`);
        alert('Video Deleted');
        navigate('/admindashboard');
    }
    return(
        <div className="container-fluid">
            <h3>Delete Video</h3>
            <div>
                <h3>{videos[0].Title}</h3>
                <iframe src={videos[0].Url} width="400" height="300"></iframe>
            </div>
            <div className="mt-3">
                <button onClick={handleDeleteClick} className="btn btn-danger">Delete</button>
                <Link to="/admindashboard" className="btn btn-warning ms-2">Cancle</Link>
            </div>
        </div>
    )
}