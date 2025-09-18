const Vehicle = require('../models/Vehicle');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// @desc    Get all vehicles
// @route   GET /api/vehicles
exports.getAllVehicles = catchAsync(async (req, res, next) => {
  const vehicles = await Vehicle.find().select('-__v');

  if (!vehicles || vehicles.length === 0) {
    return next(new AppError('No vehicles found', 404));
  }

  res.status(200).json({
    status: 'success',
    data: vehicles,
  });
});

// @desc    Get a single vehicle by ID
// @route   GET /api/vehicles/:id
exports.getVehicle = catchAsync(async (req, res, next) => {
  const vehicle = await Vehicle.findById(req.params.id).select('-__v');

  if (!vehicle) {
    return next(new AppError('Vehicle not found', 404));
  }

  res.status(200).json({
    status: 'success',
    data: vehicle,
  });
});

// @desc    Create a new vehicle
// @route   POST /api/vehicles
exports.createVehicle = catchAsync(async (req, res, next) => {
  const vehicle = await Vehicle.create(req.body);

  res.status(201).json({
    status: 'success',
    message: 'Vehicle created successfully',
    data: vehicle,
  });
});

// @desc    Update a vehicle
// @route   PATCH /api/vehicles/:id
exports.updateVehicle = catchAsync(async (req, res, next) => {
  const vehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!vehicle) {
    return next(new AppError('Vehicle not found', 404));
  }

  res.status(200).json({
    status: 'success',
    message: 'Vehicle updated successfully',
    data: vehicle,
  });
});

// @desc    Delete a vehicle
// @route   DELETE /api/vehicles/:id
exports.deleteVehicle = catchAsync(async (req, res, next) => {
  const vehicle = await Vehicle.findByIdAndDelete(req.params.id);

  if (!vehicle) {
    return next(new AppError('Vehicle not found', 404));
  }

  res.status(204).json({
    status: 'success',
    message: 'Vehicle deleted successfully',
    data: null,
  });
});

// @desc    Duplicate a vehicle
// @route   POST /api/vehicles/:id/duplicate
exports.duplicateVehicle = catchAsync(async (req, res, next) => {
  const vehicle = await Vehicle.findById(req.params.id);

  if (!vehicle) {
    return next(new AppError('Vehicle not found', 404));
  }

  // Convert mongoose doc to plain object
  const vehicleObj = vehicle.toObject();

  // Remove MongoDB-specific fields
  delete vehicleObj._id;
  delete vehicleObj.createdAt;
  delete vehicleObj.updatedAt;
  delete vehicleObj.__v;

  // Optionally tweak fields (to differentiate)
  vehicleObj.model = `${vehicleObj.model} Copy`;

  const duplicated = await Vehicle.create(vehicleObj);

  res.status(201).json({
    status: 'success',
    message: 'Vehicle duplicated successfully',
    data: duplicated,
  });
});
