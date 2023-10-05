import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let CartContext = createContext();



export function CartContextProvider(props){

    const [cartDetails , setCartDetails] = useState([]);
    const [totalCartPrice , setTotalCartPrice] = useState(0);
    const [numOfCartItems , setNumOfCartItems] = useState(0);






    let userToken = localStorage.getItem('userToken');
let header = {token:userToken}


async function addToCart(id){
try {
    const {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/cart` , {productId: id} , {headers: header});
    getLoggedUserCart();
    // setCartDetails(data.data.products);
    // setTotalCartPrice(data.data.totalCartPrice);
    // setNumOfCartItems(data.numOfCartItems);

    return data;
} catch (error) {
    console.log('error' , error);

}

}


const[isLoading , setIsLoading] =useState(false)

async function getLoggedUserCart(){
try {
    setIsLoading(true)
    const {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/cart` , {headers : header})
    setCartDetails(data.data.products);
    setTotalCartPrice(data.data.totalCartPrice);
    setNumOfCartItems(data.numOfCartItems);

    setIsLoading(false)

    return data;
} catch (error) {
    console.log('error' , error);

}

}



   async function removeCartItem(id){
    
        try {   
            setIsLoading(true)
    
              const {data} = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}` , {headers : header});

            setCartDetails(data.data.products);
           setTotalCartPrice(data.data.totalCartPrice);
           setNumOfCartItems(data.numOfCartItems);
            
           setIsLoading(false)

           return data ;
        } catch (error) {
            console.log('error' , error);
        } 
    }
    
    

  async function updateProduct(id , count){
try {
    const {data} = await  axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}` , {count} , {headers: header})
    setCartDetails(data.data.products);
    setTotalCartPrice(data.data.totalCartPrice);
    setNumOfCartItems(data.numOfCartItems);
    return data;
} catch (error) {
    console.log('error' , error);

}
        }
    
        

   async function clearUserCart(){
        try {
            setIsLoading(true)
        const res = await  axios.delete(`https://ecommerce.routemisr.com/api/v1/cart` , {headers : header});
        console.log(res);
        setCartDetails( [] );
        setTotalCartPrice(0);
        setNumOfCartItems(0);

        setIsLoading(false)

        
        } catch (error) {
            console.log('error' , error);
        }

    }
    const [cartId , setCartId] = useState(null);

    async function getCart(){
        let res = await getLoggedUserCart(); 
        // console.log(res?.data._id);
        setCartId(res?.data._id);
        console.log(cartId);
        }
    
        useEffect(()=> {
            getCart();
        
        } , [])

        async function onlinePayment(cartId , url , values ){
            try {
                const {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}` ,
                 {
                    shippingAddress: values
                 } , {headers: header});
               
            return data;
            } catch (error) {
                console.log('error' , error);
            
            }
            
            }
    


   return <CartContext.Provider value={{
    isLoading,
    addToCart , 
   getLoggedUserCart ,
   removeCartItem ,
    updateProduct ,
    clearUserCart ,
    clearUserCart ,
    cartDetails  , 
    setCartDetails ,
    totalCartPrice , 
    setTotalCartPrice , 
    numOfCartItems ,
    setNumOfCartItems ,
    onlinePayment,
    cartId
    }}>
        {props.children}
    </CartContext.Provider>

}
