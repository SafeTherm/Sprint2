var dashboardUserModel = require("../models/dashboardUserModel");


function infosUser(req, res) {

    var idUsuarioSelect = req.params.id

    if (idUsuarioSelect == undefined) {
        res.status(400).sendo("o idFuncionario está indefinido para acessar informações da dash")
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

function umidadeHistorico(req, res){
    var idVeiculo = req.params.id

    
    if (idVeiculo == undefined) {
        res.status(400).sendo("o de idVeiculo está indefinido para acessar informações da dash")
    } else {
        dashboardUserModel.umidadeHistorico(idVeiculo)
            .then(
                function (resultado) {
                    res.json(resultado)
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao carregar dados do historico umidade! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage)
                }
            )
    }

}


function temperaturaHistorico(req, res){
    var idVeiculo = req.params.id

    
    if (idVeiculo == undefined) {
        res.status(400).sendo("o de idVeiculo está indefinido para acessar informações da dash")
    } else {
        dashboardUserModel.temperaturaHistorico(idVeiculo)
            .then(
                function (resultado) {
                    res.json(resultado)
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao carregar dados do historico umidade! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage)
                }
            )
    }

}



module.exports = {
    infosUser,
    umidadeHistorico,
    temperaturaHistorico
}