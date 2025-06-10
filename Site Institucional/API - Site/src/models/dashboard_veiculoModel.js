var database = require("../database/config")



function listarVeiculos(idTransportadora) {
  var instrucaoSql = `
  SELECT f.nomeFuncionario, v.placaVeiculo, v.modelo from funcionario f JOIN veiculo v 
  ON v.fkFuncionario = f.idFuncionario 
  WHERE f.fkTransportadora_cliente = ${idTransportadora}
  ORDER BY f.nomeFuncionario ASC;`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql)
  return database.executar(instrucaoSql);
}

function listarVeiculosPesquisa(idTransportadora, conteudo_pesquisa) {
  var instrucaoSql = `
  SELECT f.nomeFuncionario, v.placaVeiculo, v.modelo from funcionario f JOIN veiculo v 
  ON v.fkFuncionario = f.idFuncionario 
  WHERE f.fkTransportadora_cliente = ${idTransportadora} AND v.placaVeiculo LIKE '%${conteudo_pesquisa}%'
  ORDER BY f.nomeFuncionario ASC;`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql)
  return database.executar(instrucaoSql);
}

// Atualize o module.exports para incluir a nova função
module.exports = {
  listarVeiculos,
  listarVeiculosPesquisa
};