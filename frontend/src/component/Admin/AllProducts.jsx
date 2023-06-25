import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./AllProducts.css";
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  deleteProduct,
  getAdminProduct,
} from "../../actions/ProductActions";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import MetaData from "../../more/Metadata";
import SideBar from "./Sidebar";
import Box from '@mui/material/Box';
import { ToastContainer, toast } from 'react-toastify';
import { DELETE_PRODUCT_RESET } from "../../constans/ProductConstans";


const AllProducts = ({history}) => {

const dispatch = useDispatch();

const { error, products } = useSelector((state) => state.products);

const { error: deleteError, isDeleted } = useSelector(
    (state) => state.deleteProduct
  );

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };

useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
    if (deleteError) {
        toast.error(deleteError);
        dispatch(clearErrors());
      }
  
      if (isDeleted) {
        toast.success("Product Deleted Successfully");
        history.push("/dashboard");
        dispatch({ type: DELETE_PRODUCT_RESET });
      }
    dispatch(getAdminProduct());
  }, [dispatch, alert, error, history]);



  const customRowClass = {
    root: {
      '&.highlighted': {
        backgroundColor: 'yellow',
      },
    },
  };
  const row = [];

  products &&
    products.forEach((item) => {
      row.push({
        id: item._id,
        stock: item.Stock,
        price: item.price,
        name: item.name,
        images: item.images,
      
      });
    });

const columns = [
    { field: "id", headerName: "Id sản phẩm", minWidth: 100, flex: 0.3 },
  
    {
      field: "name",
      headerName: "Tên sản phẩm",
      Width: 150,
      flex: 0.4,
      renderCell: (params) => {

        return (
         <frameElement>
         
               <img
                  style={{width:"38px", height:"35px"}}
                  src={params.row.images}
                  className="ProductImg"
                />
                <span> {params.row.name}</span>
             </frameElement>
           
        );
    },
  },
    {
      field: "stock",
      headerName: "Còn lại",
      type: "string",
      minWidth: 150,
      editable: true,
      renderCell: (params) => {
       
        return (
          <Fragment>
          <span style={{marginLeft:"15px"}}>{params.row.stock}</span>
          </Fragment>
          
        );
      },
    },

    {
      field: "price",
      headerName: "Giá",
      type: "string",
      minWidth: 150,
      editable: true,
      renderCell: (params) => {
       
        return (
          <Fragment>
          <span style={{marginLeft:"15px"}}>{params.row.price}</span>
          </Fragment>
          
        );
      },
    },

   
  

    {
      field: "actions",
      flex: 0.2,
      headerName: "Chức năng",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
       
        return (
          <Fragment>
           
            <Link to={`/edit/product/${params.getValue(params.id, "id")}`}>
            <i class="fa-regular fa-pen-to-square" style={{color: "#0c121d"}} ></i>
            </Link>

            <Button
            onClick={() =>
                deleteProductHandler(params.getValue(params.id, "id"))
              }
            >
             <i class="fa-solid fa-trash"></i>
            </Button>
           
          </Fragment>
          
        );
      },
    },
  ];


    return (
       <Fragment>
      <MetaData title={`Danh sách sản phẩm - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">Danh sách sản phẩm</h1>
      
          <DataGrid
           className="data"
            rows={row}
            columns={columns}
            pageSize={9}
            disableSelectionOnClick
        
            autoHeight
          />
         
    
        </div>
      </div>
      <ToastContainer 
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        />
    </Fragment>
    )
}

export default AllProducts
