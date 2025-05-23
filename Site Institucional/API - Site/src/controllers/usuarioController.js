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
                        emailTransportadora: resultado[0].emailTransportadora_cliente,
                        codigoAtivacao: resultado[0].codigoAtivacao,
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
    var codigo = req.body.resultadoServer;

    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (cnpj == undefined ){
        res.status(400).send("Seu cnpj está undefined!");
    } else if (telefone == undefined){
        res.status(400).send("Seu telefone está undefined!");
    } else if (codigo == undefined){
        res.status(400).send("Seu codigo está undefined!");
    }else {
        usuarioModel.cadastrar_transportadora(nome, email, senha, cnpj, telefone, codigo)
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
    // *** AQUI PRECISAMOS OBTER O ID DA TRANSPORTADORA (fkTransportadora) ***
    // *** Isso depende de como sua aplicação gerencia a sessão/autenticação ***
   var fkTransportadora = req.session.idTransportadora;

    var nome = req.body.nomeServer;
    var cpf = req.body.cpfServer;
    var senha = req.body.senhaServer;

    if (!nome || !cpf || !senha || !fkTransportadora) {
        return res.status(400).send("Preencha todos os campos!");
    }

    usuarioModel.cadastrar_funcionario(fkTransportadora, nome, cpf, senha)
        .then(resultado => {
            res.json(resultado);
        })
        .catch(erro => {
            console.error("Erro ao cadastrar funcionário:", erro);
            res.status(500).json(erro.sqlMessage);
        });
}


function codigo(req, res){

    usuarioModel.codigo()
    .then(function (resultado) {
        console.log(resultado)
        if (resultado) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar codigos: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    logar,
    logar_transportadora,
    cadastrar_transportadora,
    cadastrar_funcionario,
    codigo
};