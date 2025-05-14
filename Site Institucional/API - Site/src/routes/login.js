var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

         // Crio uma rota Logar
         // (/usuario/logar)
router.post("/logar", function (req, res) {
    usuarioController.logar(req, res)
})

module.exports = router;