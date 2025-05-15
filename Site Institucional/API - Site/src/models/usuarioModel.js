var database = require("../database/config")

function logar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)

    var instrucaoSql = `
    SELECT * FROM funcionario where 
    emailFucionarioProfissional = "${email}" and 
    senhaAcesso = "${senha}";`
    
    console.log("Executando a instrução SQL: \n" + instrucaoSql)
    return database.executar(instrucaoSql)
}















module.exports = {
    logar
}

