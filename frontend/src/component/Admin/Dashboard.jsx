import React, { useEffect } from "react";
import Sidebar from "./Sidebar.js";
import "./dashboard.css";
import { Typography } from "@material-ui/core";
import {Link} from "react-router-dom";
    // eslint-disable-next-line

import { useSelector, useDispatch } from "react-redux";
import MetaData from "../../more/Metadata.js";
import Loading from "../../more/Loader.js";
import { getAdminProduct } from "../../actions/ProductActions.js";
import { getAllUsers } from "../../actions/userAction.js";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { products,loading } = useSelector((state) => state.products);
 
  const { users } = useSelector((state) => state.allUsers);
   let outOfStock = 0;
  
   products &&
    products.forEach((item) => {
      if (item.Stock === 0) {
        outOfStock += 1;
      }
    });

    useEffect(() => {
        dispatch(getAdminProduct());
        
        dispatch(getAllUsers());
        
      }, [dispatch]);    

   

    return (
       <>
       {loading ?
       <Loading />
       :(
        <div className="dashboard">
        <MetaData title="Dashboard" />
        <Sidebar />
  
        <div className="dashboardContainer">
          <Typography component="h1">Bảng điều khiển</Typography>
  
          <div className="dashboardSummary">
           
            <div className="dashboardSummaryBox2">
              <Link to="/admin/products">
                <p>Sản phẩm</p>
                <p>{products && products.length}</p>
              </Link>
             
              <Link to="/admin/users">
                <p>Người dùng</p>
                <p>{users && users.length}</p>
              </Link>
            </div>
          </div>
  
        </div>
      </div>
       )
       }
       </>
    );
  };
export default Dashboard
