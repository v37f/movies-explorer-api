const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const { errors } = require('celebrate');
const routes = require('./routes');
const limiter = require('./middlewares/limiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { errorHandler } = require('./middlewares/error-handler');
const { PORT, DB_ADDRESS, ORIGIN } = require('./config');

const app = express();
app.use(requestLogger);
app.use(limiter);
app.use(helmet());
app.use(cors({ origin: ORIGIN }));
app.use(express.json());
app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

mongoose.set('strictQuery', true);
mongoose.connect(DB_ADDRESS);

app.listen(PORT);
