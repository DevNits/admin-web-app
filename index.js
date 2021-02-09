const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const config = require('./config');

const app = express();

app.set('view engine', 'ejs');

const roadRoutes = require('./routes/roads');
const driverRoutes = require('./routes/drivers');
const authRoutes = require('./routes/auth');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/api', roadRoutes);
app.use('/api', driverRoutes);
app.use('/api', authRoutes);

app.listen(config.port, () => console.log(`Server started on port ${config.port}...`));