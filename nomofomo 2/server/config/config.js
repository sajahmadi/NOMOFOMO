module.exports = {
  development: {
    username: "linpostgres",
    password: "UwIC88zn.QgtlLxm",
    database: "postgres",
    host: "lin-14110-4328-pgsql-primary.servers.linodedb.net",
    dialect: "postgres",
    port: 5432,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
  production: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_HOST,
    dialect: "postgres",
    port: 5432,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
