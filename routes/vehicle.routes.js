const express = require('express');
const vehicleController = require('../controllers/vehicle.controller');

const router = express.Router();

// GET all vehicles & POST a new vehicle
router
  .route('/')
  .get(vehicleController.getAllVehicles)
  .post(vehicleController.createVehicle);

// GET one, UPDATE one, DELETE one
router
  .route('/:id')
  .get(vehicleController.getVehicle)
  .patch(vehicleController.updateVehicle)
  .delete(vehicleController.deleteVehicle);

router.route('/:id/duplicate').post(vehicleController.duplicateVehicle);

module.exports = router;
