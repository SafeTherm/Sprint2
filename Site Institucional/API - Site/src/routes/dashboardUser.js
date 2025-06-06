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

module.exports = router;