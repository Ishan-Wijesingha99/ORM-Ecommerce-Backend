
// create router
const router = require('express').Router();

// import routers
const apiRoutes = require('./api');

// use routers as middleware
router.use('/api', apiRoutes);

// this middleware will display a h1 tag saying "Wrong Route!" if the user types a route that does not exist
router.use((req, res) => {
  res.send("<h1>Wrong Route!</h1>")
});

// export router
module.exports = router;