import { RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom';
import  { Toaster } from 'react-hot-toast';

import './App.css';
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Cart from "./Components/Cart/Cart";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import Products from "./Components/Products/Products";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import Brands from "./Components/Brands/Brands";
import Categories from "./Components/Categories/Categories";
import SubCategories from "./Components/SubCategories/SubCategories";
import WishList from "./Components/WishList/WishList";


import NotFound from "./Components/NotFound/NotFound";
import { useContext, useEffect } from 'react';
import { UserContext } from './Context/UserContext';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import { CartContextProvider } from './Context/CartContext';
import { CategoryContextProvider } from './Context/CategoryContext';
import Payment from './Components/Payment/Payment';
import Orders from './Components/Orders/Orders';
import ForgetPassword from './Components/ForgetPassword/ForgetPassword';
import ResetPassword from './Components/ResetPassword/ResetPassword';
import { WishListContextProvider } from './Context/WhishListContext';




let routers = createHashRouter([
  {path:'/' , element:<Layout/> , children:[
    {index:true , element:<ProtectedRoute> <Home/> </ProtectedRoute> },
    {path:'cart' , element:<ProtectedRoute> <Cart/></ProtectedRoute> },
    {path:'wishlist' , element:<ProtectedRoute> <WishList/></ProtectedRoute> },

    {path:'register' , element:<Register/>},
    {path:'login' , element:<Login/>},
    {path:'forgetpassword' , element:<ForgetPassword/>},
    {path:'resetpassword' , element:<ResetPassword/>},


    {path:'products' , element:<ProtectedRoute><Products/></ProtectedRoute>},
    {path:'productdetails/:id' , element:<ProtectedRoute><ProductDetails/></ProtectedRoute>},
    {path:'brands' , element:<ProtectedRoute><Brands/></ProtectedRoute>},
    {path:'categories' , element:<ProtectedRoute><Categories/></ProtectedRoute>},
    {path:'subcategories' , element:<ProtectedRoute><SubCategories/></ProtectedRoute>},
    {path:'payment' , element:<ProtectedRoute><Payment/></ProtectedRoute>},
    {path:'allorders' , element:<ProtectedRoute><Orders/></ProtectedRoute>},




    {path:'*' , element:<NotFound/>},

  ]}
])

function App() {
  let { setUserToken } = useContext(UserContext);

  useEffect(()=>{
    if(localStorage.getItem('userToken') !== null)
    {
      setUserToken(localStorage.getItem('userToken'))
    }
  } , []);


  return <>
<WishListContextProvider>
<CartContextProvider>
    <CategoryContextProvider>
    <RouterProvider router={routers}></RouterProvider>
  <Toaster/>
    </CategoryContextProvider>
    
    
  </CartContextProvider>
</WishListContextProvider>
  

      

  
  </>
  
}

export default App;
