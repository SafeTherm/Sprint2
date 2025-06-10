var dashboard_funcionarioModel = require("../models/dashboard_veiculoModel");


function listarVeiculos(req, res) {

    var idTransportadora = req.params.id

    if (idTransportadora == undefined) {
        res.status(400).sendo("Seu idTransportadora está indefinido")
    } else {

        dashboard_funcionarioModel.listarVeiculos(idTransportadora)

            .then(
                function (resultado) {
                    res.json(resultado)
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar a lista de funcionarios! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage)
                }
            )
    }
}

function listarVeiculosPesquisa(req, res) {

    var idTransportadora = req.params.id
    var conteudo_pesquisa = req.params.conteudoPesquisa

    if (idTransportadora == undefined) {
        res.status(400).sendo("Seu idTransportadora está indefinido")
    } else if (conteudo_pesquisa == undefined) {
        res.status(400).sendo("Seu conteudo_pesquisa está indefinido")
    } else {

        dashboard_funcionarioModel.listarVeiculosPesquisa(idTransportadora, conteudo_pesquisa)

            .then(
                function (resultado) {
                    res.json(resultado)
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar a lista de funcionarios! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage)
                }
            )
    }
}

module.exports = {
    listarVeiculos,
    listarVeiculosPesquisa
}