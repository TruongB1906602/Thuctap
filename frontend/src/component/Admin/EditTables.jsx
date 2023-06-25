import React, { Fragment, useEffect, useState } from "react";
import "./newProduct.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, updateTable, getTableDetails } from "../../actions/TableActions";
import { Button } from "@material-ui/core";
import MetaData from "../../more/Metadata";
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
    // eslint-disable-next-line
import SideBar from "./Sidebar";
import { UPDATE_TABLE_RESET } from "../../constans/TableContants";
import { ToastContainer, toast } from 'react-toastify';

const UpdateTable = ({ history, match }) => {

  const dispatch = useDispatch();

  const { error, table } = useSelector((state) => state.tableDetails);

  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.deleteTable);

  const [number, setNumber] = useState("");
  const [status, setStatus] = useState("");
 


  const tableId = match.params.id;

  useEffect(() => {
    if (table && table._id !== tableId) {
      dispatch(getTableDetails(tableId));
    } else {
      setNumber(table.number);
      setStatus(table.status);
    }
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      toast.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      toast.success("Cập nhật thành công");
      history.push("/admin/tables");
      dispatch({ type: UPDATE_TABLE_RESET });
    }
  }, [
    dispatch,
    alert,
    error,
    history,
    isUpdated,
    tableId,
    table,
    updateError,
  ]);


  const updateTableSubmitHandler  = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("number", number);
    myForm.set("status", status);
   
    dispatch(updateTable(tableId, myForm));
  };


  return (
    <Fragment>
      <MetaData title="Edit Product" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={updateTableSubmitHandler}
          >
            <h1>Cập nhật bàn</h1>

            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Tên sản phẩm"
                required
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
            </div>

            <div>
              <TableRestaurantIcon />
              <input
                type="text"
                placeholder="Trạng thái"
                required
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              />
            </div>
           
            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Cập nhật
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

export default UpdateTable;