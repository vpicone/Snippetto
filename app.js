const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { graphqlExpress, graphiqlExpress } = require("apollo-server-express");
const myGraphQLSchema = require("./schema");

const app = express();

mongoose.Promise = global.Promise;
if (process.env.NODE_ENV !== "test") {
  mongoose.connect(process.env.DB_URL, {
    useMongoClient: true
  });
}

app.use(bodyParser.json());

app.use("/graphql", graphqlExpress({ schema: myGraphQLSchema }));

app.use(
  "/graphiql",
  graphiqlExpress({
    endpointURL: "/graphql"
  })
);

if (process.env.NODE_ENV === "production") {
  // Express will serve up production assets
  // like our main.js file, or main.css file!
  app.use(express.static("client/build"));

  // Express will serve up the index.html file
  // if it doesn't recognize the route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.use((err, req, res, next) => {
  res.status(422).send({ error: err.message });
});

module.exports = app;
