//app.js
const express = require('express');
const app = express();
app.use(express.json());
const cors=require('cors');

const auth = require('./routes/auth')
app.use(cors());

app.use('/api/v1',auth);
module.exports = app;