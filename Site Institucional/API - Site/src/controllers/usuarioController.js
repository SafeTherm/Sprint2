var usuarioModel = require("../models/usuarioModel")

function logar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está indefinido");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinda");
    } else {
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
                    });
                } else {
                    res.status(403).send("Email e/ou senhas inválidos");
                }
            })
            .catch(erro => {
                console.log(erro);
                console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}



function logar_transportadora(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está indefinido");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinda");
    } else {
        usuarioModel.logar_transportadora(email, senha)
            .then((resultado) => {
                if (resultado.length > 0) {
                    res.json({
                        idTransportadora: resultado[0].idTransportadora_cliente,
                        nomeTransportadora: resultado[0].nomeTransportadora_cliente,
                        emailTransportadora: resultado[0].emailTransportadora_cliente
                    });
                } else {
                    res.status(403).send("Email e/ou senhas inválidos");
                }
            })
            .catch(erro => {
                console.log(erro);
                console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function cadastrar_transportadora(req, res) {
    var nome = req.body.nomeServer;
    var cnpj = req.body.cnpjServer;
    var telefone = req.body.telServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (cnpj == undefined) {
        res.status(400).send("Seu cnpj está undefined!");
    } else if (telefone == undefined) {
        res.status(400).send("Seu telefone está undefined!");
    } else {
        usuarioModel.cadastrar_transportadora(nome, email, senha, cnpj, telefone)
            .then(resultado => {
                res.json(resultado);
            })
            .catch(erro => {
                console.log(erro);
                console.log("\nHouve um erro ao realizar o cadastro! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function cadastrar_funcionario(req, res) {

    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var tel = req.body.telServer;
    var cpf = req.body.cpfServer;
    var senha = req.body.senhaServer;
    var fkTransportadora_cliente = req.body.fkTransportadoraServer;

    // Valida se todos os campos necessários foram recebidos
    if (!nome || !cpf || !senha || !fkTransportadora_cliente) {
        // Retorna um status 400 (Bad Request) com uma mensagem de erro
        return res.status(400).json({ message: "Preencha todos os campos!" });
    }

    usuarioModel.cadastrar_funcionario(fkTransportadora_cliente, email, nome, cpf, tel, senha)
        .then(resultado => {
            // Retorna o resultado do cadastro do funcionário em JSON
            res.json(resultado);
        })
        .catch(erro => {
            // Loga o erro no console do servidor
            console.error("Erro ao cadastrar funcionário:", erro);
            // Retorna um status 500 (Internal Server Error) com uma mensagem de erro
            res.status(500).json({ message: "Erro ao cadastrar funcionário.", error: erro.sqlMessage || erro });
        });
}



module.exports = {
    logar,
    logar_transportadora,
    cadastrar_transportadora,
    cadastrar_funcionario
};