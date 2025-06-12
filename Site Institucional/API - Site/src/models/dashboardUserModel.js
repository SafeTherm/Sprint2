var database = require("../database/config")



function infosUser(idUsuarioSelect) {
  var instrucaoSql = `
  select f.nomeFuncionario, f.emailFuncionario, 
f.telefoneFuncionario, v.placaVeiculo, v.modelo 
from funcionario as f
join veiculo as v on idFuncionario = fkFuncionario
where idFuncionario = ${idUsuarioSelect};`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql)
  return database.executar(instrucaoSql);
}

function umidadeHistorico(idVeiculo) {
  var instrucaoSql = `
    select dataHora, placaVeiculo, s.tipoSensor ,l.valor from leitura_sensor as l
    join sensor as s on l.fkSensor = s.idSensor
    join veiculo as v on v.idVeiculo = s.fkVeiculo
    where v.idVeiculo = ${idVeiculo} and s.tipoSensor = 'DHT11'
    order by l.dataHora desc;
  `;

  console.log("Executando a instrução SQL para O historico de umidade: \n" + instrucaoSql)
  return database.executar(instrucaoSql);
}
function temperaturaHistorico(idVeiculo) {
  var instrucaoSql = `
    select dataHora, placaVeiculo, s.tipoSensor ,l.valor from leitura_sensor as l
    join sensor as s on l.fkSensor = s.idSensor
    join veiculo as v on v.idVeiculo = s.fkVeiculo
    where v.idVeiculo = ${idVeiculo} and s.tipoSensor = 'LM35'
    order by l.dataHora desc;
  `;
  console.log("Executando a instrução SQL para O historico de temperatura: \n" + instrucaoSql)
  return database.executar(instrucaoSql);
}


function veiculoTemperatura(idVeiculo) {
  var instrucaoSql = `
    select s.idSensor, s.tipoSensor from leitura_sensor as l
      JOIN sensor as s
      on l.fkSensor = s.idSensor
      JOIN veiculo as v
      on s.fkVeiculo = v.idVeiculo
    where v.idVeiculo = ${idVeiculo} and s.tipoSensor = 'LM35';
  `

  console.log("Executando a instrução SQL para capturar id do sensor de temperatura: \n" + instrucaoSql)
  return database.executar(instrucaoSql);

}

function veiculoUmidade(idVeiculo) {
  var instrucaoSql = `
    select s.idSensor, s.tipoSensor from leitura_sensor as l
      JOIN sensor as s
      on l.fkSensor = s.idSensor
      JOIN veiculo as v
      on s.fkVeiculo = v.idVeiculo
    where v.idVeiculo = ${idVeiculo} and s.tipoSensor = 'DHT11';
  `

  console.log("Executando a instrução SQL para capturar id do sensor de umidade: \n" + instrucaoSql)
  return database.executar(instrucaoSql);

}


function graficTempSup(idSensor) {
  var instrucaoSql = `
        select 
          s.idSensor, s.tipoSensor, 
          s.localizacao, s.statusSensor, l.valor,
            l.dataHora
        from leitura_sensor as l
          JOIN sensor as s
            on l.fkSensor = s.idSensor
        where s.idSensor = ${idSensor} AND s.localizacao = "Superior"
        order by l.idLeitura  DESC
        limit 6;
      `
  console.log("Executando a instrução SQL para capturar dados do sensor de temperatura para o grafico superior: \n" + instrucaoSql)
  return database.executar(instrucaoSql)
}


function graficUmiSup(idSensor) {
  var instrucaoSql = `
        select 
          s.idSensor, s.tipoSensor, 
          s.localizacao, s.statusSensor, l.valor,
            l.dataHora
        from leitura_sensor as l
          JOIN sensor as s
            on l.fkSensor = s.idSensor
        where s.idSensor = ${idSensor} AND s.localizacao = "Superior"
        order by l.idLeitura  DESC
        limit 6;
      `
  console.log("Executando a instrução SQL para capturar dados do sensor de umidade para o grafico superior: \n" + instrucaoSql)
  return database.executar(instrucaoSql)
}

function graficTempInf(idSensor) {
  var instrucaoSql = `
        select 
          s.idSensor, s.tipoSensor, 
          s.localizacao, s.statusSensor, l.valor,
            l.dataHora
        from leitura_sensor as l
          JOIN sensor as s
            on l.fkSensor = s.idSensor
        where s.idSensor = ${idSensor} AND s.localizacao = "Inferior"
        order by l.idLeitura  DESC
        limit 6;
      `
  console.log("Executando a instrução SQL para capturar dados do sensor de temperatura para o grafico inferior: \n" + instrucaoSql)
  return database.executar(instrucaoSql)
}

function graficUmiInf(idSensor) {
  var instrucaoSql = `
        select 
          s.idSensor, s.tipoSensor, 
          s.localizacao, s.statusSensor, l.valor,
            l.dataHora
        from leitura_sensor as l
          JOIN sensor as s
            on l.fkSensor = s.idSensor
        where s.idSensor = ${idSensor} AND s.localizacao = "Inferior"
        order by l.idLeitura  DESC
        limit 6;
      `
  console.log("Executando a instrução SQL para capturar dados do sensor de umidade para o grafico inferior: \n" + instrucaoSql)
  return database.executar(instrucaoSql)
}



function verificarCaptura(idSensor) {
  var instrucaoSql = `
      SELECT * 
      FROM leitura_sensor
      WHERE dataHora >= NOW() - INTERVAL 3 SECOND AND fkSensor = ${idSensor};
    `;

    console.log("Executando a instrução SQL para capturar se está tendo tendo insert dos dados: \n" + instrucaoSql)
    return database.executar(instrucaoSql)

}



function atualizandoStatus(idSensor) {
  var instrucaoSql = `
    UPDATE sensor SET statusSensor = 'MANUTENCAO' WHERE idSensor = ${idSensor};`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql)
  return database.executar(instrucaoSql);
}







// Atualize o module.exports para incluir a nova função
module.exports = {
  infosUser,
  umidadeHistorico,
  temperaturaHistorico,
  veiculoTemperatura,
  veiculoUmidade,
  graficTempSup,
  graficUmiSup,
  graficTempInf,
  graficUmiInf,
  verificarCaptura,
  atualizandoStatus
};