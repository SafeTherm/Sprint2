var dashboard_veiculoModel = require("../models/dashboard_veiculoModel");


function listarVeiculos(req, res) {

    var idTransportadora = req.params.id

    if (idTransportadora == undefined) {
        res.status(400).sendo("Seu idTransportadora está indefinido")
    } else {

        dashboard_veiculoModel.listarVeiculos(idTransportadora)

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

        dashboard_veiculoModel.listarVeiculosPesquisa(idTransportadora, conteudo_pesquisa)

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

function select_listarFuncionario(req, res) {

    var idTransportadora = req.params.id

    if (idTransportadora == undefined) {
        res.status(400).sendo("Seu idTransportadora está indefinido")
    } else {

        dashboard_veiculoModel.select_listarFuncionario(idTransportadora)

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

function cadastrarVeiculo(req, res) {
    var idTransportadora = req.body.idTransportadora;
    var idFuncionario = req.body.idFuncionario;
    var placa = req.body.placa;
    var modelo = req.body.modelo;

    if (idFuncionario == undefined) {
        res.status(400).send("Seu idFuncionario está undefined!");
    } else if (placa == undefined) {
        res.status(400).send("Seu placa está undefined!");
    } else if (idTransportadora == undefined) {
        res.status(400).send("Seu idTransportadora está undefined!");
    } else if (modelo == undefined) {
        res.status(400).send("Sua modelo está undefined!");
    } else {
        dashboard_veiculoModel.cadastrarVeiculo(idTransportadora, idFuncionario, placa, modelo)
            .then(resultado => {
                res.json(resultado);
            })
            .catch(erro => {
                console.log("\nErro ao cadastrar veículo:", erro.sqlMessage || erro);
                res.status(500).json(erro.sqlMessage || erro);
            });
    }
}

function cadastrarSensorVeiculo(req, res) {

    var idVeiculo = req.body.idVeiculo;

    dashboard_veiculoModel.cadastrarSensorVeiculo(idVeiculo)
        .then(resultado => {
            res.json(resultado);
        })
        .catch(erro => {
            console.error("Erro ao cadastrar sensors:", erro);
            res.status(500).json({ message: "Erro ao cadastrar sensores.", error: erro.sqlMessage || erro });
        });
}

module.exports = {
    listarVeiculos,
    listarVeiculosPesquisa,
    select_listarFuncionario,
    cadastrarVeiculo,
    cadastrarSensorVeiculo
}