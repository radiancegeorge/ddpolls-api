const {
  db_username: username,
  db_password: password,
  db_host: host,
  db_name: database,
} = process.env;

module.exports = {
  username,
  password,
  database,
  host,
  dialect: "mysql",
};
