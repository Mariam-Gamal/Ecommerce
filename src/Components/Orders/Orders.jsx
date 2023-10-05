import axios from "axios";
import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { ColorRing } from  'react-loader-spinner';
import { Helmet } from "react-helmet";



export default function Orders() {

const[userOrders , setUserOrders] = useState(null)

    useEffect(()=>{
const res =jwtDecode(localStorage.getItem('userToken'));
// console.log(res.id);
getUserOrders(res.id)

    } , [])

    async function getUserOrders(id){
        try {
         const {data}= await axios.get(`https://route-ecommerce.onrender.com/api/v1/orders/user/${id}`);
         console.log(data);
         setUserOrders(data)
            
        } catch (error) {
            
        }

    }
if(userOrders === null){
    return <div className=" vh-100 d-flex justify-content-center align-items-center">
    <ColorRing
  visible={true}
  height="80"
  width="80"
  ariaLabel="blocks-loading"
  wrapperStyle={{}}
  wrapperClass="blocks-wrapper"
  colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
/>
    </div>
}

    return <>
    <Helmet>
<title>Orders</title>
</Helmet>
    <div className="container">
        <div className="row g-4">
{userOrders.map((order , idx)=>{
  return <div key={idx} className="col-md-6">
<div className="order rounded-4 p-3">
    <div className="container">
        <div className="row">
        {order.cartItems?.map((item , index)=>{
        return <div key={index} className="col-sm-3">
            <div  className="bg-light rounded-4">
            <img className="w-100 rounded-4" src={item.product.imageCover} alt={item.product.title} />
            <h6 className="fw-bold">{item.product.title.split(' ').slice(0 ,2).join(" ")}</h6>
            <p>Count : {item.count}</p>
            <p>Price : {item.price}</p>


        </div>
        </div>

    })}
        </div>
    </div>
    
    <h5 className="fw-bold">Payment Method : <span className="text-main">{order.paymentMethodType}</span> </h5>
    <h5 className="fw-bold">Total Price : <span className="text-main">{order.totalOrderPrice}</span>  </h5>
    


</div>

    </div>
})}
        </div>
    </div>
    </>
}

