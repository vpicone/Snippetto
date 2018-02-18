const app = require("./app");

const PORT = process.env.PORT || 3050;
app.listen(PORT, () => {
  console.log(`Running on port ${PORT}. ${process.env.NODE_ENV} environment`);
});
