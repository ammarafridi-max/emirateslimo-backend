const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const GOOGLE_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

exports.getLocation = catchAsync(async (req, res, next) => {
  const { query } = req.query;

  if (query?.length < 3) return;

  const response =
    await fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&key=${GOOGLE_API_KEY}
`);

  if (!response.ok) {
    return next(new AppError('Error loading locations', 400));
  }

  const data = await response.json();

  const locations = data.results.map((location) => {
    const updatedObj = {};
    updatedObj.name = `${location.name}, ${location.formatted_address}`;
    updatedObj.lat = location.geometry.location.lat;
    updatedObj.lng = location.geometry.location.lng;
    updatedObj.id = location.place_id;
    return updatedObj;
  });

  res.status(200).json({
    status: 'success',
    message: 'Hello',
    data: locations,
  });
});
