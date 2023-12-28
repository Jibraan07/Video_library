import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"
import axios from "axios";
import { useNavigate } from "react-router-dom";
export function UserDashboard(){
    const [cookies, setCookie, removieCookie] = useCookies('userName')
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
        if(cookies['userName']===undefined){
           navigate('/userlogin')
        } else {
            LoadVideos();
        }
    },[]);
    return(
        <div className="container-fluid">
            <h2>{cookies['userName']} - Dashboard</h2>
            <section className="d-flex flex-wrap">
                {
                    videos.map(video=>
                        <div key={video.VideoId} className="card p-2 m-2" style={{width: '280px'}}>
                            <div className="card-header" style={{height:'100px'}}>
                                <h3>{video.Title}</h3>
                            </div>
                            <div className="card-body">
                                <iframe src={video.Url} width="100%" height="150">

                                </iframe>
                            </div>
                            <div className="card-footer">
                                <span className="bi bi-hand-thumbs-up"></span> {video.Likes} Likes
                                <div>
                                    <label className="form-lable fw-bold">Comments:</label>
                                    <div>
                                    {video.Comments}
                                    </div>
                                </div>
                            </div>
                        </div>
                        )
                }
            </section>
        </div>
    )
}