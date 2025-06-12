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



function veiculoTemperatura(req, res){
    var idVeiculo = req.params.id

    if (idVeiculo == undefined) {
        res.status(400).sendo("o de idVeiculo está indefinido para acessar informações da dash")
    } else {
        dashboardUserModel.veiculoTemperatura(idVeiculo)
            .then(
                function (resultado) {
                    res.json(resultado)
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao carregar ids de temperatura! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage)
                }
            )
    }

}
function veiculoUmidade(req, res){
    var idVeiculo = req.params.id

    if (idVeiculo == undefined) {
        res.status(400).sendo("o de idVeiculo está indefinido para acessar informações da dash")
    } else {
        dashboardUserModel.veiculoUmidade(idVeiculo)
            .then(
                function (resultado) {
                    res.json(resultado)
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao carregar ids de temperatura! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage)
                }
            )
    }

}

function graficTempSup(req, res){
    var idSensor = req.params.id

    if (idSensor == undefined) {
        res.status(400).sendo("o de idSensor está indefinido para acessar informações da dash")
    } else {
        dashboardUserModel.graficTempSup(idSensor)
            .then(
                function (resultado) {
                    res.json(resultado)
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao carregar dados do sensor temperatura sup! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage)
                }
            )
    }

}
function graficUmiSup(req, res){
    var idSensor = req.params.id

    if (idSensor == undefined) {
        res.status(400).sendo("o de idSensor está indefinido para acessar informações da dash")
    } else {
        dashboardUserModel.graficUmiSup(idSensor)
            .then(
                function (resultado) {
                    res.json(resultado)
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao carregar dados do sensor umidade sup! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage)
                }
            )
    }

}

function graficTempInf(req, res){
    var idSensor = req.params.id

    if (idSensor == undefined) {
        res.status(400).sendo("o de idSensor está indefinido para acessar informações da dash")
    } else {
        dashboardUserModel.graficTempInf(idSensor)
            .then(
                function (resultado) {
                    res.json(resultado)
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao carregar dados do sensor temperatura Inf! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage)
                }
            )
    }

}
function graficUmiInf(req, res){
    var idSensor = req.params.id

    if (idSensor == undefined) {
        res.status(400).sendo("o de idSensor está indefinido para acessar informações da dash")
    } else {
        dashboardUserModel.graficUmiInf(idSensor)
            .then(
                function (resultado) {
                    res.json(resultado)
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao carregar dados do sensor umidade inf! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage)
                }
            )
    }

}
function verificarCaptura(req, res){
    var idSensor = req.params.id

    if (idSensor == undefined) {
        res.status(400).sendo("o idSensor está indefinido para acessar informações da dash")
    } else {
        dashboardUserModel.verificarCaptura(idSensor)
            .then(
                function (resultado) {
                    res.json(resultado)
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao carregar dados de captura dos sensores! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage)
                }
            )
    }
}
function verificarRota(req, res){
    var idSensor = req.params.id

    if (idSensor == undefined) {
        res.status(400).sendo("o idSensor está indefinido para acessar informações da dash")
    } else {
        dashboardUserModel.verificarRota(idSensor)
            .then(
                function (resultado) {
                    res.json(resultado)
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao carregar dados de captura dos sensores! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage)
                }
            )
    }

}


function capturaDosIds(req, res){
    var idSensor = req.params.id

    if (idSensor == undefined) {
        res.status(400).sendo("o idSensor está indefinido para acessar informações da dash")
    } else {
        dashboardUserModel.capturaDosIds(idSensor)
            .then(
                function (resultado) {
                    res.json(resultado)
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao carregar dados de captura dos sensores! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage)
                }
            )
    }

}



function atualizandoStatus(req, res) {
    var idSensor = req.body.idSensorServer;

    if (idSensor === undefined) {
        res.status(400).send("Seu idSensor está undefined!");
    } else {
        dashboardUserModel.atualizandoStatus(idSensor)
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






module.exports = {
    infosUser,
    umidadeHistorico,
    temperaturaHistorico,
    veiculoTemperatura, 
    veiculoUmidade,
    graficTempSup,
    graficUmiSup,
    graficTempInf,
    graficUmiInf,
    verificarCaptura,
    atualizandoStatus,
    capturaDosIds,
    verificarRota
}