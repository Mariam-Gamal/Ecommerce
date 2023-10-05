import React, { useContext, useEffect} from "react";
import { Helmet } from "react-helmet";
import { CartContext } from "../../Context/CartContext";
import { ColorRing } from  'react-loader-spinner'
import { Link } from "react-router-dom";



export default function Cart() {

let {isLoading , getLoggedUserCart , removeCartItem  ,updateProduct  ,clearUserCart , cartDetails, setCartDetails , totalCartPrice  , numOfCartItems  } = useContext(CartContext);
// const [cartDetails , setCartDetails] = useState(null);
// const [totalCartPrice , setTotalCartPrice] = useState(0);
// const [numOfCartItems , setNumOfCartItems] = useState(0);

async function getCart(){
    let res = await getLoggedUserCart(); 
    }

    useEffect(()=> {
        getCart();
    
    } , [])
async function removeItem(id){
    let res = await removeCartItem(id); 
}

async function updateCount(id ,count , index){
    // cartDetails[index].count = count
   let newProducts = [...cartDetails];
   newProducts[index].count = count;
   setCartDetails(newProducts);


    let res = await updateProduct(id , count , index);

}

async function clearCart(){
    await clearUserCart();
}


    return <>
    <Helmet>
<title>Cart</title>
</Helmet>
{isLoading ? <div className=" vh-100 d-flex justify-content-center align-items-center">
    <ColorRing
  visible={true}
  height="80"
  width="80"
  ariaLabel="blocks-loading"
  wrapperStyle={{}}
  wrapperClass="blocks-wrapper"
  colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
/>
    </div> : <>
    {cartDetails.length === 0 ? <div className="container mx-auto py-5 my-5 p-3 bg-main-light">
    <h2 className="fw-bold">Cart Shop</h2>
        <h3>your cart is empty</h3>
        </div> 
        : <div className="container mx-auto py-5 my-5 p-3 bg-main-light ">
            <div className="d-flex justify-content-between mb-4">
            <h2 className="fw-bold text-main">Cart Shop</h2>
            <div>
            <Link to={'/payment'} className="text-primary btn btn-outline-primary btn-lg ng-star-inserted m-2">Online Payment</Link>
            </div>
            </div>
            <div className="d-flex justify-content-between mb-4 align-items-center">
            <h5 className="fw-bold">total price: <span className="text-main">{totalCartPrice}</span> </h5>
            <h5 className="fw-bold">total number of items: <span className="text-main">{numOfCartItems}</span> </h5>
    
            </div>
            {cartDetails.map((product , index)=> <div key={product.product.id} className="row border-bottom my-3 d-flex align-items-center">
    <div className="col-md-2">
        <img src={product.product.imageCover} alt="product" className="w-100" />
    </div>
    <div className="col-md-10">
    <div className="d-flex justify-content-between align-items-center">
        <div>
            <h5>{product.product.title.split(' ').slice(0 ,3).join(" ")}</h5>
            <h6>{product.price} EGP</h6>
            <button onClick={() => removeItem(product.product.id)} className="btn btn-sm m-0 p-0 text-danger"><i className="fa fa-trash"></i>Remove</button>
            </div>
            <div>
                <button onClick={() => updateCount(product.product.id , product.count + 1 ,index)} className="btn btn-outline-success btn-md">+</button>
                <span className="mx-2">{product.count}</span>
                <button onClick={() => updateCount(product.product.id , product.count - 1 , index)}  className="btn btn-outline-success btn-md">-</button>
    
            </div>
    </div>
    </div>
            </div> )}
            <button onClick={()=> clearCart()} className="btn btn-outline-danger btn-lg d-block mx-auto">Clear Your Cart</button>
    
           </div>}
    
    
    </>}


</>

}

