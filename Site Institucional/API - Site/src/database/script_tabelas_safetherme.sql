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
    logo TEXT
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
    idVeiculo INT PRIMARY KEY AUTO_INCREMENT,
    fkTransportadora_cliente INT NOT NULL,
    fkFuncionario INT,
    placaVeiculo VARCHAR(10) NOT NULL UNIQUE,  -- Ex: ABC1D23
    modelo VARCHAR(25) NOT NULL,
    capacidade DECIMAL(10,2) COMMENT 'Capacidade em kg',
    anoFabricacao YEAR,
    statusVeiculo ENUM('OPERANTE', 'MANUTENCAO', 'DESATIVADO') DEFAULT 'OPERANTE',
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
    statusSensor ENUM('ATIVO', 'INATIVO', 'MANUTENCAO') DEFAULT 'ATIVO',
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
    statusAlerta ENUM('PENDENTE', 'RESOLVIDO') DEFAULT 'PENDENTE',
    CONSTRAINT fk_alerta_leitura FOREIGN KEY (fkLeitura) 
        REFERENCES leitura_sensor(idLeitura)
);

-- Inserindo dados na tabela transportadora_cliente
INSERT INTO transportadora_cliente (nomeTransportadora_cliente, cnpjTransportadora_cliente, telefoneTransportadora_cliente, emailTransportadora_cliente, senhaTransportadora_cliente)
VALUES 
('Transportadora Alpha', '12345678000199', '11987654321', 'contato@alpha.com', 'senha123'),
('Transportadora Beta', '98765432000155', '21912345678', 'contato@beta.com', 'senha456');

-- Inserindo dados na tabela funcionario
INSERT INTO funcionario (fkTransportadora_cliente, emailFuncionario, nomeFuncionario, cpfFuncionario, telefoneFuncionario, senhaAcesso)
VALUES 
(1, 'joao@alpha.com', 'João Silva', '12345678901', '11951742393', 'func123'),
(1, 'maria@beta.com', 'Maria Oliveira', '98765432100', '11951742333', 'func456');

select * from funcionario;
select * from transportadora_cliente;
select * from sensor;
