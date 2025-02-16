require("dotenv").config(); // Carrega variáveis de ambiente do arquivo .env
const express = require("express"); // Importa o Express
const cors = require("cors"); // Importa o middleware CORS para permitir requisições de diferentes origens
const sequelize = require("../config/database"); // Conecta ao banco de dados usando Sequelize
const authMiddleware = require("./middlewares/authMiddleware"); // Importa o middleware de autenticação

const app = express();
app.use(express.json()); // Permite que o Express entenda requisições no formato JSON
app.use(express.urlencoded({ extended: true })); // Permite que o Express entenda requisições URL-encoded
app.use(cors()); // Ativa o CORS no servidor

// Rotas
const authRoutes = require("./routes/authRoutes");
app.use("/auth", authRoutes);

const ticketRoutes = require("./routes/ticketRoutes");
app.use("/tickets", ticketRoutes);

const purchaseRoutes = require("./routes/purchaseRoutes");
app.use("/purchases", purchaseRoutes);

// Importando os models
const User = require("./models/User");
const Ticket = require("./models/Ticket");
const Purchase = require("./models/Purchase");

// Configurando associações entre os models
Ticket.hasMany(Purchase, {
  foreignKey: "ticketId", // Chave estrangeira para o ingresso
  onDelete: "CASCADE", // Deleção em cascata: se o ingresso for deletado, as compras associadas também serão deletadas
  hooks: true,
});
Purchase.belongsTo(Ticket, { foreignKey: "ticketId" }); // A compra pertence a um ingresso
Purchase.belongsTo(User, { foreignKey: "userId" }); // A compra pertence a um usuário

// Configuração do Mustache como template engine
const mustacheExpress = require("mustache-express");
const engine = mustacheExpress();
app.engine("mustache", engine); // Registra o Mustache como motor de template
app.set("views", "src/templates"); // Define o diretório de templates
app.set("view engine", "mustache"); // Define o motor de visualização como Mustache

// Interface de login
app.get("/", (req, res) => {
  let args = {
    titulo: "Login",
    titulo_principal: "Login",
    lbl_email: "Email",
    lbl_senha: "Senha",
    lbl_token: "Token",
    btt_enviar: "Enviar",
  };

  res.render("login", args); // Renderiza o template de login
});

// Interface de histórico de compras
app.get("/history", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id; // Obtém o ID do usuário autenticado
    const purchases = await Purchase.findAll({
      where: { userId }, // Busca as compras do usuário
      include: { model: Ticket, attributes: ["nome", "preco"] }, // Inclui dados do ingresso
    });

    let args = {
      titulo: "Histórico",
      titulo_principal: "Meus Ingressos",
      purchases: purchases.map((purchase) => ({
        id: purchase.id,
        quantity: purchase.quantity,
        totalPrice: purchase.totalPrice,
        Ticket: {
          nome: purchase.Ticket.nome,
          preco: purchase.Ticket.preco,
        },
      })),
    };

    res.render("history", args); // Renderiza o template do histórico
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao carregar histórico");
  }
});

// Interface de visualização individual de ingresso
app.get("/ticket/:id", authMiddleware, async (req, res) => {
  try {
    const purchaseId = req.params.id; // Obtém o ID da compra
    const purchase = await Purchase.findByPk(purchaseId, {
      include: { model: Ticket, attributes: ["nome", "preco"] }, // Inclui dados do ingresso
    });

    if (!purchase) {
      return res.status(404).send("Compra não encontrada!"); // Verifica se a compra existe
    }

    let args = {
      titulo: "Visualização do Ingresso",
      titulo_ingresso: "Detalhes do Ingresso",
      ingresso: {
        nome: purchase.Ticket.nome,
        preco: purchase.Ticket.preco,
        quantity: purchase.quantity,
        totalPrice: purchase.totalPrice,
      },
    };

    res.render("tickets", args); // Renderiza o template de visualização do ingresso
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao visualizar ingresso.");
  }
});

// Inicia o servidor e conecta ao banco de dados
const PORT = process.env.PORT || 3000; // Define a porta do servidor
sequelize
  .sync() // Sincroniza os modelos com o banco de dados
  .then(() => {
    console.log("Banco de dados conectado!");
    app.listen(PORT, () => console.log("Servidor na porta 3000")); // Inicia o servidor
  })
  .catch((error) =>
    console.error("Erro ao conectar ao banco de dados:", error)
  );
