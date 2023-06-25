import axios from "axios";
import {
 

    ADMIN_TABLE_FAIL,
    ADMIN_TABLE_REQUEST,
    ADMIN_TABLE_SUCCESS,
    ALL_TABLE_FAIL,
    ALL_TABLE_REQUEST,
    ALL_TABLE_SUCCESS,
    CLEAR_ERRORS,
    DELETE_TABLE_FAIL,
    DELETE_TABLE_REQUEST,
    DELETE_TABLE_SUCCESS,
    DELETE_TABLE_RESET,
  
    NEW_TABLE_FAIL,
    NEW_TABLE_REQUEST,
    NEW_TABLE_SUCCESS,
 
    TABLE_DETAILS_FAIL,
    TABLE_DETAILS_REQUEST,
    TABLE_DETAILS_SUCCESS,
    UPDATE_TABLE_FAIL,
    UPDATE_TABLE_REQUEST,
    UPDATE_TABLE_SUCCESS,
 
} from "../constans/TableContants";


export const getTable= () => async (dispatch)=>{
  try {
      dispatch({
          type: ALL_TABLE_REQUEST
      });

     let link = `/api/v2/tables`;
      
    
      const {data} = await axios.get(link);

      dispatch({
          type:ALL_TABLE_SUCCESS,
          payload: data,
      })
  } catch (error) {
      dispatch({
          type:ALL_TABLE_FAIL,
          payload: error.response.data.message,
      })
  }
}; 


// Get All tables Details
export const getTableDetails= (id) => async (dispatch)=>{
  try {
      dispatch({ type: TABLE_DETAILS_REQUEST });
  
      const { data } = await axios.get(`/api/v2/table/${id}`);
  
      dispatch({
        type:TABLE_DETAILS_SUCCESS,
        payload: data.table,
      });
    } catch (error) {
      dispatch({
        type: TABLE_DETAILS_FAIL,
        payload: error.response.message,
      });
    }
  };

// Create Product --------Admin
export const createTable = (tableData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_TABLE_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(
      `/api/v2/table/new`,
      tableData,
      config
    );

    dispatch({
      type: NEW_TABLE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_TABLE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get Admin tables -----Admin
  export const getAdminTable = () => async (dispatch) => {
    try {
      dispatch({ type: ADMIN_TABLE_REQUEST });
  
      const { data } = await axios.get("/api/v2/admin/tables");
  
      dispatch({
        type: ADMIN_TABLE_SUCCESS,
        payload: data.tables,
      });
    } catch (error) {
      dispatch({
        type: ADMIN_TABLE_FAIL,
        payload: error.response.data.message,
      });
    }
  };

  // Delete Product ------Admin
export const deleteTable = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_TABLE_REQUEST });

    const { data } = await axios.delete(`/api/v2/table/${id}`);

    dispatch({
      type: DELETE_TABLE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_TABLE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update Product
export const updateTable = (id, tableData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_TABLE_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(
      `/api/v2/table/${id}`,
      tableData,
      config
    );

    dispatch({
      type: UPDATE_TABLE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_TABLE_FAIL,
      payload: error.response.data.message,
    });
  }
};


//   Clearing errors
export const clearErrors= () => async (dispatch)=>{
  dispatch({
      type: CLEAR_ERRORS
  })
}