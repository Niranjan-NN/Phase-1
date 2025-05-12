const express = require('express');
require('dotenv').config();
require('./config');
const routes = require('./routes');

const app = express();
app.use(express.json());
app.use('/api', routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));

