import React, { useEffect } from "react";
import "./Home.css";
import Card from "../Products/ProductCard";
import  {useDispatch, useSelector} from "react-redux"
import { clearErrors, getProduct } from "../../actions/ProductActions";
import "../menu/Menu.css"
import MetaData from "../../more/Metadata";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  const dispatch = useDispatch();
  const { products,error,loading } = useSelector(
    (state) => state.products
  );

   useEffect(() => {
    if(error){ 
      toast.error(error);
      dispatch(clearErrors());
 }
  dispatch(getProduct());
   }, [dispatch,error])
   
  return (
    <>
   
      <>
      <MetaData title="Menu" />
  
      <h2>Menu</h2>
      <div className="productsWrapper">
        {products.map((product) => (
          <div className="product" key={product._id}>
            <h3>{product.name}</h3>
  
           <p> Giá {`${ new Intl.NumberFormat('de-DE',{style: 'currency',currency: 
            'VND'}).format( product.price)}`}</p>
         
            <div>
              <a href=""> <img src={product.images} alt="" /></a>
             
            </div>
          </div>
        ))}
      </div>

      <ToastContainer 
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        />


      </>    
  
    </>
  );
};

export default Home;
