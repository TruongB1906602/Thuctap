import React, { useEffect,useState } from "react";
import "./orderDetails.css";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../../more/Metadata";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { getOrderDetails, clearErrors } from "../../actions/OrderAction";


import Loading from "../../more/Loader";
import BottomTab from "../../more/BottomTab";
// import { PayPalButton } from "react-paypal-button-v2";

const MyOrderDetails = ({ match }) => {
  const { order, error, loading } = useSelector((state) => state.myOrderDetails);
  const [state, setState] = useState(0);
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getOrderDetails(match.params.id));
  }, [dispatch, alert, error, match.params.id]);
     
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <MetaData title="Order Details" />
          <div className="orderDetailsPage">
            <div className="orderDetailsContainer">
              <Typography component="h1">
                Mã đơn hàng #{order && order._id}
              </Typography>
              <Typography>Thông tin giao hàng</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p>Tên người nhận:</p>
                  <span>{order.user && order.user.name}</span>
                </div>
                <div>
                  <p>Số điện thoại:</p>
                  <span>
                    {order.shippingInfo && order.shippingInfo.phoneNo}
                  </span>
                </div>
                <div>
                  <p>Địa chỉ:</p>
                  <span>
                    {order.shippingInfo &&
                      `${order.shippingInfo.address}`}
                  </span>
                </div>

                <div>
    
    </div>
              </div>
              <Typography>Thanh toán</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      order.orderStatus === "Delivered"
                        ? "greenColor"
                        : "redColor"
                    }
                  >                  
                  </p>
                  <p style={{
                      color:"green"
                  }}>
                  Chưa thanh toán
                  </p>
                </div>

                <div>
                  <p>Tổng tiền:</p>
                  <span>  {`${
                    new Intl.NumberFormat('de-DE',{style: 'currency',currency: 'VND'}).format(order.totalPrice)
                  }`} </span>
                </div>
              </div>

              <Typography>Trang thái đơn hàng</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      order.orderStatus && order.orderStatus === "Delivered"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {order.orderStatus && order.orderStatus}
                  </p>
                </div>
              </div>
            </div>

            <div className="orderDetailsCartItems">
              <Typography>Mục đơn hàng:</Typography>
              <div className="orderDetailsCartItemsContainer">

                {order.orderItems &&
                  order.orderItems.map((item) => (
                    <div key={item.Offer}>
                      <img src={item.image} alt="Product" />
                      <Link to={`/product/${item.Offer}`}>
                        {item.name}
                      </Link>{" "}
                      <span>
                        {item.quantity} x {`${
                    new Intl.NumberFormat('de-DE',{style: 'currency',currency: 'VND'}).format(item.price)
                  }`} ={" "}
                        <b>{`${
                            new Intl.NumberFormat('de-DE',{style: 'currency',currency: 
                           'VND'}).format(item.price*item.quantity)
                  }`}</b>
                      </span>
                    </div>
                  ))}

              </div>
            </div>
          </div>
      
          <div>
    
    </div>
        </>
      )}

      <BottomTab />

      
    </>
  );
};

export default MyOrderDetails;