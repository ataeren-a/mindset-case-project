const express = require("express");
const cors = require('cors');

const routes = require('./router');

const server = express();

const corsConfig = {
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true,
};

server.use(cors(corsConfig));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use('/user-service', routes);

server.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}`);
});