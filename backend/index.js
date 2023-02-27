const express = require('express')
const cors = require('cors')
require('dotenv').config()
const app = express();
app.use(express.json());
app.use(cors())
const port = 3050;
const { jwtRoutes } = require('./routes/jwtRoutes')

app.use('/api', jwtRoutes)

app.listen(port, (err) => {
    console.log(`server is connected on port http://localhost:${port}`)
})
