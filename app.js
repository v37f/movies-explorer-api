const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const { PORT, DB_ADDRESS, ORIGIN } = require('./config');

const app = express();
app.use(routes);

mongoose.set('strictQuery', true);
mongoose.connect(DB_ADDRESS);

app.listen(PORT, () => {
  console.log('server listen');
});
