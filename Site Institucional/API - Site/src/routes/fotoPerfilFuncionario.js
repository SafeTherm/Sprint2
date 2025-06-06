var express = require("express")
var router = express.Router()
var upload = require("../config/configUploadPerfil")
var dashboard_funcionarioController = require("../controllers/dashboard_funcionarioController")

// upload.single('foto') vai buscar no json alguma propriedade chamada foto 
router.post('/cadastrarFuncionario', upload.single('fotoFuncionario'), (req, res) => {
  dashboard_funcionarioController.cadastrarFuncionario(req, res);
})

module.exports = router;