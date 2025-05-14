var usuarioModel = require("../models/usuarioModel")

function logar(req, res) {

    var email = req.body.emailServer
    var senha = req.body.senhaServer

    if (email == undefined) {
        res.status(400).send("Seu email está indefinido")
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinda")
    }

    else {
        usuarioModel.logar(email, senha)

            .then((resultado) => {
                if (resultado.length > 0) {
                    res.json({
                        idUsuario: resultado[0].idUsuario,
                        email: resultado[0].email,
                        nome: resultado[0].nome,
                        senha: resultado[0].senha,
                        descricao: resultado[0].descricao,
                        imagem_perfil: resultado[0].imagem_perfil
                    })
                } else {
                    res.status(403).send("Email e/ou senhas inválidos")
                }
            }
            ).catch(
                function (erro) {
                    console.log(erro)
                    console.log(
                        "\nHouve um erro ao realizar o login! Erro: ",
                        erro.sqlMessage
                    )
                    res.status(500).json(erro.sqlMessage)
                }
            )
    }

}

module.exports = {
    logar
}