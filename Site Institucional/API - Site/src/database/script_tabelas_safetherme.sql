CREATE DATABASE transporte_de_medicamentos_termolabeis;
USE transporte_de_medicamentos_termolabeis;

-- Tabela transportadora_cliente
CREATE TABLE transportadora_cliente (
    idTransportadora_cliente INT PRIMARY KEY AUTO_INCREMENT,
    nomeTransportadora_cliente VARCHAR(60),
    cnpjTransportadora_cliente CHAR(14),
    telefoneTransportadora_cliente CHAR(13),
    emailTransportadora_cliente VARCHAR(60),
    senhaTransportadora_cliente VARCHAR(20),
    codigoAtivacao VARCHAR(10) UNIQUE,  -- <- ESSA LINHA É ESSENCIAL
    CONSTRAINT chkEmailTransportadora CHECK (emailTransportadora_cliente LIKE '%@%.com')
);

-- Tabela funcionario
CREATE TABLE funcionario (
    idFuncionario INT auto_increment,
    fkTransportadora VARCHAR(10),
    emailFuncionario VARCHAR(100) UNIQUE,
    nomeFuncionario VARCHAR(60),
    cpfFuncionario 	VARCHAR(20),
    telefoneFuncionario VARCHAR(14),
    senhaAcesso VARCHAR(20),
	imagemPerfil_funcionario TEXT,
    CONSTRAINT pkComposta PRIMARY KEY (idFuncionario, fkTransportadora),
    CONSTRAINT fkFuncionarioEmpresa FOREIGN KEY (fkTransportadora) REFERENCES transportadora_cliente(codigoAtivacao),
    CONSTRAINT chkEmail2 CHECK (emailFuncionario LIKE '%@%.com')
);


CREATE TABLE veiculo (
    idVeiculo INT PRIMARY KEY,
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
    CONSTRAINT chkAlerta CHECK (statusAlerta in ("Ok", "Atenção", "Crítico")),
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
INSERT INTO funcionario (fkTransportadora, emailFuncionario, nomeFuncionario, cpfFuncionario, senhaAcesso)
VALUES 
('ATV123456', 'joao@alpha.com', 'João Silva', '12345678901', 'func123'),
('ATV123456', 'maria@beta.com', 'Maria Oliveira', '98765432100', 'func456');

select * from funcionario;
select * from transportadora_cliente;
select * from sensor;
