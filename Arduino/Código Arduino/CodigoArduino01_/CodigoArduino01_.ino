#include "DHT.h"

#define TIPO_SENSOR DHT11

const int PINO_DHT_REAL = A1;
const int PINO_LM35_REAL = A0;

DHT sensorDHT(PINO_DHT_REAL, TIPO_SENSOR);

float temperaturaLMReal = 0;

// Simulados
float temperaturaDHTSimulada = 23.5;  // temp inferior
float umidadeSimulada = 60.0;         // umid inferior

void setup() {
  Serial.begin(9600);
  sensorDHT.begin();
}

void loop() {
  float umidadeReal = sensorDHT.readHumidity();
  float temperaturaDHTReal = sensorDHT.readTemperature();

  int leituraLM = analogRead(PINO_LM35_REAL);
  temperaturaLMReal = (leituraLM * 5.0 / 1023.0) / 0.01;

  if (isnan(umidadeReal) || isnan(temperaturaDHTReal)) {
    Serial.println("Erro ao ler os dados dos sensores");
  } else {
    // tempSup;umidSup;tempInf;umidInf
    Serial.print(temperaturaDHTReal);
    Serial.print(";");
    Serial.print(umidadeReal);
    Serial.print(";");
    Serial.print(temperaturaDHTSimulada);
    Serial.print(";");
    Serial.println(umidadeSimulada);
  }

  delay(2000);
}
