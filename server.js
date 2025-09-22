require('dotenv').config();
const express = require('express');
const weatherRoutes = require('./routes/weather');

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/', weatherRoutes);
app.get('/test', (req, res) => res.send('Server works'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



module.exports = { app, PORT };