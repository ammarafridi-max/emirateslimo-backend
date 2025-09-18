const Zone = require('../models/Zone');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// @desc Get all zones
exports.getAllZones = catchAsync(async (req, res, next) => {
  const zones = await Zone.find();

  res.status(200).json({
    status: 'success',
    results: zones.length,
    data: { zones },
  });
});

// @desc Get single zone by ID
exports.getZone = catchAsync(async (req, res, next) => {
  const zone = await Zone.findById(req.params.id);

  if (!zone) {
    return next(new AppError('Zone not found', 404));
  }

  res.status(200).json({
    status: 'success',
    data: { zone },
  });
});

// @desc Create a new zone
exports.createZone = catchAsync(async (req, res, next) => {
  const zone = await Zone.create(req.body);

  res.status(201).json({
    status: 'success',
    message: 'Zone created successfully',
    data: { zone },
  });
});

// @desc Update a zone
exports.updateZone = catchAsync(async (req, res, next) => {
  const zone = await Zone.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!zone) {
    return next(new AppError('Zone not found', 404));
  }

  res.status(200).json({
    status: 'success',
    message: 'Zone updated successfully',
    data: { zone },
  });
});

// @desc Delete a zone
exports.deleteZone = catchAsync(async (req, res, next) => {
  const zone = await Zone.findByIdAndDelete(req.params.id);

  if (!zone) {
    return next(new AppError('Zone not found', 404));
  }

  res.status(204).json({
    status: 'success',
    message: 'Zone deleted successfully',
    data: null,
  });
});

exports.duplicateZone = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const zone = await Zone.findById(id);
  if (!zone) return next(new AppError('Zone not found', 404));

  const zoneObj = zone.toObject();
  delete zoneObj._id;
  delete zoneObj.createdAt;
  delete zoneObj.updatedAt;
  delete zoneObj.__v;

  const newZone = await Zone.create({
    ...zoneObj,
    name: `${zoneObj.name} Copy`,
  });

  res.status(201).json({
    status: 'success',
    message: 'Zone duplicated successfully',
    data: { zone: newZone },
  });
});

exports.getZoneByPoint = catchAsync(async (req, res, next) => {
  const { lat, lng } = req.query;

  if (!lat || !lng) {
    return next(
      new AppError('Please provide lat and lng as query params', 400)
    );
  }

  const zone = await Zone.findOne({
    geometry: {
      $geoIntersects: {
        $geometry: {
          type: 'Point',
          coordinates: [parseFloat(lng), parseFloat(lat)], // GeoJSON requires [lng, lat]
        },
      },
    },
  });

  if (!zone) {
    return next(new AppError('No zone found for this location', 404));
  }

  res.status(200).json({
    status: 'success',
    data: { zone },
  });
});
