import React 
from "react";
import { Link } from "react-router-dom";
import "./TableCard.css"
import Chart from "../../assets/chair.png";

const TableCard = ({ table }) => {
  
  return (
    <>
      <Link className="cardsWrapper" to={`/table/${table._id}`}>
            <div className="card">
             <h5 >   Bàn số {table.number}</h5>
            <img src={Chart} style={{width:"90px"}} alt="" />
            <span> {table.status}</span>
            </div>
        


      </Link>
    </>
  );
};

export default TableCard;
