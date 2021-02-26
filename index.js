const express = require('express');
const apiRouter = require('./routes/api');
const cors = require('cors');
require('./db');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true }));
app.use(cors());

app.use('/api', apiRouter);

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
});