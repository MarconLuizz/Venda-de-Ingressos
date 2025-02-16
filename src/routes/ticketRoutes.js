const express = require("express");
const {
  createTicket,
  getAllTickets,
  getTicketById,
  updateTicket,
  deleteTicket,
} = require("../controllers/ticketController");
const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");

const router = express.Router();

// Rota para criar um ingresso (requere autenticação e permissão de admin)
router.post("/", authMiddleware, adminMiddleware, createTicket);

// Rota para listar todos os ingressos
router.get("/", getAllTickets);

// Rota para obter um ingresso pelo ID
router.get("/:id", getTicketById);

// Rota para atualizar um ingresso (requere autenticação e permissão de admin)
router.put("/:id", authMiddleware, adminMiddleware, updateTicket);

// Rota para deletar um ingresso (requere autenticação e permissão de admin)
router.delete("/:id", authMiddleware, adminMiddleware, deleteTicket);

module.exports = router;
