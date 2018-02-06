const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { graphqlExpress, graphiqlExpress } = require("apollo-server-express");
const routes = require("./routes/routes");
const myGraphQLSchema = require("./schema");

const app = express();

mongoose.Promise = global.Promise;
if (process.env.NODE_ENV !== "test") {
  mongoose.connect("mongodb://localhost/snipetto", {
    useMongoClient: true
  });
}

app.use(bodyParser.json());
// routes(app);

// require("./create-new-library");

app.use("/graphql", graphqlExpress({ schema: myGraphQLSchema }));

app.use(
  "/graphiql",
  graphiqlExpress({
    endpointURL: "/graphql"
  })
);

app.use((err, req, res, next) => {
  res.status(422).send({ error: err.message });
});

module.exports = app;
