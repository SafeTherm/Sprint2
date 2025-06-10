var dashboard_funcionarioModel = require("../models/dashboard_funcionarioModel");


function listarFuncionarios(req, res) {

    var idTransportadora = req.params.id

    if (idTransportadora == undefined) {
        res.status(400).sendo("Seu idTransportadora está indefinido")
    } else {

        dashboard_funcionarioModel.listarFuncionarios(idTransportadora)

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

function listarFuncionariosPesquisa(req, res) {

    var idTransportadora = req.params.id
    var conteudo_pesquisa = req.params.conteudoPesquisa

    if (idTransportadora == undefined) {
        res.status(400).sendo("Seu idTransportadora está indefinido")
    } else if (conteudo_pesquisa == undefined) {
        res.status(400).sendo("Seu conteudo_pesquisa está indefinido")
    } else {

        dashboard_funcionarioModel.listarFuncionariosPesquisa(idTransportadora, conteudo_pesquisa)

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

function excluirSensor(req, res) {
    var idVeiculo = req.body.idFuncionarioServer;

    if (idVeiculo === undefined) {
        res.status(400).send("Seu idVeiculo está undefined!");
    } else {
        dashboard_funcionarioModel.excluirSensor(idVeiculo)
            .then(resultado => {
                res.json(resultado);
            })
            .catch(erro => {
                console.log(erro);
                console.log("\nHouve um erro ao excluir o sensor! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function listarVeiculosFuncionario(req, res) {

    var idFuncionario = req.params.id

    if (idFuncionario == undefined) {
        res.status(400).sendo("Seu idFuncionario está indefinido")
    } else {

        dashboard_funcionarioModel.listarVeiculosFuncionario(idFuncionario)

            .then(
                function (resultado) {
                    res.json(resultado)
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar a lista de veiculos do funcionario! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage)
                }
            )
    }
}

function excluirVeiculo(req, res) {
    var idVeiculo = req.body.idVeiculoServer;

    if (idVeiculo === undefined) {
        res.status(400).send("Seu idFuncionario está undefined!");
    } else {
        dashboard_funcionarioModel.excluirVeiculo(idVeiculo)
            .then(resultado => {
                res.json(resultado);
            })
            .catch(erro => {
                console.log(erro);
                console.log("\nHouve um erro ao excluir o sensor! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function excluirFuncionario(req, res) {
    var idFuncionario = req.body.idFuncionarioServer;

    if (idFuncionario === undefined) {
        res.status(400).send("Seu idFuncionario está undefined!");
    } else {
        dashboard_funcionarioModel.excluirFuncionario(idFuncionario)
            .then(resultado => {
                res.json(resultado);
            })
            .catch(erro => {
                console.log(erro);
                console.log("\nHouve um erro ao excluir o sensor! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function excluirAlertas(req, res) {
    var idVeiculo = req.body.idVeiculo;

    if (idVeiculo === undefined) {
        res.status(400).send("Seu idVeiculo está undefined!");
    } else {
        dashboard_funcionarioModel.excluirAlertas(idVeiculo)
            .then(resultado => {
                res.json(resultado);
            })
            .catch(erro => {
                console.log(erro);
                console.log("\nHouve um erro ao excluir os alertas dos sensores! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function excluirLeiturasSensor(req, res) {
    var idVeiculo = req.body.idVeiculo;

    if (idVeiculo === undefined) {
        res.status(400).send("Seu idVeiculo está undefined!");
    } else {
        dashboard_funcionarioModel.excluirLeiturasSensor(idVeiculo)
            .then(resultado => {
                res.json(resultado);
            })
            .catch(erro => {
                console.log(erro);
                console.log("\nHouve um erro ao excluir os alertas dos sensores! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function cadastrarFuncionario(req, res) {

    var imagem = req.file.filename
    var email = req.body.emailFuncionario
    var nome = req.body.nomeFuncionario
    var cpf = req.body.cpfFuncionario
    var telefone = req.body.telefoneFuncionario
    var idTransportadora = req.body.fkTransportadora


    dashboard_funcionarioModel.cadastrarFuncionario(idTransportadora, email, nome, cpf, telefone, imagem)
        .then(resultado => {
            res.status(201).send("Usuario criado com sucesso");
        }).catch(err => {
            res.status(500).send(err);
        });
}

module.exports = {
    listarFuncionarios,
    listarFuncionariosPesquisa,
    excluirSensor,
    listarVeiculosFuncionario,
    excluirVeiculo,
    excluirFuncionario,
    cadastrarFuncionario,
    excluirAlertas,
    excluirLeiturasSensor
}