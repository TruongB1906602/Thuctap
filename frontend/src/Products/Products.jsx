import React, { useEffect, useState } from "react";
import Footer from "../../Footer";
import Header from "../Home/Header";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../../more/Loader";
import ProductCard from "./ProductCard";
import { clearErrors, getProduct } from "../../actions/ProductActions";
import Pagination from "react-js-pagination";
import "./Product.css";
import MetaData from "../../more/Metadata";
import Typography from"@material-ui/core/Typography"
// import { useAlert } from "react-alert";
import BottomTab from "../../more/BottomTab";
import beef from "./beef.png"
import spices from "./spice.png"
import vegetables from "./vegetable.png"
import menu from "./menu.png"
import fruits from "./fruits.png"
const categories = [
    "Thịt",
    "Gia vị",
    "Rau",
    "Trái cây"
]
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}


const Products = ({ match }) => {
  const dispatch = useDispatch();
  const onClick = (e) => {
    console.log('click ', e);
  };
  // const [currentPage, setCurrentPage] = useState(1);
  
  const [category,setCategory] = useState("");

  const {
    products,
    loading,
    error,
    productsCount,
    resultPerPage,
  } = useSelector((state) => state.products);

  const keyword = match.params.keyword;

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };


  useEffect(() => {
      if(error){
          alert(error);
          dispatch(clearErrors())
      }
    dispatch(getProduct(keyword,category));
  }, [dispatch, keyword,category,alert,error]); 



  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
        <MetaData title="Products" />
          <Header />
          <div>
           {products.length === 0 ? 
            ""
            :
            <h2
            style={{
              textAlign: "center",
              borderBottom: "1px solid rgba(21,21,21,0.5)",
              width: "20vmax",
              fontSize: "1.4vmax",
              fontFamily: "Poppins,sans-serif",
              margin: "3vmax auto",
              color: "rgb(0, 0, 0, 0.7)",
            }}
          >
            Bán chạy hiện nay
          </h2>
           }
            <div className="sidebar__product" style={{
                display:"flex",
                flex:1,
            }}>
                <div className="sidebar__products" style={{
                  // border: "1px solid #DCDCDC",
                  margin:"1vmax",
                  flex:".177",
                 
              }}>
                  {/* <span style={{}}>Danh mục</span> */}
                  <ul className="categoryBox">
                    
                    <li style={{height:"55px",paddingLeft:"50px",paddingTop:"10px", color:" black",backgroundColor:"aliceblue", borderRadius:"7px",fontSize:"20px", border:"none"}}>
                    
                      Danh mục
                      
                     <img style={{width:"30px", margin:"5px 25px" }}src={menu} alt="" />
                    </li>
  
                      <li className="category-link" 
                          key={category}
                          onClick={() =>setCategory("Thịt")}
                          type="checkbox"
                          >
                          <img style={{width:"30px", margin:"5px 25px"}} src={beef} alt="" />  
                            Thịt 
                      </li>
                      <li onClick={() =>setCategory("Gia vị")} className="category-link">
                         <img style={{width:"30px", margin:"5px 25px"}} src={spices} alt="" /> 
                           Gia vị 
                      </li>
                      <li className="category-link" onClick={() =>setCategory("Trái cây")} 
                          >
                           <img style={{width:"30px", margin:"5px 25px"}} src={fruits} alt="" />  
                            Trái cây</li>
                      <li 
                           onClick={() =>setCategory("Rau")}
                          className="category-link">
                            
                           <img style={{width:"30px", margin:"5px 25px"}} src={vegetables} alt="" /> 
                            
                            Rau
                      </li>

                      <Typography style={{fontSize:"1.2vmax",padding:"5px"}}>Chọn nhanh</Typography>
                  <li className="category-link">
                      Giỏ hàng
                  </li>
                  <li className="category-link">
                      
                    Danh mục yêu thích
                  </li>
                  <li className="category-link">
                      Thanh toán
                  </li>
                            
                        

                  </ul>
                
              </div>

             {products.length === 0 ?
             <span style={{
               display:"block",
               padding:"30px 0",
               fontSize:"1.5rem",
               flex:".9",
               textAlign:"center"
             }}>Không có sản phẩm nào hêt!....</span>
             : 
             <div
             className="products"
             style={{
               display: "flex",
               flexWrap: "wrap",
               justifyContent: "center",
               flex:".9"
             }}
           >
             {products &&
               products.map((product) => (
                 <ProductCard key={product.id} product={product} />
               ))}
           </div>
              }
             
             </div>
            
              <div
                className="pagination__box"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "6vmax",
                }}
              >
                {/* <Pagination
                  activePage={currentPage}
                  itemsCountPerPage={resultPerPage}
                  totalItemsCount={productsCount}
                  onChange={setCurrentPageNo}
                  nextPageText="Next"
                  prevPageText="Prev"
                  firstPageText="First"
                  lastPageText="Last"
                  itemClass="page-item"
                  linkClass="page-link"
                  activeClass="pageItemActive"
                  activeLinkClass="pageLinkActive"
                /> */}
              </div>
          </div>
          <Footer />
          <BottomTab />
        
        </>
      )}
    </>
  );
};

export default Products;
