// Importa dependências
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Registra um novo usuário
exports.register = async (req, res) => {
  try {
    const { nome, email, senha, role } = req.body;
    const hashedPassword = await bcrypt.hash(senha, 10); // Criptografa a senha

    await User.create({
      nome,
      email,
      senha: hashedPassword,
      role,
    });

    res.status(201).json({ mensagem: "Usuário registrado com sucesso!" });
  } catch (error) {
    res
      .status(400)
      .json({ mensagem: "Erro ao registrar usuário.", erro: error.message });
  }
};

// Realiza login do usuário
exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;
    const usuario = await User.findOne({ where: { email } });

    if (!usuario || !(await bcrypt.compare(senha, usuario.senha))) {
      return res.status(401).json({ mensagem: "E-mail ou senha incorretos." });
    }

    // Gera token de autenticação
    const token = jwt.sign(
      { id: usuario.id, role: usuario.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ mensagem: "Login bem-sucedido!", token });
  } catch (error) {
    res
      .status(400)
      .json({ mensagem: "Erro ao fazer login.", erro: error.message });
  }
};
