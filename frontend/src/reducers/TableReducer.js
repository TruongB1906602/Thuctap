import {
    ALL_TABLE_FAIL,
    ALL_TABLE_REQUEST,
    ALL_TABLE_SUCCESS,
    CLEAR_ERRORS,
    TABLE_DETAILS_FAIL,
    TABLE_DETAILS_REQUEST,
    TABLE_DETAILS_SUCCESS,
    ADMIN_TABLE_REQUEST,
    ADMIN_TABLE_SUCCESS,
    ADMIN_TABLE_FAIL,
    NEW_TABLE_REQUEST,
    NEW_TABLE_SUCCESS,
    NEW_TABLE_FAIL,
    NEW_TABLE_RESET,
    DELETE_TABLE_REQUEST,
    UPDATE_TABLE_REQUEST,
    DELETE_TABLE_SUCCESS,
    UPDATE_TABLE_SUCCESS,
    DELETE_TABLE_FAIL,
    UPDATE_TABLE_FAIL,
    DELETE_TABLE_RESET,
    UPDATE_TABLE_RESET,
  
  } from "../constans/TableContants";
  
  export const tablesReducer = (state = { tables: [] }, action) => {
    switch (action.type) {
      case ALL_TABLE_REQUEST:
      case ADMIN_TABLE_REQUEST:
        return {
          loading: true,
          tables: [],
        };
      case ALL_TABLE_SUCCESS:
        return {
          loading: false,
          tables: action.payload.tables,
          tablesCount: action.payload.tablesCount,
          resultPerPage: action.payload.resultPerPage,
          filteredTablesCount: action.payload.filteredTablesCount,
        };
  
      case ADMIN_TABLE_SUCCESS:
        return {
          loading: false,
          tables: action.payload,
        };
  
      case ALL_TABLE_FAIL:
      case ADMIN_TABLE_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };
  
  export const tableDetailsReducer = (state = { table: {} }, action) => {
    switch (action.type) {
      case TABLE_DETAILS_REQUEST:
        return {
          loading: true,
          ...state,
        };
      case TABLE_DETAILS_SUCCESS:
        return {
          loading: false,
          table: action.payload,
        };
      case TABLE_DETAILS_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };
  
  // New Product ----Admin
  export const newTableReducer = (state = { table: {} }, action) => {
    switch (action.type) {
      case NEW_TABLE_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case NEW_TABLE_SUCCESS:
        return {
          loading: false,
          success: action.payload.success,
          table: action.payload.table,
        };
      case NEW_TABLE_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case NEW_TABLE_RESET:
        return {
          ...state,
          success: false,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };
  
  // Delete Product
  export const deleteTableReducer = (state = {}, action) => {
    switch (action.type) {
      case DELETE_TABLE_REQUEST:
      case UPDATE_TABLE_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case DELETE_TABLE_SUCCESS:
        return {
          ...state,
          loading: false,
          isDeleted: action.payload,
        };
  
      case UPDATE_TABLE_SUCCESS:
        return {
          ...state,
          loading: false,
          isUpdated: action.payload,
        };
      case DELETE_TABLE_FAIL:
      case UPDATE_TABLE_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case DELETE_TABLE_RESET:
        return {
          ...state,
          isDeleted: false,
        };
      case UPDATE_TABLE_RESET:
        return {
          ...state,
          isUpdated: false,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };
  