const server = require("./app");
const db = require("./models");
const port = process.env.app_port;

db.sequelize.sync().then(() => {
  server.listen(port, console.log("app is listening on port ::: ", port));
});
