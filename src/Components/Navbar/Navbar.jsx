import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../Assets/images/freshcart-logo.svg"
import { UserContext } from "../../Context/UserContext";
import { CartContext } from "../../Context/CartContext";




export default function Navbar() {
  let {userToken , setUserToken} = useContext(UserContext)
 let{numOfCartItems} = useContext(CartContext)

 let navigate = useNavigate();

function logout(){
localStorage.removeItem('userToken');
setUserToken(null);
navigate('/login')
}

    return <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
  <div className="container">
    <Link className="navbar-brand" to="/">
        <img src={Logo} alt="fresh market" />
    </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">

      <ul className="navbar-nav m-auto mb-2 mb-lg-0">

        {userToken !== null? <>
         <li className="nav-item">
          <Link className="nav-link" to="/">Home</Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/cart">Cart</Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/wishlist">Wish list</Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/products">Products</Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/categories">Categories</Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/brands">Brands</Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/allorders">Orders</Link>
        </li>


        </>:' '} 
      </ul>

      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
      
       
       {userToken !== null ?
        <>
        <li className="nav-item position-relative">
          <Link className="nav-link" to="/cart">
            <i className="fa-solid fa-cart-shopping fs-3"></i>
            <div className="badge position-absolute text-white top-0 end-0 bg-main">{numOfCartItems}</div>
          </Link>
        </li>
        <li className="nav-item">
          <span onClick={()=> logout() }  className="nav-link cursor-pointer">Logout</span>
        </li>
       </> : <>
       <li className="nav-item">
          <Link className="nav-link" to="/login">Login</Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/register">Register</Link>
        </li>
       </>}
      </ul>
      
    </div>
  </div>
</nav>
    </>
}

