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

function codigo(req, res) {
    usuarioModel.codigo()
        .then(resultado => {
            if (resultado.length > 0) {
                res.json(resultado);
            } else {
                res.status(404).send("Nenhum código encontrado.");
            }
        })
        .catch(erro => {
            console.log("Erro ao buscar códigos: ", erro);
            res.status(500).json(erro.sqlMessage || erro);
        });
}

function cadastrar_funcionario(req, res) {
    // Coleta o nome do funcionário do corpo da requisição
    var nome = req.body.nomeServer;
    // Coleta o CPF do funcionário do corpo da requisição
    var cpf = req.body.cpfServer;
    // Coleta a senha do funcionário do corpo da requisição
    var senha = req.body.senhaServer;
    // Coleta o código de ativação do corpo da requisição
    var codigoAtivacao = req.body.codigoAtivacaoServer;

    // Valida se todos os campos necessários foram recebidos
    if (!nome || !cpf || !senha || !codigoAtivacao) {
        // Retorna um status 400 (Bad Request) com uma mensagem de erro
        return res.status(400).json({ message: "Preencha todos os campos!" });
    }

    
    // Chama o model para obter o ID da transportadora com base no código de ativação
    usuarioModel.obterIdTransportadoraPorCodigo(codigoAtivacao)
        .then(transportadoraResultado => {
            // Verifica se uma transportadora foi encontrada para o código de ativação
            if (transportadoraResultado.length > 0) {
                // Extrai o ID da transportadora do resultado da busca
                const fkTransportadora = transportadoraResultado[0].idTransportadora_cliente;

                // Chama o model para cadastrar o funcionário com o ID da transportadora, nome, CPF e senha
                usuarioModel.cadastrar_funcionario(fkTransportadora, nome, cpf, senha)
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
            } else {
                // Retorna um status 404 (Not Found) se o código de ativação for inválido
                res.status(404).json({ message: "Código de ativação inválido ou não encontrado." });
            }
        })
        .catch(erro => {
            // Loga o erro no console do servidor se houver problema na busca da transportadora
            console.error("Erro ao buscar transportadora pelo código de ativação:", erro);
            // Retorna um status 500 (Internal Server Error) com uma mensagem de erro
            res.status(500).json({ message: "Erro ao verificar código de ativação.", error: erro.sqlMessage || erro });
        });
}



module.exports = {
    logar,
    logar_transportadora,
    cadastrar_transportadora,
    cadastrar_funcionario,
    codigo 
};