import React, { useState,useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getTableDetails,} from "../../actions/TableActions";
import MetaData from "../../more/Metadata";
import "./Productdetails.css";
import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../../more/Loader";
import axios from "axios";
import AddIcon from '@mui/icons-material/Add';
import { getProduct } from "../../actions/ProductActions";
import RemoveIcon from '@mui/icons-material/Remove';

const TableDetails = ({ match }) => {
 
  const [orderItems, setOrderItems] = useState([]);
  const [total, setTotal] = useState(0);
  const dispatch = useDispatch();
  
  const { products,  error} = useSelector(
    (state) => state.products
  );
  const { table, loading } = useSelector(
    (state) => state.tableDetails
  );

   useEffect(() => {

  dispatch(getProduct());
   }, [dispatch])


  useEffect(() => {
   
    dispatch(getTableDetails(match.params.id));
  }, [dispatch, match.params.id, error, alert]);
  

  const handleFoodChange = (event) => {
    const productId = event.target.value;
  
    const product = products.find((product) =>product._id === productId );
 

    const quantity = parseInt(event.target.dataset.quantity);
    console.log(productId)
    const existingItem = orderItems.find((item) => item.product._id === productId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      const newItem = {
        product,
        quantity,
      };
      console.log(newItem)
      setOrderItems([...orderItems, newItem]);
    }

    setTotal(total + product.price * quantity);


  };

  const handleRemoveItem = (index) => {
    const removedItem = orderItems[index];
    const newItems = orderItems.filter((item, i) => i !== index);
    setOrderItems(newItems);
    setTotal(total - removedItem.product.price * removedItem.quantity);
  };
  const handleSubmitOrder = () => {

    if (orderItems.length === 0) {
      alert("Vui lòng chọn món.");
      return;
    }

    const order = {
      table: table.number,
      items: orderItems,
      total,
    };
    axios
      .post("/api/v2/orders", order)
      .then((response) => {
        alert("Order placed successfully.");
        
        setOrderItems([]);
        setTotal(0);
      })
      .catch((error) => console.log(error));
 
  };
  const calculateTotal = (items) => {
    let total = 0;
    items.forEach((item) => {
      total += item.product.price * item.quantity;
    });
    return total;
  };
  const increate = (index, quantity) => {
    const updatedItems = [...orderItems];
          updatedItems[index].quantity += quantity;
          setOrderItems(updatedItems);
          setTotal(calculateTotal(updatedItems));
  
  };
  const decreate = (index, quantity) => {
    const updatedItems = [...orderItems];

  if (updatedItems[index].quantity > 1) {
    updatedItems[index].quantity -= 1;
    setOrderItems(updatedItems);
    setTotal(calculateTotal(updatedItems));
  };

}
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <MetaData title={`Đặt bàn ${table.number}`} />
          <div className="Table">
          <h2 >Bàn số {table.number}</h2>
          <h3>Menu</h3>
      <div className="productsWrapper">
        {products.map((product) => (
          <div className="product"  key={product._id}>
            <h7>{product.name}</h7>
            
  
           <p> Giá {`${ new Intl.NumberFormat('de-DE',{style: 'currency',currency: 
            'VND'}).format( product.price)}`}</p>
         
            <div>
              <a href=""> <img  style ={{width:"80px"}} src={product.images} alt="" /></a>
             
            </div>


            <div id="btn"> 
              <button
                onClick={handleFoodChange}
                value={product._id}
                data-quantity={1}
              >
                Đặt món
              </button>
              
            </div>
          </div>
        ))}
      </div>
            
          </div>
      <div className="order">
              <h2>Order Summary</h2>
          {orderItems.length === 0 ? (
            <p>No items in the order.</p>
          ) : (
            <ul>
              {orderItems.map((item, index) => (
                <li key={index}>
                  <h3>{item.product.name}</h3>
            
                  <p>SL: {item.quantity}</p>
                  <p>Tạm tính: {`${ new Intl.NumberFormat('de-DE',{style: 'currency',currency: 
                'VND'}).format( item.product.price * item.quantity)}`}
                  
                  </p>
                  <AddIcon onClick={() => increate(index, 1)}>
                  </AddIcon>
                    <RemoveIcon onClick={() => decreate(index, 1)}>
                    </RemoveIcon>
                  <button onClick={() => handleRemoveItem(index)}>Xóa</button>
                </li>

                
              ))}

              
            </ul>
          )}
        
          <button onClick={handleSubmitOrder}>Đặt hàng</button>
          <p>Tổng: {`${ new Intl.NumberFormat('de-DE',{style: 'currency',currency: 
                'VND'}).format(total)}`}</p>
            

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
        


         
        </>
      )}
    </>
  );
};

export default TableDetails;