import { useEffect, useState } from "react"
import axios from "axios";
import { useFormik } from "formik";
import { Link, useNavigate, useParams } from "react-router-dom";
import './edit.css';

export function EditVideo(){

    const [categories, setCategories] = useState([{Category_Id:0, CategoryName: ''}]);
    const [videos, setVideos] = useState([{VideoId:0, Url: '', Like:0, Comments:'', Category_Id:0}]);
    let navigate = useNavigate();

    let params = useParams();

    const formik = useFormik({
        initialValues: {
            VideoId: videos[0].VideoId,
            Title: videos[0].Title,
            Url: videos[0].Url,
            Likes: videos[0].Likes,
            Comments: videos[0].Comments,
            Category_Id:videos[0].Category_Id
        },
        enableReinitialize: true,
        onSubmit: (values)=>{
            axios.put(`http://127.0.0.1:4000/editvideo/${params.id}`,values);
            alert('Video Updated..')
            navigate('/admindashboard');
        }
    })
    function loadCategories(){
        axios.get('http://127.0.0.1:4000/categories')
        .then(res=>{
            res.data.unshift({Category_Id:-1, CategoryName:'select category'})
            res.data.push({Category_Id:6, CategoryName:'Memories-2021'})
            setCategories(res.data)
        })
    }
    useEffect(()=>{
        loadCategories();
        axios.get(`http://127.0.0.1:4000/video/${params.id}`)
        .then(response=>{
            setVideos(response.data);
        })
    },[]);
    return(
        <div className="container-fluid">
            <div id="container">
            <form onSubmit={formik.handleSubmit}>
                <dl>
                    <dt>Video Id</dt>
                    <dd><input type="number" value={formik.values.VideoId} onChange={formik.handleChange} name="VideoId" /></dd>
                    <dt>Title</dt>
                    <dd><input type="text" value={formik.values.Title} onChange={formik.handleChange} name="Title" /></dd>
                    <dt>Url</dt>
                    <dd><input type="text" value={formik.values.Url} onChange={formik.handleChange} name="Url" /></dd>
                    <dt>Likes</dt>
                    <dd><input type="number" value={formik.values.Likes} onChange={formik.handleChange} name="Likes" /></dd>
                    <dt>comments</dt>
                    <dd><input type="text" value={formik.values.Comments} onChange={formik.handleChange} name="Comments" /></dd>
                    <dt>Category</dt>
                    <dd>
                        <select name="Category_Id" value={formik.values.Category_Id} onChange={formik.handleChange}>
                          {
                            categories.map(category=>
                                <option value={category.Category_Id} key={category.Category_Id}>
                                    {category.CategoryName.toUpperCase()}
                                </option>
                                )
                          }
                        </select>
                    </dd>
                </dl>
                <button className="btn btn-success">Save</button>
                <Link to="/admindashboard" className="btn btn-danger m-2" >Cancle</Link>
            </form>
            </div>
        </div>
    )
}