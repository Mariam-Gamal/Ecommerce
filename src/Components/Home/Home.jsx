import React, { useContext } from "react";
import Products from "../Products/Products";
import CategorySlider from "../CategorySlider/CategorySlider";
import MainSlider from "../MainSlider/MainSlider";
import { Helmet } from "react-helmet";


export default function Home() {
    return <>

    <MainSlider/>
    <CategorySlider/>
   <Products/>
   <Helmet>
<title>Home</title>
</Helmet>
    </>
}

