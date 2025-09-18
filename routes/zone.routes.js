const express = require('express');
const zoneController = require('../controllers/zone.controller');

const router = express.Router();

router
  .route('/')
  .get(zoneController.getAllZones)
  .post(zoneController.createZone);

router.get('/find/by-point', zoneController.getZoneByPoint);

router
  .route('/:id')
  .get(zoneController.getZone)
  .patch(zoneController.updateZone)
  .delete(zoneController.deleteZone);

router.route('/:id/duplicate').post(zoneController.duplicateZone);

module.exports = router;
