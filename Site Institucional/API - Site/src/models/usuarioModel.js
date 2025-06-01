var database = require("../database/config")

function logar(email, senha) {
  console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)

  var instrucaoSql = `
    SELECT * FROM funcionario where 
    emailFuncionario = "${email}" and 
    senhaAcesso = "${senha}";`

  console.log("Executando a instrução SQL: \n" + instrucaoSql)
  return database.executar(instrucaoSql)
}


function codigo() {

  console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function codigo()")


  var instrucaoSql = `
    select codigoAtivacao from transportadora_cliente;
  `

  console.log("Executando a instrução SQL: \n" + instrucaoSql)
  return database.executar(instrucaoSql)
}


function logar_transportadora(email, senha) {
  console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)

  var instrucaoSql = `
    SELECT * FROM transportadora_cliente where 
    emailTransportadora_cliente = "${email}" and 
    senhaTransportadora_cliente = "${senha}";`

  console.log("Executando a instrução SQL: \n" + instrucaoSql)
  return database.executar(instrucaoSql)
}

function cadastrar_transportadora(nome, email, senha, cnpj, telefone) {
  var instrucaoSql = `
    INSERT INTO transportadora_cliente (nomeTransportadora_cliente, emailTransportadora_cliente, senhaTransportadora_cliente, 
    cnpjTransportadora_cliente, telefoneTransportadora_cliente) VALUES 
    ('${nome}', '${email}', '${senha}', '${cnpj}', '${telefone}');
  `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql)
  return database.executar(instrucaoSql);
}

function cadastrar_funcionario(fkTransportadora_cliente, email, nome, cpf, tel, senha) {
  var instrucaoSql = `
    INSERT INTO funcionario (fkTransportadora_cliente, emailFuncionario, nomeFuncionario, cpfFuncionario, telefoneFuncionario, senhaAcesso)
    VALUES 
    ('${fkTransportadora_cliente}', '${email}', '${nome}', '${cpf}', '${tel}', '${senha}');
  `;

  console.log("Executando a instrução SQL: \n" + instrucaoSql)
  return database.executar(instrucaoSql);
}

// Adicione esta nova função em usuarioModel.js
function obterIdTransportadoraPorCodigo(codigo) {
  // Loga que a função foi acessada e o código que está sendo verificado
  console.log("ACESSEI O USUARIO MODEL > obterIdTransportadoraPorCodigo \n\t\t >> Verificando o código de ativação: ", codigo);

  // Constrói a instrução SQL para selecionar o ID da transportadora pelo código de ativação
  var instrucaoSql = `
        SELECT idTransportadora_cliente FROM transportadora_cliente WHERE codigoAtivacao = '${codigo}';
    `;

  // Loga a instrução SQL que será executada
  console.log("Executando a instrução SQL para obter ID da transportadora: \n" + instrucaoSql);
  // Executa a instrução SQL no banco de dados
  return database.executar(instrucaoSql);
}

// Atualize o module.exports para incluir a nova função
module.exports = {
  logar,
  logar_transportadora,
  cadastrar_transportadora,
  cadastrar_funcionario,
  codigo,
  obterIdTransportadoraPorCodigo // Adicione esta linha
};