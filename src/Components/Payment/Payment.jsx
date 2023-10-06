import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { CartContext } from "../../Context/CartContext";

import { Bars } from  'react-loader-spinner';
import { Helmet } from "react-helmet";

export default function Payment() {
    let {onlinePayment , cartId} = useContext(CartContext);
    const[Loader , setLoader] = useState(false)


    let CurrentUrl = window.location.origin ;
    console.log(CurrentUrl);

   async function handleUserSubmit(values){
        console.log(values);
        setLoader(true);
        let response = await onlinePayment(cartId , CurrentUrl + '/Ecommerc/#'  , values);
        console.log(response);
        console.log(response.session.url);
        window.open(response.session.url , '_blank');

        setLoader(false);


    }
let formik = useFormik({
    initialValues:{
        details : '',
        phone: '',
        city: ''
    },
    onSubmit:handleUserSubmit
})


    return <>
    <Helmet>
<title>Payment</title>
</Helmet>
    <div className="container">
        <form onSubmit={formik.handleSubmit}>
            <label htmlFor="details">Details</label>
            <input value={formik.values.details} onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" className="form-control mb-2" name="details" id="details" />

            <label htmlFor="phone">Phone</label>
            <input value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} type="tel" className="form-control mb-2" name="phone" id="phone" />

            <label htmlFor="city">City</label>
            <input value={formik.values.city} onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" className="form-control mb-2" name="city" id="city" />
<button className="btn bg-main text-white w-100 mt-3" type="submit">{Loader? <div className="d-flex justify-content-center"><Bars 
                    height="40"
                    width="80"
                    color="#fff"
                    ariaLabel="bars-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                    /> </div> :  "Pay Now"}</button>

        </form>
    </div>
    </>
}

