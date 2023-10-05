import React from "react";


import slide1 from '../../Assets/images/slide-1.jpg';
import slide2 from '../../Assets/images/slide-2.jpg';
import slide3 from '../../Assets/images/slide-3.jpg';
import slide4 from '../../Assets/images/slide-4.jpg';
import slide5 from '../../Assets/images/slide-5.jpg';
import Slider from "react-slick";



export default function MainSlider() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows:false,
        autoplay:true,
      };

    return <>
    
        <div className="row g-0 justify-content-center py-5 ">
            <div className="col-md-3">
            <Slider {...settings}>
            <img  className="w-100" src={slide1} alt="ads" />
            <img  className="w-100" src={slide2} alt="ads" />
            <img  className="w-100" src={slide3} alt="ads" />

          </Slider>
            </div>
            <div className="col-md-3">
                <img className="w-100" src={slide4} alt="ads" />
                <img className="w-100" src={slide5} alt="ads" />
            </div>
        </div>
        
    
    
    </>
}

