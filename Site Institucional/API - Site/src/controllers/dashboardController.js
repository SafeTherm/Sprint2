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
    var conteudo_pesquisa = req.params.conteudoPesquisa

    if (idTransportadora == undefined) {
        res.status(400).sendo("Seu idransportadora está indefinido")
    } else if (conteudo_pesquisa == undefined) {
        res.status(400).sendo("Seu conteudo de pesquisa está indefinido")
    }

    else {
        dashboardModel.barraPesquisa(idTransportadora, conteudo_pesquisa)
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

function alertaSensorVrota(req, res) {
    var idTransportadora = req.params.id

    if (idTransportadora == undefined) {
        res.status(400).sendo("Seu idransportadora está indefinido")
    } else {
        dashboardModel.alertaSensorVrota(idTransportadora)
            .then(
                function (resultado) {
                    res.json(resultado)
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar a lista de veiculos em rota no Alerta Sensor! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage)
                }
            )
    }
}

function defeitoSensor(req, res) {
    var idVeiculo = req.params.id

    if (idVeiculo == undefined) {
        res.status(400).sendo("Seu idTransportadora está indefinido")
    } else {
        dashboardModel.defeitoSensor(idVeiculo)
            .then(
                function (resultado) {
                    res.json(resultado)
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar a lista de sensores com defeito! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage)
                }
            )
    }
}

function infoMotorista(req, res) {
    var idVeiculo = req.params.id

    if (idVeiculo == undefined) {
        res.status(400).sendo("Seu idFUncionario está indefinido")
    } else {
        dashboardModel.infoMotorista(idVeiculo)
            .then(
                function (resultado) {
                    res.json(resultado)
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar a lista de informação dos motoristas! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage)
                }
            )
    }
}

function alterarStatusDefeito(req, res) {
    var idSensor = req.body.idSensorServer;

    if (idSensor === undefined) {
        res.status(400).send("Seu idSensor está undefined!");
    } else {
        dashboardModel.alterarStatusDefeito(idSensor)
            .then(resultado => {
                res.json(resultado);
            })
            .catch(erro => {
                console.log(erro);
                console.log("\nHouve um erro ao altera o status do sensor! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function listarVeiculos(req, res) {
    var idTransportadora = req.params.id

    if (idTransportadora == undefined) {
        res.status(400).sendo("Seu idFUncionario está indefinido")
    } else {
        dashboardModel.listarVeiculos(idTransportadora)
            .then(
                function (resultado) {
                    res.json(resultado)
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar a lista de informação dos motoristas! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage)
                }
            )
    }
}

function listarSensoresDefeito(req, res) {
    var idVeiculo = req.params.id

    if (idVeiculo == undefined) {
        res.status(400).sendo("Seu idFUncionario está indefinido")
    } else {
        dashboardModel.listarSensoresDefeito(idVeiculo)
            .then(
                function (resultado) {
                    res.json(resultado)
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar a lista de informação dos motoristas! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage)
                }
            )
    }
}

function media_veiculos(req, res) {
    var idVeiculo = req.params.id

    if (idVeiculo == undefined) {
        res.status(400).sendo("Seu idVeiculo está indefinido")
    } else {
        dashboardModel.media_veiculos(idVeiculo)
            .then(
                function (resultado) {
                    res.json(resultado)
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar a busca pela media de temperatura e umidade! Erro: ",
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
    barraPesquisa,
    alertaSensorVrota,
    defeitoSensor,
    infoMotorista,
    alterarStatusDefeito,
    listarVeiculos,
    listarSensoresDefeito,
    media_veiculos
}