import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./AllProducts.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  deleteTable,
  getAdminTable,
} from "../../actions/TableActions";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import MetaData from "../../more/Metadata";
import SideBar from "./Sidebar";
import Box from '@mui/material/Box';
import { ToastContainer, toast } from 'react-toastify';
import { DELETE_TABLE_RESET } from "../../constans/TableContants";


const AllTables = ({history}) => {

const dispatch = useDispatch();

const { error, tables } = useSelector((state) => state.tables);

const { error: deleteError, isDeleted } = useSelector(
    (state) => state.deleteTable
  );

  const deleteProductHandler = (id) => {
    dispatch(deleteTable(id));
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
        toast.success("Table Deleted Successfully");
        history.push("/dashboard");
        dispatch({ type: DELETE_TABLE_RESET });
      }
    dispatch(getAdminTable());
  }, [dispatch, alert, error, history]);



  const customRowClass = {
    root: {
      '&.highlighted': {
        backgroundColor: 'yellow',
      },
    },
  };
  const row = [];

  tables &&
    tables.forEach((item) => {
      row.push({
        id: item._id,
        number:item.number, 
        status: item.status,
      
      });
    });

const columns = [
    { field: "id", headerName: "Mã bàn", minWidth: 100, flex: 0.3 },
  
    {
      field: "number",
      headerName: "Số bàn",
      Width: 150,
      flex: 0.4,
      renderCell: (params) => {

    },
  },
    {
      field: "status",
      headerName: "Trạng thái",
      type: "string",
      minWidth: 150,
      editable: true,
      renderCell: (params) => {
       
        return (
          <Fragment>
          <span style={{marginLeft:"15px"}}>{params.row.status}</span>
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
           
            <Link to={`/edit/table/${params.getValue(params.id, "id")}`}>
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
          <h1 id="productListHeading">Danh sách bàn</h1>
      
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

export default AllTables
