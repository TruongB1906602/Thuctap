 const express = require("express");
const router = express.Router();
const {
  getAllTables,
  createTable,
  updateTable,
  deleteTable,
  getSingleTable,
  getAdminTables,
} = require("../controller/TableController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
// const router = express.Router();

router.route("/tables").get(getAllTables);

router
  .route("/admin/tables")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminTables);

router
  .route("/table/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createTable);

router
  .route("/table/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateTable)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteTable)
  .get(getSingleTable);

module.exports = router;

