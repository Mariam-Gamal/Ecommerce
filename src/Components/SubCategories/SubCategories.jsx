import React, { useContext } from "react";
import Categories from "../Categories/Categories";
import { CategoryContext } from "../../Context/CategoryContext";
import { ColorRing } from  'react-loader-spinner';



export default function SubCategories() {
    let {subCategories ,data} = useContext(CategoryContext);
console.log(data);
    return <>
{subCategories? <div className="container">
<Categories/>

<h2  className="text-center fw-bolder text-warning my-4 ng-star-inserted"> subcategories</h2>
    
    <div className="row gy-3">
    {subCategories.data.map((sub)=> {
            return  <div key={sub._id} className="col-md-4">
            <div className="card">
            <p  className="h3 fw-bold text-center p-3">{sub.name}</p>  
          </div>
        </div>

        })}

    </div>
</div>  : <div className=" vh-100 d-flex justify-content-center align-items-center">
    <ColorRing
  visible={true}
  height="80"
  width="80"
  ariaLabel="blocks-loading"
  wrapperStyle={{}}
  wrapperClass="blocks-wrapper"
  colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
/>
    </div>}
  </>
}

