import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export function AdminDashboard(){

    const [cookies, setCookie, removieCookie] = useCookies('adminName')
    const [videos, setVideos] = useState([{VideoId:0, Title:'', Url:'', Comments:'', Likes:'',Category_Id:''}]);
    let navigate = useNavigate();
    function LoadVideos(){
        axios.get('http://127.0.0.1:4000/videos')
        .then(response=>{
            setVideos(response.data);
        })
    }
    useEffect(()=>{
        LoadVideos();
        if(cookies['adminName']===undefined){
           navigate('/adminlogin')
        } else {
            LoadVideos();
        }
    },[]);

    return(
        <div>
            <h3 className="container-fluid">{cookies['adminName']} - Dashboard</h3>
            <div className="mb-4">
                <Link to="/addvideo" className="btn btn-info ms-1 mt-1">Add New Video</Link> <span><Link to="/userdashboard" className="btn btn-success">Back </Link></span>
            </div>

            <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Preview</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            videos.map(video=>
                                <tr key={video.VideoId}>
                                    <td width="200">{video.Title}</td>
                                    <td>
                                        <iframe src={video.Url} width="300" height="150"></iframe>
                                    </td>
                                    <td>
                                        <Link to={`/editvideo/${video.VideoId}`} className="btn btn-warning bi bi-pen-fill me-2"></Link>
                                        <Link to={`/deletevideo/${video.VideoId}`} className="btn btn-danger bi bi-trash-fill"></Link>
                                    </td>
                                </tr>
                                )
                        }
                        
                    </tbody>
                    
                </table>
                
        </div>
    )
}