import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";


export default function ResetPassword() {
    let nav = useNavigate()
    let x = Yup.object({
        email : Yup.string().email('email is invalid').required('email is required'),
        newPassword : Yup.string().required('password is required').matches(/^[A-Z][a-z0-9]{5,10}$/ , 'password must be start with uppercase and at least 6 characters'),
    })
let formik = useFormik({
    initialValues :{
        email : "",
    newPassword : ""
    },validationSchema:x ,
    onSubmit : sendResetPassword
})
async function sendResetPassword(val){
console.log(val);
let {data} = await axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword` , val)
console.log(data);
if(data.token){
nav("/login")
}
}


    return <>
  <div className="container">
    <h2>reset your account password</h2>
    <form onSubmit={formik.handleSubmit}>
    <div className="form-floating my-3">
        <input onChange={formik.handleChange} onBlur={formik.handleBlur} name="email" type="email" id="floatingInput" placeholder="name@example.com" formcontrolname="email" className="form-control"/>
            <label htmlFor="floatingInput">Email </label>
            </div>
            {formik.errors.email && formik.touched.email ? <div className="alert alert-danger mt-2 p2">{formik.errors.email}</div>:''}

            <div className="form-floating my-3">
        <input onChange={formik.handleChange} onBlur={formik.handleBlur} name="newPassword" type="password" id="floatingInput"  formcontrolname="newPassword" className="form-control"/>
            <label htmlFor="floatingInput">New Password </label>
            </div>
            {formik.errors.newPassword && formik.touched.newPassword ? <div className="alert alert-danger mt-2 p2">{formik.errors.newPassword}</div>:''}

            <button disabled={!(formik.isValid && formik.dirty)}  type="submit" className="btn btn-lg btn-outline-success me-auto mt-3">reset password</button>
    </form>
    </div>
    </>
}

