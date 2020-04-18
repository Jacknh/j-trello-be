const express = require('express');
const dotenv = require('dotenv')
const auth = require('./routes/auth');
const errorHandler = require('./middlewares/errorHandler');
const connectDB = require('./db');

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use('/api/auth', auth);
app.use(errorHandler);

app.listen(process.env.PORT, () => console.log(`The server running on port ${process.env.PORT}`))