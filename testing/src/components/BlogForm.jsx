import React, { useState,useEffect } from 'react';
import axios from 'axios';

const BlogForm = () => {
  const [data , setData] = useState([])
  const fetchData = async()=>{
    const res = await axios.get("http://localhost:5000/api/v1/blogs/bulk");
    const dataUrl = res.data.data
   
  
    setData(dataUrl);
  }
  

 
useEffect(() => {
 fetchData();
}, []);
 


 

  return (
    <>
   
<h1>help me too</h1>
    <div>
        {
            data.map((value ,index)=>(
                <div key={index}>
                    <img src={`${value.image}`} alt="" srcSet="" />
                    <h1>{index}</h1>
                </div>
            ))
        }
    </div>
    </>
  );
};

export default BlogForm;
