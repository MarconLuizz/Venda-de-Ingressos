// Definição do modelo de Ingresso
const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

const Ticket = sequelize.define(
  "Ticket", // Nome do modelo
  {
    id: {
      type: DataTypes.UUID, // Identificador único do ingresso
      defaultValue: DataTypes.UUIDV4, // Geração automática de UUID
      primaryKey: true, // Define como chave primária
    },
    nome: {
      type: DataTypes.STRING, // Nome do ingresso
      allowNull: false, // Não permite valor nulo
    },
    preco: {
      type: DataTypes.FLOAT, // Preço do ingresso
      allowNull: false, // Não permite valor nulo
    },
    quantidadeDisponivel: {
      type: DataTypes.INTEGER, // Quantidade de ingressos disponíveis
      allowNull: false, // Não permite valor nulo
    },
  },
  {
    timestamps: false, // Não cria campos de timestamp
  }
);

module.exports = Ticket; // Exporta o modelo de Ingresso
