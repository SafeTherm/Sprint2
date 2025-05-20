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
    idDados INT PRIMARY KEY AUTO_INCREMENT,
    temperatura DECIMAL(5,2),
    umidade DECIMAL(5,2)
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

INSERT INTO transportadora_cliente (nomeTransportadora_cliente, cnpjTransportadora_cliente, telefoneTransportadora_cliente, emailTransportadora_cliente, senhaTransportadora_cliente, codigoAtivacao)
VALUES 
('TransMed Express', '12345678000123', '11987654321', 'contato@transmed.com', 'senha123', 'ABC123'),
('Safe Pharma Logistics', '98765432000198', '11912345678', 'info@safepharma.com', 'segura123', 'XYZ987');

INSERT INTO funcionario (fkTransportadora, emailFucionarioProfissional, nomeFuncionario, cpfFuncionario, senhaAcesso)
VALUES
(1, 'carlos.silva@transmed.com', 'Carlos Silva', '12345678901', 'acessoCarlos'),
(2, 'ana.oliveira@safepharma.com', 'Ana Oliveira', '98765432109', 'acessoAna');

select * from funcionario;