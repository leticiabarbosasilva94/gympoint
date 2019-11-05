module.exports = {
  dialect: 'mariadb',
  host: 'localhost',
  port: '3306',
  username: 'root',
  password: 'senha',
  database: 'gympoint',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true
  },
  dialectOptions: {
    timezone: 'America/Sao_Paulo'
  },
  timezone: 'America/Sao_Paulo'
};
