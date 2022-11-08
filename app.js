require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./shema");

const app = express();
const server = http.createServer(app);
app.use(
  "/graphql",
  graphqlHTTP({
    graphiql: true,
    schema: schema,
  })
);
app.use(cors());

module.exports = server;
