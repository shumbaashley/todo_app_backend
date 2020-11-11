const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');

const app = express();

const todoRouter = require('./routes/api/todos');

// MIDDLEWARE
app.use(cors());
app.use(bodyParser.json())
app.use('/api/todos', todoRouter);

const PORT = process.env.PORT || 5000;

// CONNECT TO DB
mongoose.connect(process.env.DB_CONNECTION, { useUnifiedTopology: true, useNewUrlParser: true  } ,() => console.log("Connected to DB successfully..."))
app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));