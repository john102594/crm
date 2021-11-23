import mysql from "mysql";
import config from "./config";

const mysqlConnection = mysql.createConnection({
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
});

mysqlConnection.connect((error) => {
  if (error) {
    console.log(error);
    return;
  } else {
    console.log("DB esta conectada");
  }
});

export default mysqlConnection;
