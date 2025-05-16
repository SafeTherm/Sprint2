var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

         // Crio uma rota Logar
         // (/usuario/logar)
router.post("/logar", function (req, res) {
    usuarioController.logar(req, res)
})

router.post("/cadastrar_transportadora", function (req, res) {
    usuarioController.cadastrar_transportadora(req, res)
});

module.exports = router;