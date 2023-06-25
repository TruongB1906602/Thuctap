const Table = require("../models/Table.js");
const ErrorHandler = require("../utils/ErrorHandler.js");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Features = require("../utils/Features");


// create Product --Admin
exports.createTable = catchAsyncErrors(async (req, res, next) => {

  const table = await Table.create(req.body);

  res.status(201).json({
    success: true,
    table,
  });
});

// Get All Product (Admin)
exports.getAdminTables = catchAsyncErrors(async (req, res, next) => {
  const tables = await Table.find();

  res.status(200).json({
    success: true,
    tables,
  });
});

// get All Products
exports.getAllTables = catchAsyncErrors(async (req, res) => {
  const resultPerPage = 35;

  const productsCount = await Table.countDocuments();

  const feature = new Features(Table.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  const tables = await feature.query;
  res.status(200).json({
    success: true,
    tables,
    productsCount,
    resultPerPage,
  });
});
// Update Product ---Admin
exports.updateTable = catchAsyncErrors(async (req, res, next) => {
  let table = await Table.findById(req.params.id);
  if (!table) {
    return next(new ErrorHandler("Product is not found with this id", 404));
  }


  table = await Table.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useUnified: false,
  });
  res.status(200).json({
    success: true,
    table,
  });
});

// delete Product
exports.deleteTable = catchAsyncErrors(async (req, res, next) => {
  const table = await Table.findById(req.params.id);

  if (!table) {
    return next(new ErrorHandler("Product is not found with this id", 404));
  }


  await table.remove();

  res.status(200).json({
    success: true,
    message: "Table deleted succesfully",
  });
});

// single Product details
exports.getSingleTable = catchAsyncErrors(async (req, res, next) => {
  const table = await Table.findById(req.params.id);
  if (!table) {
    return next(new ErrorHandler("Product is not found with this id", 404));
  }
  res.status(200).json({
    success: true,
    table,
  });
});
