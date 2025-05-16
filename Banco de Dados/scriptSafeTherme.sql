CREATE DATABASE safe;
USE safe;

CREATE TABLE transportadora_cliente (
    idTransportadora_cliente INT PRIMARY KEY AUTO_INCREMENT,
    nomeTransportadora_cliente VARCHAR(60),
    cnpjTransportadora_cliente CHAR(14),
    telefoneTransportadora_cliente CHAR(13),
    emailTransportadora_cliente VARCHAR(60),
    CONSTRAINT chkTel CHECK (telefoneTransportadora_cliente LIKE '__-____-____'),
    CONSTRAINT chkEmailTransportadora CHECK (emailTransportadora_cliente LIKE '%@%.com')
);

CREATE TABLE funcionario (
    idFuncionario INT,
    fkTransportadora INT,
    nomeFuncionario VARCHAR(60),
    cargoFuncionario CHAR(18),
    cpfFuncionario CHAR(11),
    emailFucionarioPessoal VARCHAR(60),
    emailFucionarioProfissional VARCHAR(60),
    telefoneFuncionario VARCHAR(14),
    cep CHAR(8),
    senhaAcesso VARCHAR(20),
    CONSTRAINT pkCoposta PRIMARY KEY (idFuncionario, fkTransportadora),
    CONSTRAINT fkFuncionarioEmpresa FOREIGN KEY (fkTransportadora) REFERENCES transportadora_cliente(idTransportadora_cliente),
    CONSTRAINT chkCargo CHECK (cargoFuncionario IN ('Representante', 'Motorista')),
    CONSTRAINT chkTel1 CHECK (telefoneFuncionario LIKE '__-_____-____'),
    CONSTRAINT chkEmail1 CHECK (emailFucionarioPessoal LIKE '%@%.com'),
    CONSTRAINT chkEmail10 CHECK (emailFucionarioProfissional LIKE '%@%.com')
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

CREATE TABLE unidade (
    idUnidade INT,
    fkRepresentante INT,
    nomeUnidade VARCHAR(60),
    cepUnidade CHAR(8),
    estado CHAR(5),
    telefoneUnidade VARCHAR(13),
    emailUnidade VARCHAR(60),
    CONSTRAINT chkTel2 CHECK (telefoneUnidade LIKE '__-____-____'),
    CONSTRAINT chkEmail3 CHECK (emailUnidade LIKE '%@%.com')
);
