const express = require('express');
const router = express.Router();

var dashboard_funcionarioController = require("../controllers/dashboard_veiculoController");

router.get("/listarVeiculos/:id", function (req, res) {
    dashboard_funcionarioController.listarVeiculos(req, res);
});

router.get("/listarVeiculos/barraPesquisa/:id/:conteudoPesquisa", function (req, res) {
    dashboard_funcionarioController.listarVeiculosPesquisa(req, res);
});

module.exports = router;