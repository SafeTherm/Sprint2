const express = require('express');
const router = express.Router();

var dashboard_veiculoController = require("../controllers/dashboard_veiculoController");

router.get("/listarVeiculos/:id", function (req, res) {
    dashboard_veiculoController.listarVeiculos(req, res);
});

router.get("/listarVeiculos/barraPesquisa/:id/:conteudoPesquisa", function (req, res) {
    dashboard_veiculoController.listarVeiculosPesquisa(req, res);
});

router.get("/select_listarFuncionario/:id", function (req, res) {
    dashboard_veiculoController.select_listarFuncionario(req, res);
});

router.post("/cadastrarVeiculo", function (req, res) {
    dashboard_veiculoController.cadastrarVeiculo(req, res);
});

router.post("/cadastrarSensorVeiculo", function (req, res) {
    dashboard_veiculoController.cadastrarSensorVeiculo(req, res);
});

module.exports = router;