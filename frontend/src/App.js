import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import LoginSignup from "./component/Authentication/LoginSignup";
import { useSelector } from 'react-redux';
import AllUsers from "../../frontend/src/component/Admin/AllUsers";
import UserData from './more/UserData';
import Store from "./store";
import Menu from "./component/menu/Menu"
import Table from "./component/menu/Table"
import TableDetails from './component/Products/TableDetails';
import ProtectedRoute from './route/ProtectedRoute';
import Dashboard from './component/Admin/Dashboard';
import CreateProduct from './component/Admin/CreateProduct';
import CreateTable from './component/Admin/CreateTable';
import AllProducts from "../../frontend/src/component/Admin/AllProducts";
import AllTables from "../../frontend/src/component/Admin/AllTables";
import EditProduct from "../../frontend/src/component/Admin/EditProduct";
import EditTable from "../../frontend/src/component/Admin/EditTables";
import  "./App.css";
import { loadUser } from './actions/userAction';
import UpdateUser from "../../frontend/src/component/Admin/UpdateUser";
function App() {
  
  const {isAuthenticated,user} = useSelector((state) =>state.user);  
  useEffect(() => {
 
    Store.dispatch(loadUser());
    
  }, []);

  return (
    <>
      <Router>
      {isAuthenticated && <UserData user={user} />}
          <Switch>
       
          <Route exact path="/login" component={LoginSignup} />
          <Route exact path="/menu" component={Menu} />
          <Route exact path="/" component={Table} />
          <Route exact path="/table/:id" component={TableDetails} />
         <ProtectedRoute isAdmin={true} exact path="/dashboard" component={Dashboard} />
         <ProtectedRoute isAdmin={true} exact path="/admin/product" component={CreateProduct} />
         <ProtectedRoute isAdmin={true} exact path="/admin/table" component={CreateTable} />
         <ProtectedRoute isAdmin={true} exact path="/admin/products" component={AllProducts} />
         <ProtectedRoute isAdmin={true} exact path="/admin/tables" component={AllTables} />
         <ProtectedRoute isAdmin={true} exact path="/edit/product/:id" component={EditProduct} />
         <ProtectedRoute isAdmin={true} exact path="/edit/table/:id" component={EditTable} />
         <ProtectedRoute isAdmin={true} exact path="/admin/users" component={AllUsers} />
         <ProtectedRoute isAdmin={true} exact path="/admin/user/:id" component={UpdateUser} />

          </Switch>


      </Router>
    </>
  );
}

export default App;
