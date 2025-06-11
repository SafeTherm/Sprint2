const express = require('express');
const router = express.Router();

var dashboardController = require("../controllers/dashboardController");

// Rota para puxar codigos
router.get("/listarFrota/:id", function (req, res) {
    dashboardController.listarFrota(req, res);
});

router.get("/listarVeiculosEmRota/:id", function (req, res) {
    dashboardController.emRota(req, res);
});

router.get("/barraPesquisa/:id/:conteudoPesquisa", function (req, res) {
    dashboardController.barraPesquisa(req, res);
});

router.get("/alertaSensor/veiculosRota/:id", function (req, res) {
    dashboardController.alertaSensorVrota(req, res);
});

router.get("/alertaSensor/defeitoSensorRota/:id", function (req, res) {
    dashboardController.defeitoSensor(req, res);
});

router.get("/alertaSensor/infoMotorista/:id", function (req, res) {
    dashboardController.infoMotorista(req, res);
});

router.post("/alertaSensor/statusSensor/defeito", function (req, res) {
    dashboardController.alterarStatusDefeito(req, res);
});

router.get("/alertaSensor/listarVeiculos/:id", function (req, res) {
    dashboardController.listarVeiculos(req, res);
});

router.get("/alertaSensor/listarSensoresDefeito/:id", function (req, res) {
    dashboardController.listarSensoresDefeito(req, res);
});

router.get("/veiculos/media/:id", function (req, res) {
    dashboardController.media_veiculos(req, res);
});

router.get("/notificacao_recente/:id", function (req, res) {
    dashboardController.notificacao_recente(req, res);
});

module.exports = router;