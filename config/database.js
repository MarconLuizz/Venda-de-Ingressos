// Importa o Sequelize
const { Sequelize } = require("sequelize");

// Cria a conexão com o banco SQLite
const sequelize = new Sequelize({
  dialect: "sqlite", // Tipo de banco
  storage: "./database.sqlite", // Caminho do arquivo
});

// Exporta a conexão
module.exports = sequelize;
