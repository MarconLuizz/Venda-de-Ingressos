module.exports = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({
      mensagem:
        "Acesso negado. Apenas administradores podem realizar essa ação.",
    });
  }
};
