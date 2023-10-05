import axios from "axios";
import React from "react";
import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import { ColorRing } from  'react-loader-spinner';



export default function Brands() {

    function getAllBrands(){
     return  axios.get(`https://route-ecommerce.onrender.com/api/v1/brands`)
    }

   let{isLoading , data}= useQuery('allBrands' , getAllBrands);
   console.log(data?.data.data);


    return <>
    <Helmet>
<title>Brands</title>
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
<h1 className="text-main text-center mb-5 fw-bolder">All Brands</h1>
    <div className="row g-4">
        {data?.data.data.map((brand)=>{
            return <div key={brand._id} className="col-md-3 cursor-pointer">

                <div data-bs-toggle="modal" data-bs-target={"#" + brand.name} className="card">
                    <div className="card-img">
                        <img src={brand.image} alt="brand" className="w-100" />
                    </div>
                    <div className="card-body">
                        <p className="text-center">{brand.name}</p>
                    </div>
                </div>
            </div>
        })}
        
    </div>
{data?.data.data.map((brand)=>{
    return <div key={brand._id} className="modal fade" id={brand.name} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">
          <div className="container">
            <div className="row d-flex justify-content-center align-items-center">
                <div className="col-md-6">
                    <h1 className="text-main fw-bold">{brand.name}</h1>
                    <p>{brand.slug}</p>

                </div>
                <div className="col-md-6">
                <img src={brand.image} alt="brand" className="w-100" />

                </div>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
})}

</div>

}

    </>
}


