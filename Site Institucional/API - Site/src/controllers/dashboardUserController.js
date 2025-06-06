var dashboardUserModel = require("../models/dashboardUserModel");


function infosUser(req, res) {

    var idUsuarioSelect = req.params.id

    if (idUsuarioSelect == undefined) {
        res.status(400).sendo("Seu nom está indefinido")
    } else {
        dashboardUserModel.infosUser(idUsuarioSelect)
            .then(
                function (resultado) {
                    res.json(resultado)
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao carregar dados do usuario! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage)
                }
            )
    }
}


module.exports = {
    infosUser
}