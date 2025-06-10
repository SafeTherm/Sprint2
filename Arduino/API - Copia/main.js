const serialport = require('serialport');
const express = require('express');
const mysql = require('mysql2');

const SERIAL_BAUD_RATE = 9600;
const SERVIDOR_PORTA = 3300;
const HABILITAR_OPERACAO_INSERIR = true;

const serial = async (valoresSensorTemperatura, valoresSensorUmidade) => {
    const poolBancoDados = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'transporte_de_medicamentos_termolabeis',
        port: 3306
    }).promise();

    const portas = await serialport.SerialPort.list();
    const portaArduino = portas.find((porta) => porta.vendorId == 2341 && porta.productId == 43);

    if (!portaArduino) {
        throw new Error('O arduino não foi encontrado em nenhuma porta serial');
    }

    const arduino = new serialport.SerialPort({
        path: portaArduino.path,
        baudRate: SERIAL_BAUD_RATE
    });

    arduino.on('open', () => {
        console.log(`Leitura do Arduino iniciada na porta ${portaArduino.path} com baud rate ${SERIAL_BAUD_RATE}`);
    });

    arduino.pipe(new serialport.ReadlineParser({ delimiter: '\r\n' }))
        .on('data', async (data) => {
            console.log('Dados recebidos:', data);

            const valores = data.split(';');

            if (valores.length !== 4) {
                console.warn('Formato de dados inválido. Esperado: tempSup;umidSup;tempInf;umidInf');
                return;
            }

            const temperaturaSuperior = parseFloat(valores[0]);
            const umidadeSuperior = parseFloat(valores[1]);
            const temperaturaInferior = parseFloat(valores[2]);
            const umidadeInferior = parseFloat(valores[3]);

            valoresSensorTemperatura.push(temperaturaSuperior, temperaturaInferior);
            valoresSensorUmidade.push(umidadeSuperior, umidadeInferior);

            if (HABILITAR_OPERACAO_INSERIR) {
                try {
                    const [resTempSup] = await poolBancoDados.execute(
                        'INSERT INTO leitura_sensor (fkSensor, valor) VALUES (?, ?)', [13, temperaturaSuperior]
                    );
                    const [resUmidSup] = await poolBancoDados.execute(
                        'INSERT INTO leitura_sensor (fkSensor, valor) VALUES (?, ?)', [14, umidadeSuperior]
                    );
                    const [resTempInf] = await poolBancoDados.execute(
                        'INSERT INTO leitura_sensor (fkSensor, valor) VALUES (?, ?)', [15, temperaturaInferior]
                    );
                    const [resUmidInf] = await poolBancoDados.execute(
                        'INSERT INTO leitura_sensor (fkSensor, valor) VALUES (?, ?)', [16, umidadeInferior]
                    );

                    console.log("Valores inseridos com sucesso");

                    const checarUmidade = async (valor, idLeitura) => {
                        if (valor > 70) {
                            await poolBancoDados.execute(
                                'INSERT INTO alerta (fkLeitura, tipoAlerta, descricao) VALUES (?, ?, ?)',
                                [idLeitura, 'ALERTA', 'Umidade acima do ideal (>70%)']
                            );
                        } else if (valor < 40) {
                            await poolBancoDados.execute(
                                'INSERT INTO alerta (fkLeitura, tipoAlerta, descricao) VALUES (?, ?, ?)',
                                [idLeitura, 'ALERTA', 'Umidade abaixo do ideal (<40%)']
                            );
                        } else if ((valor >= 40 && valor < 50) || (valor > 60 && valor <= 70)) {
                            await poolBancoDados.execute(
                                'INSERT INTO alerta (fkLeitura, tipoAlerta, descricao) VALUES (?, ?, ?)',
                                [idLeitura, 'ATENÇÃO', 'Umidade em zona de atenção (entre 40-50% ou 60-70%)']
                            );
                        }
                    };

                    const checarTemperatura = async (valor, idLeitura) => {
                        if (valor > 7) {
                            await poolBancoDados.execute(
                                'INSERT INTO alerta (fkLeitura, tipoAlerta, descricao) VALUES (?, ?, ?)',
                                [idLeitura, 'ALERTA', 'Temperatura acima do ideal (>7°C)']
                            );
                        } else if (valor < 2) {
                            await poolBancoDados.execute(
                                'INSERT INTO alerta (fkLeitura, tipoAlerta, descricao) VALUES (?, ?, ?)',
                                [idLeitura, 'ALERTA', 'Temperatura abaixo do ideal (<2°C)']
                            );
                        } else if ((valor > 6 && valor <= 7) || (valor >= 2 && valor < 4)) {
                            await poolBancoDados.execute(
                                'INSERT INTO alerta (fkLeitura, tipoAlerta, descricao) VALUES (?, ?, ?)',
                                [idLeitura, 'ATENÇÃO', 'Temperatura em zona de atenção (entre 2-4°C ou 6-7°C)']
                            );
                        }
                    };

                    await checarTemperatura(temperaturaSuperior, resTempSup.insertId);
                    await checarUmidade(umidadeSuperior, resUmidSup.insertId);
                    await checarTemperatura(temperaturaInferior, resTempInf.insertId);
                    await checarUmidade(umidadeInferior, resUmidInf.insertId);

                } catch (erro) {
                    console.error("Erro ao inserir dados no banco:", erro);
                }
            }
        });

    arduino.on('error', (mensagem) => {
        console.error(`Erro na comunicação com o Arduino: ${mensagem}`);
    });
};

const servidor = (valoresSensorTemperatura, valoresSensorUmidade) => {
    const app = express();

    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
        next();
    });

    app.listen(SERVIDOR_PORTA, () => {
        console.log(`API executando na porta ${SERVIDOR_PORTA}`);
    });

    app.get('/sensores/temperatura', (_, res) => {
        res.json(valoresSensorTemperatura);
    });

    app.get('/sensores/umidade', (_, res) => {
        res.json(valoresSensorUmidade);
    });
};

(async () => {
    const valoresSensorTemperatura = [];
    const valoresSensorUmidade = [];

    await serial(valoresSensorTemperatura, valoresSensorUmidade);
    servidor(valoresSensorTemperatura, valoresSensorUmidade);
})();