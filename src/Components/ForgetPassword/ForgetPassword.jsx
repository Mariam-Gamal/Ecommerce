import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";


export default function ForgetPassword() {
    let Nav = useNavigate();
    let validationSchema = Yup.object({
        email : Yup.string().email('email is invalid').required('email is required'),
    })
    let validationSchema2 = Yup.object({
        resetCode : Yup.string().required('code is required')
    })
let formik = useFormik({
    initialValues:{
        email:""
    },
    validationSchema,
    onSubmit: sendForgetPassword
})
async function sendForgetPassword(values){
console.log(values);
let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords` , values)
.catch((err)=> {
    console.log(err);
} )
if(data.statusMsg === "success"){
    document.getElementById("resetForm").classList.remove('d-none');
    document.getElementById("forgetForm").classList.add('d-none');

}
console.log(data);
}

let resetForm = useFormik({
    initialValues: {
        resetCode: ""
    },validationSchema: validationSchema2 , 
    onSubmit : verifyResetCode
})
const [error , seterror] = useState("")
async function verifyResetCode(values){
    console.log(values);
    let { data } = await axios.post(`https://route-ecommerce.onrender.com/api/v1/auth/verifyResetCode`, values).catch((err)=> {
    console.log(err);
    seterror(err.response.data.message)
} )

if(data.status === "Success"){
Nav("/resetpassword")
}

console.log(data);

}

    return <>
    <div id="forgetForm" className="container">
    <h2>please enter your verification code</h2>
    <form onSubmit={formik.handleSubmit}>
    <div className="form-floating my-3">
        <input onChange={formik.handleChange} onBlur={formik.handleBlur} name="email" type="email" id="floatingInput" placeholder="name@example.com" formcontrolname="email" className="form-control"/>
            <label htmlFor="floatingInput">Email </label>
            </div>
            {formik.errors.email && formik.touched.email ? <div className="alert alert-danger mt-2 p2">{formik.errors.email}</div>:''}
            <button  disabled={!(formik.isValid && formik.dirty)} type="submit" className="btn btn-lg btn-outline-success me-auto mt-3">verify</button>
    </form>
    </div>

    <div id="resetForm" className="container d-none">
        {error ?<div className="alert alert-danger">{error}</div> : ""}
    <h2>reset your account password</h2>
    <form onSubmit={resetForm.handleSubmit}>
        <label htmlFor="resetCode">Code</label>
        <input onChange={resetForm.handleChange} onBlur={resetForm.handleBlur} type="text" name="resetCode" id="resetCode" className="form-control" />
        {resetForm.errors.resetCode && resetForm.touched.resetCode ? <div className="alert alert-danger mt-2 p2">{resetForm.errors.resetCode}</div>:''}

        <button disabled={!(resetForm.isValid && resetForm.dirty)} type="submit" className="btn btn-lg btn-outline-success me-auto mt-3">verify</button>
    </form>
    
    </div>
    
    </>
}

