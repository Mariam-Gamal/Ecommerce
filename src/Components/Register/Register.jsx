import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Bars } from  'react-loader-spinner';
import { Helmet } from "react-helmet";





export default function Register() {
    let phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    let navigate = useNavigate()
    let [error , setError]= useState(null);
    let [isLoadind , setIsLoading]= useState(false)

   async function submitRegister(values){
    setIsLoading(true)
let {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup" , values)
.catch(
    (err)=> {
        setIsLoading(false)
        setError(err.response.data.message)
    })



if (data.message === "success"){
    setIsLoading(false)

    navigate('/login')
}


}
    let x = Yup.object({
        name : Yup.string().required('name is required').min(3).max(15),
        email : Yup.string().email('email is invalid').required('email is required'),
        phone : Yup.string().matches(phoneRegex , 'phone is invalid').required('phone is required'),
        password : Yup.string().required('password is required').matches(/^[A-Z][a-z0-9]{5,10}$/ , 'password must be start with uppercase and at least 6 characters'),
        rePassword : Yup.string().required('rePassword is required').oneOf([Yup.ref("password")])
    })

    let formik = useFormik({
        initialValues:{
            name:'',
            email:'',
            phone:'',
            password:'',
            rePassword:''
        
        }, validationSchema:x ,
         onSubmit:submitRegister
    })
    return <>
    <Helmet>
<title>Register</title>
</Helmet>
    <div className="w-75 mx-auto py-4">
        <h3 className="mb-3">Register Now :</h3>
        {error !== null ? <div className="alert alert-danger">{error}</div> : ''}
    <form onSubmit={formik.handleSubmit}>

        <label htmlFor="name">Name :</label>
        <input className="form-control mb-2" name="name" id="name" type="text" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} />
        {formik.errors.name && formik.touched.name ? <div className="alert alert-danger mt-2 p2">{formik.errors.name}</div>:''}

        <label htmlFor="email">Email :</label>
        <input className="form-control mb-2" name="email" id="email" type="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
        {formik.errors.email && formik.touched.email ? <div className="alert alert-danger mt-2 p2">{formik.errors.email}</div>:''}

        <label htmlFor="phone">Phone :</label>
        <input className="form-control mb-2" name="phone" id="phone" type="tel" value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} />
        {formik.errors.phone && formik.touched.phone ? <div className="alert alert-danger mt-2 p2">{formik.errors.phone}</div>:''}

        <label htmlFor="password">Password :</label>
        <input className="form-control mb-2" name="password" id="password" type="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} />
        {formik.errors.password && formik.touched.password ? <div className="alert alert-danger mt-2 p2">{formik.errors.password}</div>:''}

        <label htmlFor="rePassword">RePassword :</label>
        <input className="form-control mb-2" name="rePassword" id="rePassword" type="password" value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur} />
        {formik.errors.rePassword && formik.touched.rePassword ? <div className="alert alert-danger mt-2 p2">{formik.errors.rePassword}</div>:''}


{isLoadind? <button  type="button" className="btn bg-main text-white m-0">
<Bars
  height="40"
  width="80"
  color="#fff"
  ariaLabel="bars-loading"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
/>
</button> : <button disabled={!(formik.isValid && formik.dirty)} type="submit" className="btn bg-main text-white mt-2">Register</button>
 }



    </form> 
    </div>
    

    </>
}

