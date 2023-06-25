import React, { Fragment, useEffect, useState } from "react";
import "./newProduct.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createProduct } from "../../actions/ProductActions";
import { Button } from "@material-ui/core";
import MetaData from "../../more/Metadata";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import DiscountIcon from "@material-ui/icons/LocalOffer";
import SideBar from "./Sidebar";
import { NEW_PRODUCT_RESET } from "../../constans/ProductConstans";
import { ToastContainer, toast } from 'react-toastify';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
const CreateProduct = ({ history }) => {
  const dispatch = useDispatch();

  const { loading, error, success } = useSelector((state) => state.createProduct);

  const [name, setName] = useState("");
  const [price, setPrice] = useState();
  const [Stock, setStock] = useState("");
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      toast.success("Product Created Successfully");
      history.push("/dashboard");
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, alert, error, history, success]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("Stock", Stock);
    myForm.set("images", images);

    dispatch(createProduct(myForm));
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
            <h1>Thêm sản phẩm mới</h1>

            <div>
              <DriveFileRenameOutlineIcon/>
              <input
                type="text"
                placeholder="Tên sản phẩm"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
           
          <div>
    
              <div >
                  <AttachMoneyIcon />
                  <input
                
                    type="number"
                    placeholder="Giá"
                    required
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>

        
      
              <div style={{marginLeft:"30px"}}>
              <Inventory2Icon/>
                <input
                  type="number"
                  placeholder="Còn lại"
                  value={Stock}
                  required
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>

        
            </div>
            <div>
              <ImageSearchIcon/>
           
           <input
             type="text"
             placeholder="Hình ảnh"
             value={images}
             required
             onChange={(e) => setImages(e.target.value)}
           />
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

export default CreateProduct;