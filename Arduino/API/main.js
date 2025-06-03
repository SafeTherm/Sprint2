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

            // Armazena os valores para retorno via API
            valoresSensorTemperatura.push(temperaturaSuperior, temperaturaInferior);
            valoresSensorUmidade.push(umidadeSuperior, umidadeInferior);

            if (HABILITAR_OPERACAO_INSERIR) {
                try {
                    await poolBancoDados.execute(
                        'INSERT INTO leitura_sensor (fkSensor, valor) VALUES (?, ?)', [13, temperaturaSuperior]
                    );
                    await poolBancoDados.execute(
                        'INSERT INTO leitura_sensor (fkSensor, valor) VALUES (?, ?)', [14, umidadeSuperior]
                    );
                    await poolBancoDados.execute(
                        'INSERT INTO leitura_sensor (fkSensor, valor) VALUES (?, ?)', [15, temperaturaInferior]
                    );
                    await poolBancoDados.execute(
                        'INSERT INTO leitura_sensor (fkSensor, valor) VALUES (?, ?)', [16, umidadeInferior]
                    );

                    console.log("Valores inseridos com sucesso:", {
                        temperaturaSuperior,
                        umidadeSuperior,
                        temperaturaInferior,
                        umidadeInferior
                    });
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

// Função principal
(async () => {
    const valoresSensorTemperatura = [];
    const valoresSensorUmidade = [];

    await serial(valoresSensorTemperatura, valoresSensorUmidade);
    servidor(valoresSensorTemperatura, valoresSensorUmidade);
})();
