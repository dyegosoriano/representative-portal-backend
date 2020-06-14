module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'representante',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true
  }
}
