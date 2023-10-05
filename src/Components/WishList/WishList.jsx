import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { WishListContext } from "../../Context/WhishListContext";
import { ColorRing } from  'react-loader-spinner';
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { Bars } from  'react-loader-spinner';
import Slider from "react-slick";



export default function WishList() {

   let{ getWishList , removeWishItem} = useContext(WishListContext);
  const [items , setItems] = useState( [] );
  const[isLoading , setIsLoading] =useState(false);


  async function getWish(){
    setIsLoading(true);
let {data} = await getWishList();
setItems(data.data);
setIsLoading(false)
console.log(items);
console.log(data);

}
   
   useEffect(()=> {
    getWish();
} , [])

let {addToCart} = useContext(CartContext);


async function addProductToCart(id){
    setIsLoading(true);
    let data = await addToCart(id);
if(data.status === 'success'){
toast.custom(<div className="bg-main p-3 position-fixed top-0 end-0 text-white rounded-2"><i className="fa-solid fa-cart-arrow-down fa-1x"></i> {data.message} </div>);
}else{
toast.error('error')
}
setIsLoading(false)
 }

 async function remove(id){
    setIsLoading(true)

    let {data} = await removeWishItem(id); 
    setItems(data.data.products);
    setIsLoading(false)

    console.log(items);


}

    return <>
    <Helmet>
<title>WishList</title>
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
    </div> : <> {items.length === 0 ? <div className="container py-5 my-5 p-5 bg-light rounded">
    <div className="d-flex justify-content-between mb-4">
        <h2 className="fw-bolder"> My wish List</h2>
        </div>
    </div> : <div className="container py-5 my-5 p-5 bg-light rounded ">
    <div className="d-flex justify-content-between mb-4">
        <h2 className="fw-bolder"> My wish List</h2>
        </div>
        {items.map((item , idx)=> {
            return <div key={idx} className="row border-bottom my-3 d-flex align-items-center p-2">
                <div className="col-md-2">
                    <img src={item.imageCover} className="w-100" alt="" />
                </div>
                <div className="col-md-10 d-flex justify-content-between">
                <div>
            <h5 className="fw-bold">{item.title}</h5>
            <h6 className="fw-bold text-main">{item.price} EGP</h6>
            <button onClick={()=> remove(item.id)}  className="btn btn-sm m-0 p-0 text-danger"><i className="fa fa-trash"></i>Remove</button>
            </div>
            <div>
                <button onClick={()=> addProductToCart(item.id)} className="btn btn-count btn-lg">Add To Cart</button>
            </div>

                </div>

            </div>
        })}
        

        
    </div>}
    </> }


      
    </>
}

