import axios from "axios";
import { createContext, useState } from "react";
import { useQuery } from "react-query";



export let CategoryContext =  createContext();

export function CategoryContextProvider(props){

    function getAllCategories(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    }
    
    let {isLoading , data} = useQuery('allCategories' , getAllCategories);


    const [subCategories , setSubCategories] = useState(null);


    async function getSubcategories(id){
        const {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`);
        setSubCategories(data)
        return console.log(data);
    }

    return <CategoryContext.Provider value={{subCategories , getSubcategories , isLoading , data}}>
        {props.children}

    </CategoryContext.Provider>

}