var database = require("../database/config")



function listarFrota(idTransportadora) {
  var instrucaoSql = `
  SELECT COUNT(idVeiculo) AS qtdVeiculo FROM veiculo where fkTransportadora_cliente = ${idTransportadora};`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql)
  return database.executar(instrucaoSql);
}

function emRota(idTransportadora) {
  var instrucaoSql = `
 SELECT COUNT(*) AS veiculosEmRota
FROM (
    SELECT v.idVeiculo
    FROM veiculo v
    JOIN sensor s ON v.idVeiculo = s.fkVeiculo
    JOIN leitura_sensor l ON s.idSensor = l.fkSensor
    WHERE v.fkTransportadora_cliente = ${idTransportadora}
    GROUP BY v.idVeiculo
    HAVING MAX(l.dataHora) >= NOW() - INTERVAL 5 MINUTE
) AS veiculosAtivos;`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql)
  return database.executar(instrucaoSql)
}

function barraPesquisa(idTransportadora) {
  var instrucaoSql = `
 SELECT COUNT(*) AS veiculosEmRota
FROM (
    SELECT v.idVeiculo
    FROM veiculo v
    JOIN sensor s ON v.idVeiculo = s.fkVeiculo
    JOIN leitura_sensor l ON s.idSensor = l.fkSensor
    WHERE v.fkTransportadora_cliente = ${idTransportadora}
    GROUP BY v.idVeiculo
    HAVING MAX(l.dataHora) >= NOW() - INTERVAL 5 MINUTE
) AS veiculosAtivos;`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql)
  return database.executar(instrucaoSql)
}

// Atualize o module.exports para incluir a nova função
module.exports = {
  listarFrota,
  emRota,
  barraPesquisa

};