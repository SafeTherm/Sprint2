const express = require('express');
const router = express.Router();

var dashboardUserController = require("../controllers/dashboardUserController");

// Rota para puxar codigos
router.get("/infosUser/:id", function (req, res) {
    dashboardUserController.infosUser(req, res);
});
// Historico umidade
router.get("/umidadeHistorico/:id", function (req, res) {
    dashboardUserController.umidadeHistorico(req, res);
});
// Historico tempertura
router.get("/temperaturaHistorico/:id", function (req, res) {
    dashboardUserController.temperaturaHistorico(req, res);
});
// capturar ids do sensor temperatura LM35
router.get("/veiculoTemperatura/:id", function (req, res) {
    dashboardUserController.veiculoTemperatura(req, res);
});

// capturar ids do sensor umidade DHT11
router.get("/veiculoUmidade/:id", function (req, res) {
    dashboardUserController.veiculoUmidade(req, res);
});

// capturar dados graficoSup do sensor temperuta LM35
router.get("/graficTempSup/:id", function (req, res) {
    dashboardUserController.graficTempSup(req, res);
});

// capturar dados graficoSup do sensor umidade DHT11
router.get("/graficUmiSup/:id", function (req, res) {
    dashboardUserController.graficUmiSup(req, res);
});

// capturar dados graficoInf do sensor temperuta LM35
router.get("/graficTempInf/:id", function (req, res) {
    dashboardUserController.graficTempInf(req, res);
});

// capturar dados graficoInf do sensor umidade DHT11
router.get("/graficUmiInf/:id", function (req, res) {
    dashboardUserController.graficUmiInf(req, res);
});

// verificação de dados, analisa se está tendo insert dos dados dos sensores;
router.get("/verificarCaptura/:id", function (req, res) {
    dashboardUserController.verificarCaptura(req, res);
});

// verificação de dados, analisa se está tendo insert dos dados dos sensores;
router.post("/atualizandoStatus", function (req, res) {
    dashboardUserController.atualizandoStatus(req, res);
});



module.exports = router;