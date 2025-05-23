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


function cadastrar_transportadora(nome, email, senha, cnpj, telefone, codigo) {
  var instrucaoSql = `
    INSERT INTO transportadora_cliente (nomeTransportadora_cliente, emailTransportadora_cliente, senhaTransportadora_cliente, cnpjTransportadora_cliente, telefoneTransportadora_cliente, codigoAtivacao)
    VALUES 
    ('${nome}', '${email}', '${senha}', '${cnpj}', '${telefone}', '${codigo}');
  `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql)
  return database.executar(instrucaoSql);
}

function cadastrar_funcionario(nome, cpf, senha) {
  var instrucaoSql = `
    INSERT INTO funcionario (fkTransportadora, nomeFuncionario, cpfFuncionario, senhaAcesso)
    VALUES 
    ('${nome}', '${cpf}', '${senha}');
  `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql)
  return database.executar(instrucaoSql);
}


module.exports = {
    logar,
    cadastrar_transportadora,
    cadastrar_funcionario
}

