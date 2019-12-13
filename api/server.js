const express = require("express");
const helmet = require("helmet");

// const *Router = require("../*/*-router.js");

const server = express();

server.use(helmet());
server.use(express.json());

// server.use("/api/*", *Router);

module.exports = server;
