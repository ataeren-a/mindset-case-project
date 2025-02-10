const express = require("express");
const cors = require('cors');

const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const routes = require('./router');

const server = express();

const corsConfig = {
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true,
};

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Sales Service API",
            version: "1.0.0",
            description: "API documentation for the sales service",
        },
    },
    apis: ["./routes/*.js"],
};

server.use(cors(corsConfig));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

const swaggerDocs = swaggerJsdoc(swaggerOptions);
server.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

server.use('/sales-service', routes);

server.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}`);
});