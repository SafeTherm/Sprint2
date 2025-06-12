var database = require("../database/config")



function listarVeiculos(idTransportadora) {
  var instrucaoSql = `
  SELECT f.nomeFuncionario, v.idVeiculo, v.placaVeiculo, v.modelo from funcionario f JOIN veiculo v 
  ON v.fkFuncionario = f.idFuncionario 
  WHERE f.fkTransportadora_cliente = ${idTransportadora}
  ORDER BY f.nomeFuncionario ASC;`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql)
  return database.executar(instrucaoSql);
}

function listarVeiculosPesquisa(idTransportadora, conteudo_pesquisa) {
  var instrucaoSql = `
  SELECT f.nomeFuncionario, v.idVeiculo, v.placaVeiculo, v.modelo from funcionario f JOIN veiculo v 
  ON v.fkFuncionario = f.idFuncionario 
  WHERE f.fkTransportadora_cliente = ${idTransportadora} AND v.placaVeiculo LIKE '%${conteudo_pesquisa}%'
  ORDER BY f.nomeFuncionario ASC;`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql)
  return database.executar(instrucaoSql);
}

function select_listarFuncionario(idTransportadora) {
  var instrucaoSql = `
  SELECT * FROM funcionario WHERE fkTransportadora_cliente = ${idTransportadora}`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql)
  return database.executar(instrucaoSql);
}

function cadastrarVeiculo(idTransportadora, idFuncionario, placa, modelo) {
  var instrucaoSql = `
  INSERT INTO veiculo (fkTransportadora_cliente, fkFuncionario, placaVeiculo, modelo) VALUES
  (${idTransportadora}, ${idFuncionario}, '${placa}', '${modelo}')`;

  return database.executar(instrucaoSql).then(resultado => {
    console.log("Resultado completo do insert:", resultado);
    return { idVeiculo: resultado.insertId }; // ou resultado[0].insertId se for array
  });
}

function cadastrarSensorVeiculo(idVeiculo) {
  var instrucaoSql = `
  INSERT INTO sensor (fkVeiculo, tipoSensor, funcaoSensor, localizacao, statusSensor) VALUES
  (${idVeiculo}, 'LM35', 'TEMPERATURA', 'SUPERIOR', 'ATIVO'),
  (${idVeiculo}, 'DHT11', 'UMIDADE', 'SUPERIOR', 'ATIVO'),
  (${idVeiculo}, 'LM35', 'TEMPERATURA', 'INFERIOR', 'ATIVO'),
  (${idVeiculo}, 'DHT11', 'UMIDADE', 'INFERIOR', 'ATIVO');`;

  console.log("Executando a instrução SQL:\n" + instrucaoSql);
  return database.executar(instrucaoSql).then(resultado => {
    return { idVeiculo: resultado.insertId };
  });
}

// Atualize o module.exports para incluir a nova função
module.exports = {
  listarVeiculos,
  listarVeiculosPesquisa,
  select_listarFuncionario,
  cadastrarVeiculo,
  cadastrarSensorVeiculo
};