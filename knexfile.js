// Update with your config settings.

module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./data/db.sqlite3",
      typeCast(field, next) {
        // Convert 1 to true, 0 to false, and leave null alone
        if (field.type === "TINY" && field.length === 1) {
          const value = field.string();
          return value ? value === "1" : null;
        }
        return next();
      }
    },
    migrations: {
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/seeds"
    }
  }
};
