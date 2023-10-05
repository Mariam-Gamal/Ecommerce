import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";
import Slider from "react-slick";
import { Helmet } from "react-helmet";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { Bars } from  'react-loader-spinner';
import { WishListContext } from "../../Context/WhishListContext";



export default function ProductDetails() {
    var settings = {
        dots: true,
        infinite: true,
        autoplay:true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1
      };
    
    let params = useParams();
    // console.log(params.id);



   const[Loader , setLoader] = useState(false)

    let {addToCart} = useContext(CartContext);
    let {addToWish} = useContext(WishListContext);


    async function addProductToCart(id){
        setLoader(true)
        let data = await addToCart(id);
 if(data.status === 'success'){
 toast.custom(<div className="bg-main p-3 position-fixed top-0 end-0 text-white rounded-2"><i className="fa-solid fa-cart-arrow-down fa-1x"></i> {data.message} </div>);
 }else{
 toast.error('error')
 }
 setLoader(false)
     }

     async function addProductToWish(id){
        let data = await addToWish(id);
        console.log(data);
        if(data.status === 'success'){
            document.getElementById('heart').classList.add('red')
            toast.custom(<div className="bg-main p-3 position-fixed top-0 end-0 text-white rounded-2"> ✔️ {data.message}❤️ </div>);
        }

     }

    function getProductDetails(id){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    }
    let {data , isError , isLoading} = useQuery('productDetails' , ()=> getProductDetails(params.id));
    return <>
    {data?.data.data ? 
        <div className="row py-5 align-items-center">
            <Helmet>
                <title>{data?.data.data.title}</title>
            </Helmet>
            <div className="col-md-4">
            <Slider {...settings}>
      {data?.data.data.images.map((img)=> <img key={params.id} className="w-100" src={img} alt={data?.data.data.title}></img>)}
    </Slider>
            </div>
            <div className="col-md-8">
                <h2>{data?.data.data.title}</h2>
                <p>{data?.data.data.description}</p>
                <div className="d-flex justify-content-between align-items-center ">
                <p>{data?.data.data.price} EGP</p>
                <p> <i className="fa fa-star gold rating-color"></i> {data?.data.data.ratingsAverage} </p>
                </div>
                <div className="d-flex justify-content-between align-items-center ">
                <button onClick={()=>addProductToCart(params.id)} className="btn bg-main text-white w-75 mt-4">
                    {Loader? <div className="d-flex justify-content-center"><Bars 
                    height="40"
                    width="80"
                    color="#fff"
                    ariaLabel="bars-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                    /> </div> :  "+ Add"}
                   </button>
                <i id="heart" onClick={()=> addProductToWish(params.id)} className="fa-solid fa-heart h3 cursor-pointer"></i>
                </div>
            </div>
        </div>

  : ''}
    
        </>
}

