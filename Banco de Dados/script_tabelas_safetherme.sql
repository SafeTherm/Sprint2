CREATE DATABASE transporte_de_medicamentos_termolabeis;
USE transporte_de_medicamentos_termolabeis;

CREATE TABLE transportadora_cliente (
    idTransportadora_cliente INT PRIMARY KEY AUTO_INCREMENT,
    nomeTransportadora_cliente VARCHAR(60),
    cnpjTransportadora_cliente CHAR(14),
    telefoneTransportadora_cliente CHAR(13),
    emailTransportadora_cliente VARCHAR(60),
    senhaTransportadora_cliente VARCHAR(20),
    codigoAtivacao char(10),
    CONSTRAINT chkEmailTransportadora CHECK (emailTransportadora_cliente LIKE '%@%.com')
);

CREATE TABLE funcionario (
    idFuncionario INT AUTO_INCREMENT PRIMARY KEY,
    fkTransportadora INT,
    emailFucionarioProfissional VARCHAR(100),
    nomeFuncionario VARCHAR(60),
    cpfFuncionario CHAR(11) UNIQUE,
    senhaAcesso VARCHAR(20),
    CONSTRAINT fkFuncionarioEmpresa FOREIGN KEY (fkTransportadora) REFERENCES transportadora_cliente(idTransportadora_cliente)
);

CREATE TABLE veiculo (
    idVeiculo INT AUTO_INCREMENT PRIMARY KEY,
    fkEmpresaTransportadora INT,
    fkVeiculoFuncionario INT,
    placaVeiculo CHAR(10),
    modelo VARCHAR(25),
    CONSTRAINT fkVeiculoEmpresa FOREIGN KEY (fkEmpresaTransportadora) REFERENCES transportadora_cliente(idTransportadora_cliente),
    CONSTRAINT fkVeiculoFuncionario FOREIGN KEY (fkVeiculoFuncionario) REFERENCES funcionario(idFuncionario)
);

CREATE TABLE sensor (
    idSensor INT PRIMARY KEY AUTO_INCREMENT,
    tipoSensor CHAR(12),
    statusSensor CHAR(10),
    dtInstalacaoSensor DATE,
    fkVeiculoSensor INT,
    CONSTRAINT chkTipoSensor CHECK (tipoSensor IN ('DHT11', 'LM35')),
    CONSTRAINT chkStatus CHECK (statusSensor IN ('ATIVO', 'INATIVO')),
    CONSTRAINT chkVeiculoSensor FOREIGN KEY (fkVeiculoSensor) REFERENCES veiculo(idVeiculo)
);

CREATE TABLE dadosSensor (
	fkSensor INT,
    idDados INT AUTO_INCREMENT,
    temperatura DECIMAL(5,2),
    umidade DECIMAL(5,2),
    PRIMARY KEY (idDados),
    FOREIGN KEY (fkSensor)
		references sensor(idSensor)
);

CREATE TABLE alerta (
    fkSensor INT,
    fkDados INT,
    dataAlerta DATETIME,
    statusAlerta VARCHAR(45),
    PRIMARY KEY (fkSensor, fkDados),
    CONSTRAINT fkSensorAlerta FOREIGN KEY (fkSensor) REFERENCES sensor(idSensor),
    CONSTRAINT fkDadosAlerta FOREIGN KEY (fkDados) REFERENCES dadosSensor(idDados)
);

-- Inserindo dados na tabela transportadora_cliente
INSERT INTO transportadora_cliente (nomeTransportadora_cliente, cnpjTransportadora_cliente, telefoneTransportadora_cliente, emailTransportadora_cliente, senhaTransportadora_cliente, codigoAtivacao)
VALUES 
('Transportadora Alpha', '12345678000199', '11987654321', 'contato@alpha.com', 'senha123', 'ATV123456'),
('Transportadora Beta', '98765432000155', '21912345678', 'contato@beta.com', 'senha456', 'ATV987654');

-- Inserindo dados na tabela funcionario
INSERT INTO funcionario (fkTransportadora, emailFucionarioProfissional, nomeFuncionario, cpfFuncionario, senhaAcesso)
VALUES 
(1, 'joao@alpha.com', 'João Silva', '12345678901', 'func123'),
(2, 'maria@beta.com', 'Maria Oliveira', '98765432100', 'func456');

-- Inserindo dados na tabela veiculo
INSERT INTO veiculo (fkEmpresaTransportadora, fkVeiculoFuncionario, placaVeiculo, modelo)
VALUES 
(1, 1, 'ABC1D23', 'Caminhão Refrigerado'),
(2, 2, 'XYZ9K87', 'Van Termolábil');

-- Inserindo dados na tabela sensor
INSERT INTO sensor (tipoSensor, statusSensor, dtInstalacaoSensor, fkVeiculoSensor)
VALUES 
('DHT11', 'ATIVO', '2025-05-20', 1),
('LM35', 'INATIVO', '2025-04-15', 2),
('DHT11', 'ATIVO', '2025-05-20', 1),
('LM35', 'INATIVO', '2025-04-15', 2);
select * from funcionario;

select * from sensor;