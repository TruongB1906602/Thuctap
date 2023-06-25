import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  deleteProductReducer,
  productsReducer,
  newProductReducer,
} from "./reducers/ProductReducer";
import {
  deleteTableReducer,
  tableDetailsReducer,
  tablesReducer,
  newTableReducer,
} from "./reducers/TableReducer";

import { allUsersReducer, profileReducer, userDetailsReducer, userReducer } from "./reducers/userReducer";

const reducer = combineReducers({
  products: productsReducer,
  profile: profileReducer,
  tables: tablesReducer,
  tableDetails: tableDetailsReducer,
  user: userReducer,
  deleteProduct: deleteProductReducer,
  deleteTable: deleteTableReducer,
  allUsers: allUsersReducer,
  userDetails: userDetailsReducer,
  createTable: newTableReducer,
  createProduct: newProductReducer

});


const middleWare = [thunk];

const Store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleWare))
);

export default Store;
