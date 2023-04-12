const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const { errorHandler } = require('./middlewares/error-handler');
const { PORT, DB_ADDRESS, ORIGIN } = require('./config');

const app = express();
app.use(express.json());
app.use(routes);
app.use(errorHandler);

mongoose.set('strictQuery', true);
mongoose.connect(DB_ADDRESS);

app.listen(PORT, () => {
  console.log('server listen');
});
