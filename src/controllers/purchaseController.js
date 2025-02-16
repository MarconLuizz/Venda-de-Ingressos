const Purchase = require("../models/Purchase");
const Ticket = require("../models/Ticket");

// Realiza a compra de ingressos
exports.purchaseTickets = async (req, res) => {
  try {
    const { purchases } = req.body;
    const userId = req.user.id;

    // Valida a estrutura das compras
    if (!Array.isArray(purchases) || purchases.length === 0) {
      return res
        .status(400)
        .json({ mensagem: "Histórico de compras inválida." });
    }

    let totalCost = 0;
    const purchaseRecords = [];

    // Processa cada compra
    for (const purchase of purchases) {
      const ticket = await Ticket.findByPk(purchase.ticketId);

      // Verifica a existência do ingresso
      if (!ticket) {
        return res
          .status(404)
          .json({ mensagem: `Ingresso não encontrado: ${purchase.ticketId}` });
      }

      // Verifica se há estoque suficiente
      if (ticket.quantidadeDisponivel < purchase.quantity) {
        return res.status(400).json({
          mensagem: `Estoque insuficiente para o ingresso: ${ticket.nome}. Apenas ${ticket.quantidadeDisponivel} disponíveis.`,
        });
      }

      // Atualiza o estoque do ingresso
      ticket.quantidadeDisponivel -= purchase.quantity;
      await ticket.save();

      // Calcula o total da compra
      const totalPrice = ticket.preco * purchase.quantity;
      totalCost += totalPrice;

      // Registra a compra
      const newPurchase = await Purchase.create({
        userId,
        ticketId: purchase.ticketId,
        quantity: purchase.quantity,
        totalPrice,
      });

      purchaseRecords.push(newPurchase);
    }

    // Retorna o sucesso da compra
    res.status(201).json({
      mensagem: "Compra realizada com sucesso!",
      totalCost,
      purchases: purchaseRecords,
    });
  } catch (error) {
    res
      .status(500)
      .json({ mensagem: "Erro ao realizar compra.", erro: error.message });
  }
};

// Retorna o histórico de compras do usuário
exports.getPurchaseHistory = async (req, res) => {
  try {
    const userId = req.user.id;
    const purchases = await Purchase.findAll({
      where: { userId },
      include: { model: Ticket, attributes: ["nome", "preco"] },
    });
    res.json({
      mensagem: "Histórico de compras retornado com sucesso!",
      purchases,
    });
  } catch (error) {
    res
      .status(500)
      .json({ mensagem: "Erro ao buscar histórico.", erro: error.message });
  }
};
