const express = require("express");
const {
  purchaseTickets, // Controlador para realizar a compra de ingressos
  getPurchaseHistory, // Controlador para obter o histórico de compras
} = require("../controllers/purchaseController");
const authMiddleware = require("../middlewares/authMiddleware"); // Middleware de autenticação

const router = express.Router();

// Rota para realizar a compra de ingressos (requere autenticação)
router.post("/", authMiddleware, purchaseTickets);

// Rota para obter o histórico de compras do usuário (requere autenticação)
router.get("/history", authMiddleware, getPurchaseHistory);

module.exports = router;
