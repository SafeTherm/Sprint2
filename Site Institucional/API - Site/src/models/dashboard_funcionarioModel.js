var database = require("../database/config")



function listarFuncionarios(idTransportadora) {
  var instrucaoSql = `
  SELECT * FROM funcionario WHERE fkTransportadora_cliente = ${idTransportadora} ORDER BY nomeFuncionario ASC;`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql)
  return database.executar(instrucaoSql);
}

function listarFuncionariosPesquisa(idTransportadora, conteudo_pesquisa) {
  var instrucaoSql = `
  SELECT * FROM funcionario WHERE fkTransportadora_cliente = ${idTransportadora} 
    AND nomeFuncionario LIKE "%${conteudo_pesquisa}%" ORDER BY nomeFuncionario ASC;`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql)
  return database.executar(instrucaoSql);
}

function listarVeiculosFuncionario(idFuncionario) {
  var instrucaoSql = `
  SELECT * FROM veiculo WHERE fkFuncionario = ${idFuncionario}`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql)
  return database.executar(instrucaoSql);
}

function excluirSensor(idVeiculo) {
  var instrucaoSql = `
  DELETE FROM sensor WHERE fkVeiculo = ${idVeiculo};`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql)
  return database.executar(instrucaoSql);
}

function excluirVeiculo(idVeiculo) {
  var instrucaoSql = `DELETE FROM veiculo WHERE idVeiculo = ${idVeiculo}`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql)
  return database.executar(instrucaoSql);
}

function excluirFuncionario(idFuncionario) {
  var instrucaoSql = `
  DELETE FROM funcionario WHERE idFuncionario = ${idFuncionario};`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql)
  return database.executar(instrucaoSql);
}

function cadastrarFuncionario(idTransportadora, email, nome, cpf, telefone, imagem) {
  var instrucaoSql = `
  INSERT INTO funcionario (fkTransportadora_cliente, emailFuncionario, nomeFuncionario, cpfFuncionario,
  telefoneFuncionario, imagemPerfil_funcionario) VALUES
    (${idTransportadora}, '${email}', '${nome}', '${cpf}', '${telefone}', '${imagem}')`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql)
  return database.executar(instrucaoSql)
}


// Atualize o module.exports para incluir a nova função
module.exports = {
  listarFuncionarios,
  listarFuncionariosPesquisa,
  excluirSensor,
  listarVeiculosFuncionario,
  excluirVeiculo,
  excluirFuncionario,
  cadastrarFuncionario
};