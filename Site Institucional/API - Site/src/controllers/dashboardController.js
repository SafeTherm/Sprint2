var dashboardModel = require("../models/dashboardModel");

function obterGraficoTemperatura(req, res) {
    dashboardModel.obterGraficoTemperatura()
    .then(function (resultado) {
        console.log(resultado)
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar o sensor temperatura ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}



module.exports = {
    obterGraficoTemperatura

}