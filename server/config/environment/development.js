// Development specific configuration


module.exports = {
  env: "development",
  ip: "0.0.0.0",
  port: 9000,          // use 443 or 8443 if using https if nginx is using 443, must sync up nginx.conf forwarding to this port
  nodeHttps: "false",  // use 'false' if using Nginx for https as SSL termination point
  sequelize: {
    db: 'jr_db',
    username:'postgres',
    password:'postgres',
    options: {
      port:5432,
      logging: console.log,  // TODO use utilities.log in future to wrap bunyan or some other logging solution
      dialect:'postgres',
      "protocol": "postgres",
      host:'localhost',
      define: {
        timestamps: true
      },
      pool: { min: 1, max: 3, idle: 1800000 },  // idle in milliseconds
      retry: {max: 0}, // Set to 0 to disable retrying on SQL_BUSY error.
    }
  }
};
