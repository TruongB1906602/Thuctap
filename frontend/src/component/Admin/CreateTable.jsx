import React, { Fragment, useEffect, useState } from "react";
import "./newProduct.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createTable } from "../../actions/TableActions";
import { Button } from "@material-ui/core";
import MetaData from "../../more/Metadata";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import SideBar from "./Sidebar";
import { NEW_TABLE_RESET } from "../../constans/TableContants";

import { ToastContainer, toast } from 'react-toastify';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
const CreateTable = ({ history }) => {
  const dispatch = useDispatch();

  const { loading, error, success } = useSelector((state) => state.createTable);

  const [number, setNumer] = useState("");
  const [status, setStatus] = useState("");
 

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      toast.success("Ban Created Successfully");
      history.push("/dashboard");
      dispatch({ type: NEW_TABLE_RESET });
    }
  }, [dispatch, alert, error, history, success]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("number", number);
    myForm.set("status", status);
  
    dispatch(createTable(myForm));
  };

 

  return (
    <Fragment>
      <MetaData title="Create Product" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={createProductSubmitHandler}
          >
            <h1>Thêm bàn mới</h1>

            <div>
              <DriveFileRenameOutlineIcon/>
              <input
                type="text"
                placeholder="Tên bàn"
                required
                value={number}
                onChange={(e) => setNumer(e.target.value)}
              />
            </div>
           
          <div>
    
              <div >
                  <AttachMoneyIcon />
                  <input
                
                    type="text"
                    placeholder="Trạng thái"
                    required
                    onChange={(e) => setStatus(e.target.value)}
                  />
                </div>

        

            </div>
           
            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Tạo mới
            </Button>
          </form>
        </div>
      </div>
      <ToastContainer 
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        />
    </Fragment>
  );
};

export default CreateTable;