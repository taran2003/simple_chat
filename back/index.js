const express = require('express')
const app = express()
const router = require("./src/routes/router")
const bodyParser = require("body-parser")
const cors = require("cors");
const port = 3001

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions));

app.use(express.static('image'));
app.use(bodyParser.json());
app.use('/api', router);

app.listen(port, () => console.log(`Example app listening on port ${port}`));