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


// Atualize o module.exports para incluir a nova função
module.exports = {
  infosUser
};