import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import Slider from "react-slick";




export default function CategorySlider() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 6,
        slidesToScroll: 1
      };

    function getCategories(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    }
    let {isLoading , isError , data} = useQuery('categorySlider' , getCategories )
    return <>
{data?.data.data?  <div className="py-3"><Slider {...settings}>
    {data?.data.data.map((category)=> <div key={category._id}>
        <img style={{objectFit:'cover'}} height={250} className="w-100" src={category.image} alt="category"/>
        <h4 className="fw-bold">{category.name}</h4>
    </div> )}
    </Slider> </div>: ''}
    </>

}
