const express = require('express');
const router = express.Router();

var usuarioController = require("../controllers/usuarioController");

// Rota para Logar
router.post("/logar", function (req, res) {
    usuarioController.logar(req, res);
});

// Rota para cadastrar Transportadora
router.post("/cadastrar_transportadora", function (req, res) {
    usuarioController.cadastrar_transportadora(req, res);
});

// Rota para cadastrar Funcionário
router.post("/cadastrar_funcionario", function (req, res) {
    usuarioController.cadastrar_funcionario(req, res);
});

module.exports = router;