import { useEffect, useState } from "react"
import axios from "axios";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";

export function AddVideo(){
    const [categories, setCategories] = useState([{Category_Id:0, CategoryName: ''}]);

    let navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            VideoId: 0,
            Title: '',
            Url: '',
            Likes: 0,
            Comments: '',
            Category_Id:0
        },
        onSubmit : (values)=>{
            axios.post('http://127.0.0.1:4000/addvideo', values)
            alert('Video Add Successfully..');
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
    },[]);

    return(
        <div className="container-fluid">
            <h3>New Video</h3>
            <form onSubmit={formik.handleSubmit}>
                <dl>
                    <dt>Video Id</dt>
                    <dd><input type="number" onChange={formik.handleChange} required name="VideoId" /></dd>
                    <dt>Title</dt>
                    <dd><input type="text" onChange={formik.handleChange} required name="Title" /></dd>
                    <dt>Url</dt>
                    <dd><input type="text" onChange={formik.handleChange} required name="Url" /></dd>
                    <dt>Likes</dt>
                    <dd><input type="number" onChange={formik.handleChange} required name="Likes" /></dd>
                    <dt>comments</dt>
                    <dd><input type="text" onChange={formik.handleChange} required name="Comments" /></dd>
                    <dt>Category</dt>
                    <dd>
                        <select required name="Category_Id" onChange={formik.handleChange}>
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
                <button className="btn btn-primary">Save</button>
                <Link to="/admindashboard" className="btn btn-success ms-2">Back</Link>
            </form>
        </div>
    )
}