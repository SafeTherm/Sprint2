const serialport = require('serialport');
const express = require('express');
const mysql = require('mysql2');

const SERIAL_BAUD_RATE = 9600;
const SERVIDOR_PORTA = 3300;
const HABILITAR_OPERACAO_INSERIR = true;

const serial = async (valoresSensorTemperatura, valoresSensorUmidade) => {
    const poolBancoDados = mysql.createPool({
        host: '10.18.32.141',
        user: 'aluno',
        password: 'Sptech#2024',
        database: 'transporte_de_medicamentos_termolabeis',
        port: 3307
    }).promise();





    // Funções de alerta
    const checarUmidade = async (valor, idLeitura) => {
        if (valor > 70) {
            await poolBancoDados.execute(
                'INSERT INTO alerta (fkLeitura, tipoAlerta, descricao) VALUES (?, ?, ?)',
                [idLeitura, 'ALERTA', 'Umidade acima do ideal (IDEAL 40% - 60%)']
            );
        } else if (valor < 40) {
            await poolBancoDados.execute(
                'INSERT INTO alerta (fkLeitura, tipoAlerta, descricao) VALUES (?, ?, ?)',
                [idLeitura, 'ALERTA', 'Umidade abaixo do ideal (IDEAL 40% - 60%)']
            );
        } else if ((valor >= 40 && valor < 50) || (valor > 60 && valor <= 70)) {
            await poolBancoDados.execute(
                'INSERT INTO alerta (fkLeitura, tipoAlerta, descricao) VALUES (?, ?, ?)',
                [idLeitura, 'ATENÇÃO', 'Umidade em zona de atenção (IDEAL 40% - 60%)']
            );
        }
    };

    const checarTemperatura = async (valor, idLeitura) => {
        if (valor > 7) {
            await poolBancoDados.execute(
                'INSERT INTO alerta (fkLeitura, tipoAlerta, descricao) VALUES (?, ?, ?)',
                [idLeitura, 'ALERTA', 'Temperatura acima do ideal (IDEAL 4°C - 6°C)']
            );
        } else if (valor < 2) {
            await poolBancoDados.execute(
                'INSERT INTO alerta (fkLeitura, tipoAlerta, descricao) VALUES (?, ?, ?)',
                [idLeitura, 'ALERTA', 'Temperatura abaixo do ideal (IDEAL 4°C - 6°C)']
            );
        } else if ((valor > 6 && valor <= 7) || (valor >= 2 && valor < 4)) {
            await poolBancoDados.execute(
                'INSERT INTO alerta (fkLeitura, tipoAlerta, descricao) VALUES (?, ?, ?)',
                [idLeitura, 'ATENÇÃO', 'Temperatura em zona de atenção (IDEAL 4°C - 6°C)']
            );
        }
    };

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
                    // ================== DADOS REAIS (VEÍCULO 1) ==================
                    const [resTempSup1] = await poolBancoDados.execute(
                        'INSERT INTO leitura_sensor (fkSensor, valor) VALUES (?, ?)', [1, temperaturaSuperior]
                    );
                    const [resUmidSup1] = await poolBancoDados.execute(
                        'INSERT INTO leitura_sensor (fkSensor, valor) VALUES (?, ?)', [2, umidadeSuperior]
                    );
                    const [resTempInf1] = await poolBancoDados.execute(
                        'INSERT INTO leitura_sensor (fkSensor, valor) VALUES (?, ?)', [3, temperaturaInferior]
                    );
                    const [resUmidInf1] = await poolBancoDados.execute(
                        'INSERT INTO leitura_sensor (fkSensor, valor) VALUES (?, ?)', [4, umidadeInferior]
                    );

                    await checarTemperatura(temperaturaSuperior, resTempSup1.insertId);
                    await checarUmidade(umidadeSuperior, resUmidSup1.insertId);
                    await checarTemperatura(temperaturaInferior, resTempInf1.insertId);
                    await checarUmidade(umidadeInferior, resUmidInf1.insertId);

                    // ================== DADOS SIMULADOS (VEÍCULO 2) ==================
                    const tempSup2 = parseFloat((Math.random() * 10).toFixed(2));
                    const umidSup2 = Math.floor(Math.random() * 80 + 30);
                    const tempInf2 = parseFloat((Math.random() * 10).toFixed(2));
                    const umidInf2 = Math.floor(Math.random() * 80 + 30);

                    const [resTempSup2] = await poolBancoDados.execute(
                        'INSERT INTO leitura_sensor (fkSensor, valor) VALUES (?, ?)', [5, tempSup2]
                    );
                    const [resUmidSup2] = await poolBancoDados.execute(
                        'INSERT INTO leitura_sensor (fkSensor, valor) VALUES (?, ?)', [6, umidSup2]
                    );
                    const [resTempInf2] = await poolBancoDados.execute(
                        'INSERT INTO leitura_sensor (fkSensor, valor) VALUES (?, ?)', [7, tempInf2]
                    );
                    const [resUmidInf2] = await poolBancoDados.execute(
                        'INSERT INTO leitura_sensor (fkSensor, valor) VALUES (?, ?)', [8, umidInf2]
                    );

                    await checarTemperatura(tempSup2, resTempSup2.insertId);
                    await checarUmidade(umidSup2, resUmidSup2.insertId);
                    await checarTemperatura(tempInf2, resTempInf2.insertId);
                    await checarUmidade(umidInf2, resUmidInf2.insertId);

                    // ================== DADOS SIMULADOS (VEÍCULO 3) ==================
                    const tempSup3 = parseFloat((Math.random() * 10).toFixed(2));
                    const umidSup3 = Math.floor(Math.random() * 80 + 30);
                    const tempInf3 = parseFloat((Math.random() * 10).toFixed(2));
                    const umidInf3 = Math.floor(Math.random() * 80 + 30);

                    const [resTempSup3] = await poolBancoDados.execute(
                        'INSERT INTO leitura_sensor (fkSensor, valor) VALUES (?, ?)', [9, tempSup3]
                    );
                    const [resUmidSup3] = await poolBancoDados.execute(
                        'INSERT INTO leitura_sensor (fkSensor, valor) VALUES (?, ?)', [10, umidSup3]
                    );
                    const [resTempInf3] = await poolBancoDados.execute(
                        'INSERT INTO leitura_sensor (fkSensor, valor) VALUES (?, ?)', [11, tempInf3]
                    );
                    const [resUmidInf3] = await poolBancoDados.execute(
                        'INSERT INTO leitura_sensor (fkSensor, valor) VALUES (?, ?)', [12, umidInf3]
                    );

                    await checarTemperatura(tempSup3, resTempSup3.insertId);
                    await checarUmidade(umidSup3, resUmidSup3.insertId);
                    await checarTemperatura(tempInf3, resTempInf3.insertId);
                    await checarUmidade(umidInf3, resUmidInf3.insertId);
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
