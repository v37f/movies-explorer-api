const express = require('express');
const mongoose = require('mongoose');
const { PORT, DB_ADDRESS, ORIGIN } = require('./config');

const app = express();

mongoose.set('strictQuery', true);
mongoose.connect(DB_ADDRESS);

app.listen(PORT, () => {
  console.log('server listen');
});
