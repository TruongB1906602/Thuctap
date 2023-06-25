import React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import PostAddIcon from "@material-ui/icons/PostAdd";
import AddIcon from "@material-ui/icons/Add";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";

const Sidebar = () => {
  
  const button = () =>{
    let items = document.querySelectorAll(".Dashboard__item");
   
}

  return (
    <div className="sidebar" style={{overflow:"scroll"}}>
      <Link to="/">
        {/* <img 
        style={{width:"90px"}}
        src={logo} alt="Ecommerce" 
        /> */}
       <h5>Dashboard</h5>
      </Link>
      <Link to="/dashboard">
        <p className="Dashboard__item" onClick={button}>
          <DashboardIcon /> Bảng điều khiển
        </p>
      </Link>
          <Link to="/admin/products">
              <p className="Dashboard__item"><PostAddIcon /> Danh sách món ăn</p>
          </Link>

          <Link to="/admin/tables">
              <p className="Dashboard__item"><PostAddIcon /> Danh sách bàn</p>
          </Link>

        
          <Link to="/admin/product">
             <p><AddIcon />Tạo món mới</p>
          </Link>

          <Link to="/admin/table">
             <p><AddIcon />Tạo bàn</p>
          </Link>
          <Link to="/admin/users">
        <p>
          <PeopleIcon /> Người dùng
        </p>
      </Link>

      
    </div>
  );
};

export default Sidebar;