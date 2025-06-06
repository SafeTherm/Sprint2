const express = require('express');
const router = express.Router();

var dashboardUserController = require("../controllers/dashboardUserController");

// Rota para puxar codigos
router.get("/infosUser/:id", function (req, res) {
    dashboardUserController.infosUser(req, res);
});


module.exports = router;