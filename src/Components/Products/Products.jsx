import React, { useContext, useState } from "react";
import axios from "axios";
import { ColorRing } from  'react-loader-spinner'
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { Bars } from  'react-loader-spinner';
import { WishListContext } from "../../Context/WhishListContext";



export default function Products() {

    let {addToCart} = useContext(CartContext);
    let {addToWish} = useContext(WishListContext);


    const[Loader , setLoader] = useState(false)

    async function addProductToCart(id){
        setLoader(true)
        let data = await addToCart(id);

 if(data.status === 'success'){
 toast.custom(<div className="bg-main p-3 position-fixed top-0 end-0 text-white rounded-2"><i className="fa-solid fa-cart-arrow-down fa-1x"></i> {data.message} </div>);
 }else{
 toast.error('error')
 }
 setLoader(false)
     }
     async function addProductToWish(id){
        let data = await addToWish(id);
        console.log(data);
        if(data.status === 'success'){
           let hearts= document.querySelectorAll('#heart')
            for (let i = 0; i < hearts.length; i++) {
            hearts[i].addEventListener('click' , (e)=> console.log(e.target.classList.add('red'))
            )
            }
            toast.custom(<div className="bg-main p-3 position-fixed top-0 end-0 text-white rounded-2"> ✔️ {data.message}❤️ </div>);
        }

     }

function getAllProducts(){
  return axios.get('https://ecommerce.routemisr.com/api/v1/products');
    }

    let {isLoading , data , isError , isFetching } = useQuery('allProducts' , getAllProducts)
// console.log('isLoading' , isLoading);
// console.log('isFetching' , isFetching);
// const [allProducts , setAllProducts]= useState(null);
// setAllProducts(data.data.Products);
// console.log(allProducts);


const [searchTerm , setSearchTerm]= useState(null);

function search(term){

    const product = data?.data.data.map((product)=> {
        return product;
    })

   let searchPro = product.filter((pro)=> {
    return pro.title.toLowerCase().includes(term.toLowerCase())
            //     if(pro.title.toLowerCase().includes(term.toLowerCase()) === true){
            //     console.log(pro);                
            // }

        })
        console.log(searchPro);
        // console.log(box);
        // console.log(JSON.stringify(box));
            setSearchTerm(searchPro);

}

  
    return <>
    <Helmet>
<title>Products</title>
</Helmet>

    { isLoading?  <div className=" vh-100 d-flex justify-content-center align-items-center">
    <ColorRing
  visible={true}
  height="80"
  width="80"
  ariaLabel="blocks-loading"
  wrapperStyle={{}}
  wrapperClass="blocks-wrapper"
  colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
/>
    </div> :<div className="py-3">
        <input onInput={(e)=> search(e.target.value)} type="text" placeholder="search..." className="w-75 mx-auto form-control my-5 ng-valid ng-touched ng-dirty" />
    <div className="row gy-4">
        {searchTerm? searchTerm.map((pro)=>{
            return  <div key={ pro.id } className="col-md-3">


            <div className="product px-2 py-4 rounded"> 
            <Link to={`/productdetails/${pro.id }`}>

                <img src={ pro.imageCover } alt="product" className="w-100" />
                <p className="text-main">{ pro.category.name }</p>
                <h6>{pro.title.split(' ').slice(0 ,2).join(" ")}</h6>
                <div className="d-flex justify-content-between align-items-center ">
                <p>{pro.price} EGP</p>
                <p> <i className="fa fa-star gold rating-color"></i> {pro.ratingsAverage} </p>
                </div>
                
                </Link>
                <div className="d-flex justify-content-between align-items-center ">
                <button onClick={()=>addProductToCart(pro.id)} className="btn bg-main text-white w-75 mt-4">{Loader? <div className="d-flex justify-content-center"><Bars 
                    height="40"
                    width="80"
                    color="#fff"
                    ariaLabel="bars-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                    /> </div> :  "+ Add"}</button>
                    <i  id="heart" onClick={()=> addProductToWish(pro.id)} className="fa-solid fa-heart h3"></i>
                </div>
            </div>
        </div>
        }) 
            : data?.data.data.map((product)=> {
                return <div key={ product.id } className="col-md-3">
    
    
                <div className="product px-2 py-4 rounded"> 
                <Link to={`/productdetails/${product.id }`}>
    
                    <img src={ product.imageCover } alt="product" className="w-100" />
                    <p className="text-main">{ product.category.name }</p>
                    <h6>{product.title.split(' ').slice(0 ,2).join(" ")}</h6>
                    <div className="d-flex justify-content-between align-items-center ">
                    <p>{product.price} EGP</p>
                    <p> <i className="fa fa-star gold rating-color"></i> {product.ratingsAverage} </p>
                    </div>
                    
                    </Link>
                    <div className="d-flex justify-content-between align-items-center ">
                    <button onClick={()=>addProductToCart(product.id)} className="btn bg-main text-white w-75 mt-4">{Loader? <div className="d-flex justify-content-center"><Bars 
                        height="40"
                        width="80"
                        color="#fff"
                        ariaLabel="bars-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                        /> </div> :  "+ Add"}</button>
                    <i  id="heart" onClick={()=> addProductToWish(product.id)} className="fa-solid fa-heart h3"></i>
                    </div>
                </div>
            </div>
                } 
                )}
        

        


    </div>
</div> 
}
    

    </>
}