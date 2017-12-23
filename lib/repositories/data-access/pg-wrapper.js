// Currently this file duplicated accross multiple repos.
// Keep this in a npm
const pgp = require("pg-promise")();

const logger = require("../../utils/logger");

const database = process.env.PGDATABASE || "test";
const user = process.env.PGUSER || "postgres";
const password = process.env.PGPASSWORD || "password";
const host = process.env.PGHOST || "localhost";
const port = process.env.PGPORT || 5432;

// create a config to configure both pooling behavior 
// and client options 
// note: all config is optional and the environment variables 
// will be read if the config is not present 

const config = {
  user,
  database,
  password,
  host,
  port,
  max: 10, // max number of clients in the pool 
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed 
};

logger.log("Database Config:", config);

// this initializes a connection pool 
// it will keep idle connections open for 30 seconds 
// and set a limit of maximum 10 idle clients 
const db = pgp(config);

class PGWrapper {
  static executeQuery(query, params) {
    logger.debug("ExecuteQuery Start:", query);

    const startTime = new Date();
    return db.any(query, params)
      .then((data) => {
        logger.debug("ExecuteQuery Completed:", query, ":", new Date() - startTime, "ms");
        return data;
      })
      .catch((error) => {
        logger.debug("ExecuteQuery:Error:", error);
        return error;
      });
  }

  static execureStoredProcedure(procedure, params) {
    logger.debug("ExecureStoredProcedure Start:", procedure);

    const startTime = new Date();
    return db.func(procedure, params)
      .then((data) => {
        logger.debug("ExecureStoredProcedure:", procedure, ":", new Date() - startTime, "ms");
        return data;
      })
      .catch((error) => {
        logger.debug("ExecureStoredProcedure:Error:", error);
        return error;
      });
  }
}

module.exports = PGWrapper;
