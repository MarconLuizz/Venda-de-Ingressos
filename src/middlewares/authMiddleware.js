const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1] || req.query.token;

  if (!token) {
    return res.status(401).json({
      mensagem:
        "Token não encontrado. Após realizar o login e acessar a tela 'Meus Ingressos', copie seu token de usuário da barra de pesquisa e cole-o após 'token=' nas telas subsequentes.",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ mensagem: "Token inválido ou expirado." });
  }
};
