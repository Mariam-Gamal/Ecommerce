import axios from "axios";
import { createContext, useEffect, useState } from "react";


export let WishListContext = createContext();

export function WishListContextProvider(props){
    let userToken = localStorage.getItem('userToken');
    let header = {token:userToken};

async function addToWish(id){
try {

    let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist` ,  {productId: id} , {headers: header})

    return data;
} catch (error) {
    console.log(error);
    
}
}



function getWishList(){
    try {

        return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist` , {headers: header})


    } catch (error) {
        console.log(error);
        
    }
    }

     function removeWishItem(id){
    
        try {   
    
             return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}` , {headers : header});
            
        } catch (error) {
            console.log('error' , error);
        } 
    }

    




    return <WishListContext.Provider value={{
        addToWish,
        getWishList,
        removeWishItem
        
        
        

    }}>
                {props.children}
    </WishListContext.Provider>
}