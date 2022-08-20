
// import modules and routes
const express = require('express');
const routes = require('./routes');

// create express app
const app = express();

// create variable for port
const PORT = process.env.PORT || 3001;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);


// listen on port
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});



