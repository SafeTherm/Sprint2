var dashboardModel = require("../models/dashboardModel");


function listarFrota(req, res) {

    var idTransportadora = req.params.id

    if (idTransportadora == undefined) {
        res.status(400).sendo("Seu nom está indefinido")
    } else {

        dashboardModel.listarFrota(idTransportadora)

            .then(
                function (resultado) {
                    res.json(resultado)
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar a lista de listarFrota! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage)
                }
            )
    }
}

function emRota(req, res) {
    var idTransportadora = req.params.id
    if (idTransportadora == undefined) {
        res.status(400).sendo("Seu nom está indefinido")
    } else {
        dashboardModel.emRota(idTransportadora)
            .then(
                function (resultado) {
                    res.json(resultado)
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar a lista de veiculos em rota! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage)
                }
            )
    }
}

function barraPesquisa(req, res) {
    var idTransportadora = req.params.id
    if (idTransportadora == undefined) {
        res.status(400).sendo("Seu nom está indefinido")
    } else {
        dashboardModel.barraPesquisa(idTransportadora)
            .then(
                function (resultado) {
                    res.json(resultado)
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar a lista de veiculos em rota! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage)
                }
            )
    }
}

module.exports = {
    listarFrota,
    emRota,
    barraPesquisa
}