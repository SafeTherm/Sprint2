#include "DHT.h" //  chamar biblioteca 


#define TIPO_SENSOR DHT11 // definir o sensor DHT11
const int PINO_SENSOR_DHT11 = A1; // armazena dados de saída da porta analogica 
const int PINO_SENSOR_TEMPERATURA = A0; // armazena dados de saída da porta analogica
float temperaturaCelsius; // variável para armazenar a temperatura lida

DHT sensorDHT(PINO_SENSOR_DHT11, TIPO_SENSOR);
void setup(){
// configura taxa de transferência em bauds
Serial.begin(9600); //bits por segundo de transferência 
sensorDHT.begin();
}

// Função que será executada de forma continua
void loop() { 
float umidade = sensorDHT.readHumidity(); // leitura da umidade
float temperatura = sensorDHT.readTemperature(); // leitura da temperatura
int tempmax = 28; // valores simulado
int tempmin = 22;
int umimax = 80;
int umimin = 50;
int valorLeitura = analogRead(PINO_SENSOR_TEMPERATURA); // precisão do A/D ->
temperaturaCelsius = (valorLeitura * 5.0 / 1023.0) / 0.01; // 5 se refere aos volts ; 1023 a unidade ; 0.01 mV 

if (isnan(temperatura) || isnan(umidade)) { // condição para iniciar leitura dos dados
  Serial.println("Erro ao ler os dados do sensor");
}else {
 // inicia a impressão dos dados 
Serial.print(umidade); // referente ao nome da label no gráfico

Serial.print(";"); // espaçamento entre os dados
Serial.println(temperatura);


}
delay(2000); // tempo para executar leitura novamente
}
