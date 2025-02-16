// Definição do modelo de Compra
const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");
const User = require("./User");
const Ticket = require("./Ticket");

const Purchase = sequelize.define(
  "Purchase", // Nome do modelo
  {
    id: {
      type: DataTypes.UUID, // Tipo UUID para identificador único
      defaultValue: DataTypes.UUIDV4, // Geração automática de UUID
      primaryKey: true, // Define como chave primária
    },
    userId: {
      type: DataTypes.UUID, // Relacionamento com o usuário
      allowNull: false, // Não permite valor nulo
      references: { model: User, key: "id" }, // Chave estrangeira para o usuário
    },
    ticketId: {
      type: DataTypes.UUID, // Relacionamento com o ingresso
      allowNull: false, // Não permite valor nulo
      references: { model: Ticket, key: "id" }, // Chave estrangeira para o ingresso
    },
    quantity: {
      type: DataTypes.INTEGER, // Quantidade de ingressos
      allowNull: false, // Não permite valor nulo
      validate: { min: 1 }, // Validação de quantidade mínima
    },
    totalPrice: {
      type: DataTypes.FLOAT, // Preço total da compra
      allowNull: false, // Não permite valor nulo
    },
  },
  {
    timestamps: true, // Habilita campos de timestamp
  }
);

module.exports = Purchase; // Exporta o modelo de Compra
