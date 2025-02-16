// Definição do modelo de Usuário
const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

const User = sequelize.define(
  "User", // Nome do modelo
  {
    id: {
      type: DataTypes.UUID, // Identificador único do usuário
      defaultValue: DataTypes.UUIDV4, // Geração automática de UUID
      primaryKey: true, // Define como chave primária
    },
    nome: {
      type: DataTypes.STRING, // Nome do usuário
      allowNull: false, // Não permite valor nulo
    },
    email: {
      type: DataTypes.STRING, // E-mail do usuário
      allowNull: false, // Não permite valor nulo
      unique: true, // E-mail único
    },
    senha: {
      type: DataTypes.STRING, // Senha do usuário
      allowNull: false, // Não permite valor nulo
    },
    role: {
      type: DataTypes.ENUM("user", "admin"), // Tipo de usuário (admin ou user)
      defaultValue: "user", // Valor padrão é 'user'
    },
  },
  {
    timestamps: false, // Não cria campos de timestamp
  }
);

module.exports = User; // Exporta o modelo de Usuário
