CREATE DATABASE IF NOT EXISTS transporte_de_medicamentos_termolabeis;
USE transporte_de_medicamentos_termolabeis;

-- Tabela transportadora_cliente
CREATE TABLE transportadora_cliente (
    idTransportadora_cliente INT PRIMARY KEY AUTO_INCREMENT,
    nomeTransportadora_cliente VARCHAR(60) NOT NULL,
    cnpjTransportadora_cliente CHAR(14) NOT NULL UNIQUE,
    telefoneTransportadora_cliente VARCHAR(15) NOT NULL,
    emailTransportadora_cliente VARCHAR(60) NOT NULL UNIQUE,
    senhaTransportadora_cliente VARCHAR(255) NOT NULL,
    logo TEXT,
    dataCriacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chkEmailTransportadora CHECK (emailTransportadora_cliente LIKE '%@%.%')
);

-- Tabela funcionario
CREATE TABLE funcionario (
    idFuncionario INT AUTO_INCREMENT PRIMARY KEY,
    fkTransportadora_cliente INT NOT NULL,
    emailFuncionario VARCHAR(100) NOT NULL UNIQUE,
    nomeFuncionario VARCHAR(60) NOT NULL,
    cpfFuncionario VARCHAR(14) NOT NULL UNIQUE,  -- Formato: 000.000.000-00
    telefoneFuncionario VARCHAR(15) NOT NULL,
    senhaAcesso VARCHAR(255) NOT NULL,
    imagemPerfil_funcionario TEXT,
    dataContratacao DATE,
    CONSTRAINT fkFuncionarioEmpresa FOREIGN KEY (fkTransportadora_cliente) 
        REFERENCES transportadora_cliente(idTransportadora_cliente)
);


-- Tabela veiculo
CREATE TABLE veiculo (
    idVeiculo INT  AUTO_INCREMENT,
    fkTransportadora_cliente INT NOT NULL,
    fkFuncionario INT NOT NULL,
    placaVeiculo VARCHAR(10) NOT NULL UNIQUE,  -- Ex: ABC1D23
    modelo VARCHAR(25) NOT NULL,
    PRIMARY KEY (idVeiculo, fkTransportadora_cliente, fkFuncionário),
    CONSTRAINT dkVeiculoFuncionario FOREIGN KEY (fkFuncionario)
		REFERENCES funcionario(idFuncionario),
    CONSTRAINT fkVeiculoTransportadora FOREIGN KEY (fkTransportadora_cliente) 
        REFERENCES transportadora_cliente(idTransportadora_cliente)
);
SELECT f.nomeFuncionario, f.imagemPerfil_funcionario, v.idVeiculo, v.placaVeiculo, v.modelo
	FROM funcionario AS f JOIN veiculo AS v ON v.fkFuncionario = f.idFuncionario WHERE f.fkTransportadora_cliente = 1;
-- Tabela sensor
CREATE TABLE sensor (
    idSensor INT PRIMARY KEY AUTO_INCREMENT,
    fkVeiculo INT NOT NULL,
    tipoSensor ENUM('DHT11', 'LM35') NOT NULL,
    funcaoSensor ENUM('TEMPERATURA', 'UMIDADE') NOT NULL,
    localizacao VARCHAR(50) NOT NULL COMMENT 'Posição no veículo',
    statusSensor ENUM('ATIVO', 'MANUTENCAO') DEFAULT 'ATIVO',
    dtInstalacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_sensor_veiculo FOREIGN KEY (fkVeiculo) 
        REFERENCES veiculo(idVeiculo)
);

-- Tabela leitura_sensor
CREATE TABLE leitura_sensor (
    idLeitura INT AUTO_INCREMENT PRIMARY KEY,
    fkSensor INT NOT NULL,
    valor DECIMAL(5,2) NOT NULL,
    dataHora DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_leitura_sensor FOREIGN KEY (fkSensor) 
        REFERENCES sensor(idSensor)
);

-- Tabela alerta
CREATE TABLE alerta (
    idAlerta INT AUTO_INCREMENT PRIMARY KEY,
    fkLeitura INT NOT NULL,
    tipoAlerta ENUM('TEMPERATURA_ALTA', 'TEMPERATURA_BAIXA', 'UMIDADE_ALTA', 'UMIDADE_BAIXA') NOT NULL,
    descricao VARCHAR(255),
    dataAlerta DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_alerta_leitura FOREIGN KEY (fkLeitura) 
        REFERENCES leitura_sensor(idLeitura)
);

-- Inserindo dados na tabela transportadora_cliente
INSERT INTO transportadora_cliente (nomeTransportadora_cliente, cnpjTransportadora_cliente, telefoneTransportadora_cliente, emailTransportadora_cliente, senhaTransportadora_cliente)
VALUES 
('Transportadora Alpha', '12345678000199', '11987654321', 'contato@alpha.com', 'senha123');
-- Inserindo dados na tabela funcionario
INSERT INTO funcionario (fkTransportadora_cliente, emailFuncionario, nomeFuncionario, cpfFuncionario, telefoneFuncionario, senhaAcesso)
VALUES 
(1, 'joao@alpha.com', 'João Silva', '12345678901', '11951742393', 'func123'),
(1, 'maria@beta.com', 'Maria Oliveira', '98765432100', '11951742333', 'func456');

INSERT INTO funcionario (fkTransportadora_cliente, emailFuncionario, nomeFuncionario, cpfFuncionario, telefoneFuncionario, senhaAcesso)
VALUES 
(2, 'judas@alpha.com', 'Judas Silva', '12345778901', '11957742393', 'func123'),
(2, 'marialeite@beta.com', 'Maria Leite Oliveira', '98765332100', '11951442333', 'func456');

-- Veículos da transportadora 1
INSERT INTO veiculo (fkTransportadora_cliente, fkFuncionario, placaVeiculo, modelo)
VALUES
(1, 1, 'ABC1D23', 'Sprinter 415'),
(1, 2, 'DEF2E34', 'Ducato Maxi');

-- Veículos da transportadora 2
INSERT INTO veiculo (fkTransportadora_cliente, fkFuncionario, placaVeiculo, modelo)
VALUES
(2, 3, 'JKL4G56', 'Fiorino'),
(2, 4, 'MNO5H67', 'Daily 35S14');


-- Sensores para os veículos de id 1 a 9
INSERT INTO sensor (fkVeiculo, tipoSensor, funcaoSensor, localizacao)
VALUES
-- Veículo 1
(1, 'DHT11', 'TEMPERATURA', 'Baú frontal'),
(1, 'DHT11', 'UMIDADE', 'Baú frontal'),
(1, 'DHT11', 'TEMPERATURA', 'Baú frontal'),
(1, 'DHT11', 'UMIDADE', 'Baú frontal'),
-- Veículo 2
(2, 'LM35', 'TEMPERATURA', 'Centro'),
(2, 'DHT11', 'UMIDADE', 'Centro'),
(2, 'LM35', 'TEMPERATURA', 'Centro'),
(2, 'DHT11', 'UMIDADE', 'Centro'),
-- Veículo 3
(3, 'DHT11', 'TEMPERATURA', 'Traseira'),
(3, 'DHT11', 'UMIDADE', 'Traseira'),
(3, 'DHT11', 'TEMPERATURA', 'Traseira'),
(3, 'DHT11', 'UMIDADE', 'Traseira'),
-- Veículo 4
(4, 'LM35', 'TEMPERATURA', 'Lateral esquerda'),
(4, 'DHT11', 'UMIDADE', 'Lateral esquerda'),
(4, 'LM35', 'TEMPERATURA', 'Lateral esquerda'),
(4, 'DHT11', 'UMIDADE', 'Lateral esquerda');

-- Supondo que os idSensor vão de 1 a 18 (2 por veículo)
-- Inserindo leituras para sensores dos veículos em uso (sensores de ids 1–2, 3–4, 7–8, 9–10, 13–14)
-- Sensor 1 e 2 (Veículo 1)
INSERT INTO leitura_sensor (fkSensor, valor, dataHora) VALUES
(1, 6.5, NOW() - INTERVAL 1 MINUTE),	
(2, 75.0, NOW() - INTERVAL 1 MINUTE);
-- Sensor 3 e 4 (Veículo 1)
INSERT INTO leitura_sensor (fkSensor, valor, dataHora) VALUES
(5, 7.1, NOW() - INTERVAL 1 MINUTE),
(6, 80.2, NOW() - INTERVAL 1 MINUTE);
    
select * from funcionario;
select * from transportadora_cliente;
select * from sensor;
select * from veiculo;
select * from leitura_sensor order by dataHora desc;