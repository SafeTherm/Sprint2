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

router.get("/barraPesquisa/:id", function (req, res) {
    dashboardController.barraPesquisa(req, res);
});

module.exports = router;