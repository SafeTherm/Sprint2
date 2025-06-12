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
    HAVING MAX(l.dataHora) >= NOW() - INTERVAL 2 MINUTE
) AS veiculosAtivos;`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql)
  return database.executar(instrucaoSql)
}

function barraPesquisa(idTransportadora, conteudo_pesquisa) {
  var instrucaoSql = `
 SELECT f.idFuncionario, f.nomeFuncionario, f.imagemPerfil_funcionario,  v.idVeiculo, v.placaVeiculo, v.modelo FROM funcionario as f JOIN veiculo as v on f.idFuncionario = v.fkFuncionario
	WHERE f.fkTransportadora_cliente = ${idTransportadora} AND f.nomeFuncionario LIKE '%${conteudo_pesquisa}%';`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql)
  return database.executar(instrucaoSql)
}

function alertaSensorVrota(idTransportadora) {
  var instrucaoSql = `
       SELECT v.idVeiculo
      FROM veiculo v
      JOIN sensor s ON v.idVeiculo = s.fkVeiculo
      JOIN leitura_sensor l ON s.idSensor = l.fkSensor
      WHERE v.fkTransportadora_cliente = ${idTransportadora}
        AND l.dataHora >= NOW() - INTERVAL 2 MINUTE
      GROUP BY v.idVeiculo;`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql)
  return database.executar(instrucaoSql)
}

function defeitoSensor(idVeiculo) {
  var instrucaoSql = `
          SELECT 
              fkVeiculo,
              idSensor,
              tipoSensor,
              funcaoSensor,
              localizacao,
              statusSensor,
              MAX(l.dataHora) AS ultimaLeitura,
              CASE 
                  WHEN MAX(l.dataHora) IS NULL OR MAX(l.dataHora) < NOW() - INTERVAL 2 MINUTE 
                      THEN 'COM DEFEITO'
                  ELSE 'ATIVO' END AS statusSensorCase FROM sensor 
          	LEFT JOIN leitura_sensor l ON l.fkSensor = idSensor
          	WHERE fkVeiculo = ${idVeiculo}
          	GROUP BY idSensor;`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql)
  return database.executar(instrucaoSql)
}

function infoMotorista(idVeiculo) {
  var instrucaoSql = `
    SELECT f.idFuncionario,
      f.nomeFuncionario, 
      f.imagemPerfil_funcionario,
      v.placaVeiculo,
      v.modelo FROM funcionario as f JOIN veiculo as v 
       ON v.fkFuncionario = f.idFuncionario
     WHERE v.idVeiculo = ${idVeiculo};`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql)
  return database.executar(instrucaoSql)
}

function alterarStatusDefeito(idSensor) {
  var instrucaoSql = `
    UPDATE sensor SET statusSensor = 'MANUTENCAO' WHERE idSensor = ${idSensor};`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql)
  return database.executar(instrucaoSql);
}

function listarVeiculos(idTransportadora) {
  var instrucaoSql = `
    SELECT f.nomeFuncionario, f.imagemPerfil_funcionario, v.idVeiculo, v.placaVeiculo, v.modelo
	  FROM funcionario AS f 
    JOIN veiculo AS v ON v.fkFuncionario = f.idFuncionario 
    WHERE f.fkTransportadora_cliente = ${idTransportadora};`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql)
  return database.executar(instrucaoSql)
}

function listarSensoresDefeito(idVeiculo) {
  var instrucaoSql = `
    SELECT * FROM sensor WHERE fkVeiculo = ${idVeiculo}`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql)
  return database.executar(instrucaoSql)
}

function media_veiculos(idVeiculo) {
  var instrucaoSql = `
    SELECT 
    v.idVeiculo,
    v.placaVeiculo,
    NOW() AS data_consulta,
    AVG(CASE WHEN s.funcaoSensor = 'TEMPERATURA' THEN ls.valor END) AS media_temperatura,
    AVG(CASE WHEN s.funcaoSensor = 'UMIDADE' THEN ls.valor END) AS media_umidade
FROM veiculo v
JOIN sensor s ON v.idVeiculo = s.fkVeiculo
JOIN leitura_sensor ls ON s.idSensor = ls.fkSensor
WHERE 
    v.idVeiculo = ${idVeiculo}
    AND ls.dataHora >= NOW() - INTERVAL 5 MINUTE
GROUP BY v.idVeiculo, v.placaVeiculo;`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql)
  return database.executar(instrucaoSql)
}

function notificacao_recente(idTransportadora) {
  var instrucaoSql = `
      SELECT 
      a.idAlerta,
      a.tipoAlerta,
      a.descricao,
      DATE_FORMAT(a.dataAlerta, '%d/%m/%Y %H:%i') AS dataHoraAlerta,
      v.idVeiculo,
      v.placaVeiculo,
      s.localizacao
  FROM alerta a
  JOIN leitura_sensor ls ON a.fkLeitura = ls.idLeitura
  JOIN sensor s ON ls.fkSensor = s.idSensor
  JOIN veiculo v ON s.fkVeiculo = v.idVeiculo
  JOIN transportadora_cliente t ON v.fkTransportadora_cliente = t.idTransportadora_cliente
  WHERE a.dataAlerta >= NOW() - INTERVAL 30 MINUTE
    AND t.idTransportadora_cliente = ${idTransportadora}
  ORDER BY a.dataAlerta DESC LIMIT 10;`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql)
  return database.executar(instrucaoSql)
}

// Atualize o module.exports para incluir a nova função
module.exports = {
  listarFrota,
  emRota,
  barraPesquisa,
  alertaSensorVrota,
  defeitoSensor,
  infoMotorista,
  alterarStatusDefeito,
  listarVeiculos,
  listarSensoresDefeito,
  media_veiculos,
  notificacao_recente
};








