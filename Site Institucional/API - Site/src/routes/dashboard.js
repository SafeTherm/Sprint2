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

router.get("/alertaSensor/defeitoSensor/:id", function (req, res) {
    dashboardController.defeitoSensor(req, res);
});

router.get("/alertaSensor/infoMotorista/:id", function (req, res) {
    dashboardController.infoMotorista(req, res);
});

module.exports = router;