CREATE DATABASE IF NOT EXISTS transporte_de_medicamentos_termolabeis;
USE transporte_de_medicamentos_termolabeis;


-- Tabela transportadora_cliente
CREATE TABLE transportadora_cliente (
    idTransportadora_cliente INT PRIMARY KEY AUTO_INCREMENT,
    nomeTransportadora_cliente VARCHAR(60) NOT NULL,
    cnpjTransportadora_cliente CHAR(14) NOT NULL UNIQUE,
    telefoneTransportadora_cliente VARCHAR(15) NOT NULL,
    emailTransportadora_cliente VARCHAR(60) NOT NULL UNIQUE,
    senhaTransportadora_cliente VARCHAR(100),
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
    PRIMARY KEY (idVeiculo, fkTransportadora_cliente, fkFuncionario),
    CONSTRAINT dkVeiculoFuncionario FOREIGN KEY (fkFuncionario)
		REFERENCES funcionario(idFuncionario),
    CONSTRAINT fkVeiculoTransportadora FOREIGN KEY (fkTransportadora_cliente) 
        REFERENCES transportadora_cliente(idTransportadora_cliente)
);

-- Tabela sensor
CREATE TABLE sensor (
    idSensor INT PRIMARY KEY AUTO_INCREMENT,
    fkVeiculo INT NOT NULL,
    tipoSensor ENUM('DHT11', 'LM35') NOT NULL,
    funcaoSensor ENUM('TEMPERATURA', 'UMIDADE') NOT NULL,
    localizacao VARCHAR(50) NOT NULL COMMENT 'Posição no veículo',
    statusSensor ENUM('ATIVO', 'MANUTENCAO', 'DESATIVADO') DEFAULT 'ATIVO',
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
    tipoAlerta ENUM('ALERTA', 'ATENÇÃO') NOT NULL,
    descricao VARCHAR(255),
    dataAlerta DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_alerta_leitura FOREIGN KEY (fkLeitura) 
        REFERENCES leitura_sensor(idLeitura)
);

select * from sensor;
-- Inserindo dados na tabela transportadora_cliente
INSERT INTO transportadora_cliente (nomeTransportadora_cliente, cnpjTransportadora_cliente, telefoneTransportadora_cliente, emailTransportadora_cliente, senhaTransportadora_cliente)
VALUES 
('Transportadora Alpha', '12345678000199', '11987654321', 'contato@alpha.com', 'senha123');
-- Inserindo dados na tabela funcionario
INSERT INTO funcionario (fkTransportadora_cliente, emailFuncionario, nomeFuncionario, cpfFuncionario, telefoneFuncionario)
VALUES 
(1, 'joao@alpha.com', 'João Silva', '12345678901', '11951742393'),
(1, 'maria@beta.com', 'Maria Oliveira', '98765432100', '11951742333');

INSERT INTO funcionario (fkTransportadora_cliente, emailFuncionario, nomeFuncionario, cpfFuncionario, telefoneFuncionario)
VALUES 
(2, 'judas@alpha.com', 'Judas Silva', '12345778901', '11957742393'),
(2, 'marialeite@beta.com', 'Maria Leite Oliveira', '98765332100', '11951442333');
select * from funcionario;
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
(1, 'LM35', 'TEMPERATURA', 'Superior'),
(1, 'DHT11', 'UMIDADE', 'Superior'),
(1, 'LM35', 'TEMPERATURA', 'Inferior'),
(1, 'DHT11', 'UMIDADE', 'Inferior'),
-- Veículo 2
(2, 'LM35', 'TEMPERATURA', 'Superior'),
(2, 'DHT11', 'UMIDADE', 'Superior'),
(2, 'LM35', 'TEMPERATURA', 'Inferior'),
(2, 'DHT11', 'UMIDADE', 'Inferior');


INSERT INTO sensor (fkVeiculo, tipoSensor, funcaoSensor, localizacao)
VALUES
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
(1, 6.5, NOW(3)),	
(2, 75.0, NOW(3));
-- Sensor 3 e 4 (Veículo 1)
INSERT INTO leitura_sensor (fkSensor, valor, dataHora) VALUES
(5, 7.1, NOW() - INTERVAL 1 MINUTE),
(6, 80.2, NOW() - INTERVAL 1 MINUTE);







-- Simulação para os últimos 30 minutos
INSERT INTO leitura_sensor (fkSensor, valor, dataHora) VALUES
-- Temperatura Sensor 1
(1, 3.5, NOW() - INTERVAL 30 MINUTE),
(1, 2.8, NOW() - INTERVAL 29 MINUTE),
(1, 2.3, NOW() - INTERVAL 28 MINUTE),
(1, 7.5, NOW() - INTERVAL 27 MINUTE),
(1, 8.2, NOW() - INTERVAL 26 MINUTE), -- acima do normal
(1, 6.8, NOW() - INTERVAL 25 MINUTE),
(1, 3.1, NOW() - INTERVAL 24 MINUTE),
(1, 1.9, NOW() - INTERVAL 23 MINUTE), -- abaixo do normal
(1, 4.0, NOW() - INTERVAL 22 MINUTE),
(1, 3.9, NOW() - INTERVAL 21 MINUTE),
(1, 5.0, NOW() - INTERVAL 20 MINUTE),
(1, 6.1, NOW() - INTERVAL 19 MINUTE),
(1, 7.2, NOW() - INTERVAL 18 MINUTE),
(1, 8.5, NOW() - INTERVAL 17 MINUTE), -- acima do normal
(1, 2.5, NOW() - INTERVAL 16 MINUTE),

-- Temperatura Sensor 3
(3, 3.4, NOW() - INTERVAL 15 MINUTE),
(3, 2.1, NOW() - INTERVAL 14 MINUTE),
(3, 6.3, NOW() - INTERVAL 13 MINUTE),
(3, 7.9, NOW() - INTERVAL 12 MINUTE),
(3, 9.2, NOW() - INTERVAL 11 MINUTE), -- acima do normal
(3, 1.7, NOW() - INTERVAL 10 MINUTE), -- abaixo do normal
(3, 4.4, NOW() - INTERVAL 9 MINUTE),
(3, 5.2, NOW() - INTERVAL 8 MINUTE),
(3, 3.9, NOW() - INTERVAL 7 MINUTE),
(3, 6.7, NOW() - INTERVAL 6 MINUTE),
(3, 7.0, NOW() - INTERVAL 5 MINUTE),
(3, 8.9, NOW() - INTERVAL 4 MINUTE), -- acima do normal
(3, 2.2, NOW() - INTERVAL 3 MINUTE),
(3, 1.5, NOW() - INTERVAL 2 MINUTE), -- abaixo do normal
(3, 3.0, NOW() - INTERVAL 1 MINUTE),

-- Umidade Sensor 2
(2, 60.0, NOW() - INTERVAL 30 MINUTE),
(2, 45.0, NOW() - INTERVAL 29 MINUTE),
(2, 39.0, NOW() - INTERVAL 28 MINUTE), -- abaixo do normal
(2, 68.0, NOW() - INTERVAL 27 MINUTE),
(2, 72.0, NOW() - INTERVAL 26 MINUTE), -- acima do normal
(2, 50.0, NOW() - INTERVAL 25 MINUTE),
(2, 63.0, NOW() - INTERVAL 24 MINUTE),
(2, 41.5, NOW() - INTERVAL 23 MINUTE),
(2, 43.2, NOW() - INTERVAL 22 MINUTE),
(2, 70.0, NOW() - INTERVAL 21 MINUTE),
(2, 74.3, NOW() - INTERVAL 20 MINUTE), -- acima do normal
(2, 40.0, NOW() - INTERVAL 19 MINUTE),
(2, 38.0, NOW() - INTERVAL 18 MINUTE), -- abaixo do normal
(2, 56.0, NOW() - INTERVAL 17 MINUTE),
(2, 61.1, NOW() - INTERVAL 16 MINUTE),

-- Umidade Sensor 4
(4, 59.0, NOW() - INTERVAL 15 MINUTE),
(4, 64.0, NOW() - INTERVAL 14 MINUTE),
(4, 45.0, NOW() - INTERVAL 13 MINUTE),
(4, 42.0, NOW() - INTERVAL 12 MINUTE),
(4, 70.0, NOW() - INTERVAL 11 MINUTE),
(4, 75.0, NOW() - INTERVAL 10 MINUTE), -- acima do normal
(4, 39.5, NOW() - INTERVAL 9 MINUTE),  -- abaixo do normal
(4, 66.0, NOW() - INTERVAL 8 MINUTE),
(4, 58.5, NOW() - INTERVAL 7 MINUTE),
(4, 62.0, NOW() - INTERVAL 6 MINUTE),
(4, 40.0, NOW() - INTERVAL 5 MINUTE),
(4, 37.0, NOW() - INTERVAL 4 MINUTE), -- abaixo do normal
(4, 50.0, NOW() - INTERVAL 3 MINUTE),
(4, 73.0, NOW() - INTERVAL 2 MINUTE), -- acima do normal
(4, 69.0, NOW() - INTERVAL 1 MINUTE);



 select dataHora, placaVeiculo, s.tipoSensor ,l.valor from leitura_sensor as l
    join sensor as s on l.fkSensor = s.idSensor
    join veiculo as v on v.idVeiculo = s.fkVeiculo
    where v.idVeiculo = 1 and s.tipoSensor = 'DHT11'
    order by l.dataHora desc;



    
select * from funcionario;
select * from transportadora_cliente;
select * from sensor;
select * from veiculo;
select * from leitura_sensor order by dataHora desc;
select * from alerta;