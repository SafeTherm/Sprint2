CREATE DATABASE transporte_de_medicamentos_termolabeis;
USE transporte_de_medicamentos_termolabeis;


CREATE TABLE transportadora_cliente (
idTransportadora_cliente INT PRIMARY KEY AUTO_INCREMENT,
nomeTransportadora_cliente VARCHAR(60),
cnpjTransportadora_cliente CHAR(14),
telefoneTransportadora_cliente CHAR(13),
emailTransportadora_cliente VARCHAR(60),
CONSTRAINT chkTel
	CHECK (telefoneTransportadora_cliente like '__-____-____'),
CONSTRAINT chkEmailTransportadora
	CHECK (emailTransportadora_cliente like '%@%.com')
);

 CREATE TABLE funcionario (
 idFuncionario INT,
 fkTransportadora INT,
 CONSTRAINT pkCoposta 
	PRIMARY KEY (idFuncionario, fkTransportadora),
 CONSTRAINT fkFuncionarioEmpresa
	FOREIGN KEY (fkTransportadora)
		REFERENCES transportadora_cliente(idTransportadora_cliente),
 nomeFuncionario VARCHAR(60),
 cargoFuncionario CHAR(18),
 cpfFuncionario CHAR(11),
 emailFucionarioPessoal VARCHAR(60),
 telefoneFuncionario VARCHAR(14),
 CONSTRAINT chkCargo
	CHECK (cargoFuncionario IN ('Representante', 'Motorista')),
 CONSTRAINT chkTel1
	CHECK (telefoneFuncionario like '__-_____-____'),
CONSTRAINT chkEmail1
	CHECK (emailFucionarioPessoal like '%@%.com'),
 cep CHAR(8)
 );
 
 
 CREATE TABLE login (
 idLogin INT,
 fkFuncionario INT,
 CONSTRAINT pkComposta1
	PRIMARY KEY (idLogin, fkFuncionario),
CONSTRAINT fkFuncionarioLogin
	FOREIGN KEY (fkFuncionario)
		REFERENCES funcionario(idFuncionario),
emailLogin VARCHAR(60),
CONSTRAINT chkEmail2
	CHECK (emaillogin like '%@%.com'),
senhaAcesso VARCHAR(20)
);

CREATE TABLE carga (
idCarga INT PRIMARY KEY AUTO_INCREMENT,
embalagem VARCHAR(50),
dtRetirada DATE,
dtEntrega DATE,
fabricante VARCHAR(45)
);

CREATE TABLE veiculo (
idVeiculo INT PRIMARY KEY,
fkEmpresaTransportadora INT,
fkVeiculoFuncionario INT,
fkCargaVeiculo INT,
placaVeiculo CHAR(10),
modelo VARCHAR(25),
CONSTRAINT fkVeiculoEmpresa
	FOREIGN KEY (fkEmpresaTransportadora)
		REFERENCES transportadora_cliente(idTransportadora_cliente),
        
CONSTRAINT fkVeiculoFuncionario
	FOREIGN KEY (fkVeiculoFuncionario)
		REFERENCES funcionario(idFuncionario),
        
CONSTRAINT fkVeiculoCargo
	FOREIGN KEY (fkCargaVeiculo)
		REFERENCES carga(idCarga)
);

CREATE TABLE sensor (
idSensor INT PRIMARY KEY AUTO_INCREMENT,
tipoSensor CHAR(12),
CONSTRAINT chkTipoSensor
	CHECK (tipoSensor IN ('DHT11', 'LM35')),
statusSensor CHAR(10),
CONSTRAINT chkStatus
	CHECK (statusSensor IN ('ATIVO', 'INATIVO')),
dtInstalacaoSensor DATE,
fkVeiculoSensor INT,
CONSTRAINT chkVeiculoSensor
	FOREIGN KEY (fkVeiculoSensor)
		REFERENCES veiculo(idVeiculo)
);

CREATE TABLE dadosSensor (
idDados INT primary key auto_increment,
fkSensor INT,
temperatura DECIMAL(5,2),
umidade DECIMAL(5,2),
dtAlerta DATE,
CONSTRAINT fkSensorDados
	FOREIGN KEY (fkSensor)
		REFERENCES sensor(idSensor)
);

CREATE TABLE unidade (
idUnidade INT,
fkRepresentante INT,
nomeUnidade VARCHAR(60),
cepUnidade CHAR(8),
estado CHAR(5),
telefoneUnidade VARCHAR(13),
emailUnidade VARCHAR(60),
CONSTRAINT chkTel2
	CHECK (telefoneUnidade like '__-____-____'),
CONSTRAINT chkEmail3
	CHECK (emailUnidade like '%@%.com')
);

-- INSERTS

-- INSERT PARA A TABELA 'TRANSPORTADORA CLIENTE'
INSERT INTO transportadora_cliente (nomeTransportadora_cliente, cnpjTransportadora_cliente, telefoneTransportadora_cliente, emailTransportadora_cliente) VALUES
('TransMed Ltda', '12345678000199', '11-3456-7890', 'contato@transmed.com'),
('SaudeLog', '98765432000188', '21-1234-5678', 'atendimento@saudelog.com');

-- INSERT PARA A TABELA 'FUNCIONÁRIO'
INSERT INTO funcionario (idFuncionario, fkTransportadora, nomeFuncionario, cargoFuncionario, cpfFuncionario, emailFucionarioPessoal, telefoneFuncionario, cep)
VALUES 
(1, 1, 'Carlos Silva', 'Representante', '12345678901', 'carlos@exemplo.com', '11-98765-4321', '01001000'),
(2, 1, 'Ana Pereira', 'Motorista', '98765432100', 'ana@exemplo.com', '11-91234-5678', '02002000'),
(3, 2, 'João Oliveira', 'Representante', '45678912300', 'joao@exemplo.com', '21-99876-5432', '03003000'),
(4, 2, 'Luiza Silva', 'Motorista', '98765432100', 'luizasilva@exemplo.com', '11-95554-5558', '06006000');

-- INSERT PARA A TABELA 'LOGIN'
INSERT INTO login (idLogin, fkFuncionario, emailLogin, senhaAcesso)
VALUES 
(1, 1, 'carlos@transmed.com', 'senha123'),
(2, 2, 'ana@transmed.com', 'senha456'),
(3, 3, 'joao@logsaude.com', 'senha789'),
(4, 4, 'luiza@logsaude.com', 'senha999');


-- INSERT PARA A TABELA 'CARGA'
INSERT INTO carga (embalagem, dtRetirada, dtEntrega, fabricante)
VALUES 
('Caixa Térmica 25L', '2025-03-15', '2025-03-16', 'BioPharma'),
('Cooler 18L', '2025-03-20', '2025-03-21', 'MediPack');

-- INSERT PARA A TABELA 'VEÍCULO'
INSERT INTO veiculo (idVeiculo, fkEmpresaTransportadora, fkVeiculoFuncionario, fkCargaVeiculo, placaVeiculo, modelo)
VALUES
(1, 1, 2, 1, 'ABC1D23', 'Fiat Ducato'),
(2, 2, 4, 2, 'XYZ9K87', 'Mercedes Sprinter');

-- INSERT PARA A TABELA 'SENSOR'
INSERT INTO sensor (tipoSensor, statusSensor, dtInstalacaoSensor, fkVeiculoSensor)
VALUES 
('DHT11', 'ATIVO', '2025-01-15', 1),
('LM35', 'ATIVO', '2025-02-20', 2),
('DHT11', 'INATIVO', '2024-12-05', 1),
('LM35', 'INATIVO', '2024-12-06', 2);	

select * from sensor;

-- INSERT PARA A TABELA 'dadoSensor'
INSERT INTO dadosSensor (idDados, fkSensor, temperatura, umidade, dtAlerta)
VALUES 
(1, 1, 5.25, 80.5, '2025-04-01'),
(2, 2, 6.00, 78.0, '2025-04-02'),
(3, 3, 4.85, 82.1, '2025-04-03'),
(4, 4, 6.00, 78.0, '2025-04-02');


-- INSERT PARA A TABELA 'UNIDADE'
INSERT INTO unidade (idUnidade, fkRepresentante, nomeUnidade, cepUnidade, estado, telefoneUnidade, emailUnidade)
VALUES 
(1, 1, 'Unidade 1','05010000', 'SP', '11-3030-3030', 'unidade1@saude.com'),
(2, 3, 'Unidade XPTO','20020000', 'RJ', '21-4040-4040', 'unidade2@saude.com');

-- SELECTS

SELECT * FROM transportadora_cliente;
SELECT * FROM funcionario;
SELECT * FROM login;
SELECT * FROM sensor;
SELECT * FROM dadosSensor;
SELECT * FROM carga;
SELECT * FROM veiculo;
SELECT * FROM unidade;

-- FUNCIONARIOS E SUAS TRANSPORTADORAS
SELECT  f.nomeFuncionario AS "Nome do Funcionário",
f.emailFucionarioPessoal AS "Email Pessoal",
f.cargoFuncionario AS "Cargo do Funcionario",
t.nomeTransportadora_cliente AS "Empresa",
t.emailTransportadora_cliente AS "Email da Empresa",
t.telefoneTransportadora_cliente AS "Telefone da Empresa"
	FROM funcionario AS f
		JOIN transportadora_cliente AS t
		ON f.fkTransportadora = t.idTransportadora_cliente;
    
-- INFORMAÇÕES DOS VEÍCULOS
SELECT  v.placaVeiculo AS "Placa",
v.modelo AS "Modelo",
f.nomeFuncionario AS "Motorista",
t.nomeTransportadora_cliente AS "Empresa",
s.tipoSensor AS "Sensor",
c.embalagem AS "Tipo de Embalagem",
c.fabricante AS "Fabricante"
	FROM veiculo AS v
		JOIN funcionario AS f ON v.fkVeiculoFuncionario = f.idFuncionario
		JOIN transportadora_cliente AS t ON v.fkEmpresaTransportadora = t.idTransportadora_cliente
		JOIN sensor AS s ON v.idVeiculo = s.fkVeiculoSensor
		JOIN carga AS c ON v.fkCargaVeiculo = c.idCarga;
        
-- INFORMAÇÕES DAS CARGAS
SELECT  c.embalagem AS "Embalagem",
c.dtRetirada AS "Data de Retirada",
c.dtEntrega AS "Data de Entrega",
c.fabricante AS "Fabricante",
v.placaVeiculo AS "Veículo Responsável",
t.nomeTransportadora_cliente AS "Empresa Responsável"
	FROM carga AS c
		JOIN veiculo AS v ON v.fkCargaVeiculo = c.idCarga
		JOIN transportadora_cliente AS t ON v.fkEmpresaTransportadora = t.idTransportadora_cliente;
        
-- DADOS DOS SENSORES
SELECT  ds.idDados AS "ID do Alerta",
s.tipoSensor AS "Tipo de Sensor",
ds.temperatura AS "Temperatura",
ds.umidade AS "Umidade",
ds.dtAlerta AS "Data do Alerta"
	FROM dadosSensor AS ds
		JOIN sensor AS s ON ds.fkSensor = s.idSensor;
        
-- UNIDADE E SEUS REPRESENTANTES
SELECT  u.nomeUnidade AS "Nome da Unidade",
u.estado AS "Estado",
u.emailUnidade AS "Email da Unidade",
f.nomeFuncionario AS "Representante",
f.emailFucionarioPessoal AS "Email do Representante"
	FROM unidade AS u
		JOIN funcionario AS f ON u.fkRepresentante = f.idFuncionario;
        
-- LOGIN DOS FUNCIONÁRIOS
SELECT  l.idLogin AS "ID Login",
l.emailLogin AS "Email de Acesso",
f.nomeFuncionario AS "Nome do Funcionário",
t.nomeTransportadora_cliente AS "Empresa"
	FROM login AS l
		JOIN funcionario AS f ON l.fkFuncionario = f.idFuncionario
		JOIN transportadora_cliente AS t ON f.fkTransportadora = t.idTransportadora_cliente;