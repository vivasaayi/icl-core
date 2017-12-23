const BaseRepository = require("./base-repository");

class PromiseRepository extends BaseRepository {
  fetchPromiseByDate(date) {
    let query = this.buildQuery("promises");

    const clauses = [{
      table: "promises",
      field: "date",
      condition: "="
    }];


    query += this.buildWhereClause(clauses, 1);

    this.logger.log("Fetch Promise By Date:", query);

    return this.executeQuery(query, [date])
      .then((results) => {
        this.logger.log("PromiseRepository:fetchPromiseByDate:", results);

        return results;
      });
  }
}

module.exports = new PromiseRepository();