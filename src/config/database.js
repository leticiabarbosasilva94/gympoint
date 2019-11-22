require('dotenv/config');

module.exports = {
  dialect: process.env.DATABASE_DIALECT,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,

    // Seems like there's a bug in sequelize:
    // https://github.com/sequelize/sequelize/issues/10857
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
  dialectOptions: {
    timezone: process.env.TZ
  },
  timezone: process.env.TZ
};
