import React,  { useState, useEffect } from 'react'
import "../Products/TableCard.css"
import TableCard from "../Products/TableCard";
import  {useDispatch, useSelector} from "react-redux"
import { toast } from 'react-toastify';

import { clearErrors, getTable } from "../../actions/TableActions";

const Table = () => {

  const dispatch = useDispatch();
  const { tables,error,loading } = useSelector(
    (state) => state.tables
  );
  
  useEffect(() => {
    if(error){ 
      toast.error(error);
      dispatch(clearErrors());
 }
  dispatch(getTable());
   }, [dispatch,error])

  return (
    <>
    <h1 className='heading' >Đặt bàn</h1>
       <div className="tablesWrapper">
    
        {tables && tables
      
        .map((table) =>(
          <TableCard className="card" key={table._id} table={table} />
        ))}
      </div>


  
  </>
  );
};

export default Table;