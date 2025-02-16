const Ticket = require("../models/Ticket");

// Cria um novo ingresso
exports.createTicket = async (req, res) => {
  try {
    const { nome, preco, quantidadeDisponivel } = req.body;
    const novoIngresso = await Ticket.create({
      nome,
      preco,
      quantidadeDisponivel,
    });
    res
      .status(201)
      .json({
        mensagem: "Ingresso criado com sucesso!",
        ingresso: novoIngresso,
      });
  } catch (error) {
    res
      .status(400)
      .json({ mensagem: "Erro ao criar ingresso.", erro: error.message });
  }
};

// Retorna todos os ingressos
exports.getAllTickets = async (req, res) => {
  try {
    const ingressos = await Ticket.findAll();
    res.json(ingressos);
  } catch (error) {
    res
      .status(500)
      .json({ mensagem: "Erro ao listar ingressos.", erro: error.message });
  }
};

// Atualiza um ingresso
exports.updateTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, preco, quantidadeDisponivel } = req.body;
    const ingresso = await Ticket.findByPk(id);

    if (!ingresso) {
      return res.status(404).json({ mensagem: "Ingresso não encontrado." });
    }

    await ingresso.update({ nome, preco, quantidadeDisponivel });
    res.json({ mensagem: "Ingresso atualizado com sucesso!", ingresso });
  } catch (error) {
    res
      .status(400)
      .json({ mensagem: "Erro ao atualizar ingresso.", erro: error.message });
  }
};

// Deleta um ingresso
exports.deleteTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const ingresso = await Ticket.findByPk(id);

    if (!ingresso) {
      return res.status(404).json({ mensagem: "Ingresso não encontrado." });
    }

    await ingresso.destroy();
    res.json({ mensagem: "Ingresso deletado com sucesso!" });
  } catch (error) {
    res
      .status(400)
      .json({ mensagem: "Erro ao deletar ingresso.", erro: error.message });
  }
};

// Retorna um ingresso pelo ID
exports.getTicketById = async (req, res) => {
  try {
    const { id } = req.params;
    const ingresso = await Ticket.findByPk(id);

    if (!ingresso) {
      return res.status(404).json({ mensagem: "Ingresso não encontrado." });
    }

    res.json({ mensagem: "Ingresso encontrado!", ingresso });
  } catch (error) {
    res
      .status(500)
      .json({ mensagem: "Erro ao buscar ingresso.", erro: error.message });
  }
};
