import React, { useContext } from "react";
import { Helmet } from "react-helmet";
import { ColorRing } from  'react-loader-spinner';
import { Link } from "react-router-dom";
import { CategoryContext } from "../../Context/CategoryContext";




export default function Categories() {




let{getSubcategories ,isLoading , data}=  useContext(CategoryContext);
async function getSub(id){
   await getSubcategories(id)
}


    return <>
    <Helmet>
<title>Categories</title>
</Helmet>

{isLoading? <div className=" vh-100 d-flex justify-content-center align-items-center">
    <ColorRing
  visible={true}
  height="80"
  width="80"
  ariaLabel="blocks-loading"
  wrapperStyle={{}}
  wrapperClass="blocks-wrapper"
  colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
/>
    </div> : <div className="container">
        <div className="row g-4">
            {data?.data.data.map((category)=> {
                return <div key={category._id} className="col-md-4">
                    <Link to={`/subcategories`}>
                    <div onClick={()=>getSub(category._id)} className="card cursor-pointer">
                    <img style={{objectFit:'cover'}} height={250} className="card-img w-100" src={category.image} alt="category"/>
                    <div className="card-body">
                    <p className="fw-bold text-success h3 text-center">{category.name}</p>
                    </div>
                    </div>
                    </Link>
                   
                </div>
            } )}
        </div>
        
    </div>  }
    </>
}

