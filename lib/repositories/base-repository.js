// Currently this file duplicated accross multiple repos.
// Keep this in a npm

const _ = require("underscore");

const DataAccessWrapper = require("./data-access/pg-wrapper");
const objectId = {};

const logger = require("../utils/logger");

class BaseRepository {
  constructor() {
    this.logger = logger;
  }

  executeQuery(query, params) {
    return DataAccessWrapper.executeQuery(query, params);
  }

  execureStoredProcedure(procedure, params) {
    return DataAccessWrapper.execureStoredProcedure(procedure, params);
  }

  buildWhereClause(clauses, paramIndex) {
    const result = " WHERE ";
    const conditions = [];

    let index = paramIndex;
    _.each(clauses, (clause) => {
      logger.log("CLAUSE", clause)
      const str = ` ${clause.table}."${clause.field}"${clause.condition}$${index} `;
      index += 1;
      conditions.push(str);
    });

    return result + conditions.join(" AND ");
  }

  buildSort(sortFields) {
    if (sortFields.lengh <= 0) {
      return "";
    }

    let result = "ORDER BY ";

    if (_.isArray(sortFields)) {
      result += `"`;
      result += sortFields.join(`","`);
      return result + `"`;
    }

    result = `ORDER BY `;

    const temp = [];
    _.each(_.keys(sortFields), key => {
      temp.push(`"${key}" ${sortFields[key]}`);
    });

    result += temp.join(",");
    return result;
  }

  buildQuery(tableName, fieldNames) {
    let fieldsList = "*";

    if (fieldNames && fieldNames.lengh > 0) {
      fieldsList = fieldNames.join(",");
    }

    return `SELECT ${fieldsList} FROM ${tableName}`;
  }
}

module.exports = BaseRepository;
