const express = require('express');
const router = express.Router();

var dashboard_funcionarioController = require("../controllers/dashboard_funcionarioController");

router.get("/listarFuncionarios/:id", function (req, res) {
    dashboard_funcionarioController.listarFuncionarios(req, res);
});

router.get("/listarFuncionarios/barraPesquisa/:id/:conteudoPesquisa", function (req, res) {
    dashboard_funcionarioController.listarFuncionariosPesquisa(req, res);
});

router.post("/excluirSensor", function (req, res) {
    dashboard_funcionarioController.excluirSensor(req, res);
});

router.get("/listarVeiculoFuncionario/:id", function (req, res) {
    dashboard_funcionarioController.listarVeiculosFuncionario(req, res);
});

router.post("/excluirVeiculo", function (req, res) {
    dashboard_funcionarioController.excluirVeiculo(req, res);
});

router.post("/excluirFuncionario", function (req, res) {
    dashboard_funcionarioController.excluirFuncionario(req, res);
});

router.post("/excluirAlertas", function (req, res) {
    dashboard_funcionarioController.excluirAlertas(req, res);
});

router.post("/excluirLeiturasSensor", function (req, res) {
    dashboard_funcionarioController.excluirLeiturasSensor(req, res);
});

module.exports = router;