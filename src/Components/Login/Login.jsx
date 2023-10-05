import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { BallTriangle } from  'react-loader-spinner';
import { UserContext } from "../../Context/UserContext";
import { Helmet } from "react-helmet";






export default function Login() {
    let {setUserToken} = useContext(UserContext)
    let navigate = useNavigate()
    let [error , setError]= useState(null);
    let [isLoadind , setIsLoading]= useState(false)

   async function loginSubmit(values){
    setIsLoading(true)
let {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin" , values)
.catch(
    (err)=> {
        setIsLoading(false)
        setError(err.response.data.message)
    })



if (data.message === "success"){
    setIsLoading(false);
    localStorage.setItem("userToken" , data.token);
    setUserToken(data.token)

    navigate('/')
}


}
    let x = Yup.object({
        email : Yup.string().email('email is invalid').required('email is required'),
        password : Yup.string().required('password is required').matches(/^[A-Z][a-z0-9]{5,10}$/ , 'password must be start with uppercase and at least 6 characters'),
    })

    let formik = useFormik({
        initialValues:{
            email:'',
            password:''        
        }, validationSchema:x ,
         onSubmit:loginSubmit
    })
    return <>
    <Helmet>
<title>Login</title>
</Helmet>
    <div className="w-75 mx-auto py-4">
        <h3 className="mb-3">Login Now :</h3>
        {error !== null ? <div className="alert alert-danger">{error}</div> : ''}
    <form onSubmit={formik.handleSubmit}>

       
        <label htmlFor="email">Email :</label>
        <input className="form-control mb-2" name="email" id="email" type="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
        {formik.errors.email && formik.touched.email ? <div className="alert alert-danger mt-2 p2">{formik.errors.email}</div>:''}

       
        <label htmlFor="password">Password :</label>
        <input className="form-control mb-2" name="password" id="password" type="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} />
        {formik.errors.password && formik.touched.password ? <div className="alert alert-danger mt-2 p2">{formik.errors.password}</div>:''}


{isLoadind? <button  type="button" className="btn bg-main text-white m-0">
<BallTriangle
  height={40}
  width={100}
  radius={5}
  color="#fff"
  ariaLabel="ball-triangle-loading"
  wrapperClass={{}}
  wrapperStyle=""
  visible={true}
/>
</button> : 
<div className="d-flex justify-content-center align-items-between">
<Link className="forget" to="/forgetpassword">Forget Password?</Link>

<button disabled={!(formik.isValid && formik.dirty)} type="submit" className="btn bg-main text-white mt-2 mx-2 ms-auto">Login</button>
</div>
 }



    </form> 
    </div>
    

    </>
}

