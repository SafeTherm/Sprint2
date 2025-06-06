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

function umidadeHistorico(idVeiculo){
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
function temperaturaHistorico(idVeiculo){
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

// Atualize o module.exports para incluir a nova função
module.exports = {
  infosUser,
  umidadeHistorico,
  temperaturaHistorico
};