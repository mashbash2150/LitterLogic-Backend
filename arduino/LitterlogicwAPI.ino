#include <HTTPClient.h>

#include <DateTime.h>
#include <DateTimeTZ.h>
#include <ESPDateTime.h>
#include <TimeElapsed.h>

#include <WiFi.h>
#include <ArduinoJson.h>
#include <ESP32Time.h>

unsigned long lastTime = 0;
unsigned long timerDelay = 50000;

const char *ssid = "FETAFOREVER";
const char *password = "murderouskittens";

WiFiServer server(80);

int ledPin = 13;
int inputPin = 14;
int pirState = LOW;
int val = 0; // variable for reading the pin status
time_t today = DateTime.now();

void setupDateTime()
{
  DateTime.setServer("time.google.com");
  DateTime.setTimeZone("UTC-6");
  DateTime.begin();
  if (!DateTime.isTimeValid())
  {
    Serial.println("Failed to get time from server.");
  }
  else
  {
    Serial.printf("Date Now is %s\n", DateTime.toISOString().c_str());
    Serial.printf("Timestamp is %ld\n", DateTime.now());
  }
}

void setup()
{
  setupDateTime();
  pinMode(ledPin, OUTPUT);  // declaring LED as output
  pinMode(inputPin, INPUT); // declaring PIR as input

  Serial.begin(115200);
  delay(10);

  Serial.println();
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED)
  {
    delay(2000);

    Serial.println("");
    Serial.println("WiFi connected.");
    Serial.println("IP address: ");
    Serial.println(WiFi.localIP());

    server.begin();
  }

  int value = 0;
}

void loop()
{
  HTTPClient http;
  String serverName = "https://litterlogic-backend.herokuapp.com/api/triggers/create/2";
  http.begin(serverName);
  http.addHeader("Content-Type", "application/json");
  // int httpResponseCode=http.POST("{\"action\":\"apicall\",\"time\":\"2022-10-13\"}");

  DynamicJsonBuffer jBuffer;
  JsonObject &root = jBuffer.createObject();

  val = digitalRead(inputPin); // read input value
  if (val == HIGH)
  { // check if the input is HIGH
    digitalWrite(ledPin, HIGH);
    delay(500); // turn LED ON
    if (pirState == LOW)
    {
      // we have just turned on
      StaticJsonBuffer<256> jb;
      // Add values in the document
      //
      root["cat_id"] = 2;
      root["action"] = "enter";
      root["date"] = DateTime.format(DateFormatter::DATE_ONLY);
      root["time"] = DateTime.format(DateFormatter::TIME_ONLY);

      String requestBody;
      root.printTo(requestBody);
      int httpResponseCode = http.POST(requestBody);
      // int httpResponseCode=http.POST("{\"cat_id\":\"2\",\"action\":\"enter\"}");

      Serial.println("Motion detected, cat entered and logged");
      root["action"] = "enter";
      // root["time"]=DateTime.format(DateFormatter::SIMPLE).c_str();

      root["date"] = DateTime.format(DateFormatter::DATE_ONLY);
      root["time"] = DateTime.format(DateFormatter::TIME_ONLY);

      root.prettyPrintTo(Serial);
      Serial.println();

      delay(3000);

      pirState = HIGH;
    }
  }
  else
  {
    digitalWrite(ledPin, LOW); // turn LED OFF
    delay(500);
    if (pirState == HIGH)
    {
      StaticJsonBuffer<256> jb;
      // Add values in the document
      //
      root["cat_id"] = 2;
      root["action"] = "exit";
      root["date"] = DateTime.format(DateFormatter::DATE_ONLY);
      root["time"] = DateTime.format(DateFormatter::TIME_ONLY);

      String requestBody;
      root.printTo(requestBody);
      int httpResponseCode = http.POST(requestBody);
      // int httpResponseCode=http.POST("{\"cat_id\":\"2\",\"action\":\"exit\"}");
      Serial.println("Motion ended, cat left and logged:");
      DateTimeParts p = DateTime.getParts();
      root["action"] = "exit";

      root["date"] = DateTime.format(DateFormatter::DATE_ONLY);
      root["time"] = DateTime.format(DateFormatter::TIME_ONLY);

      // root["time"]=DateTime.format(DateFormatter::SIMPLE).c_str();
      root.prettyPrintTo(Serial);
      Serial.println();

      // we have just turned of
      // Serial.println(now);

      // We only want to print on the output change, not state
      pirState = LOW;
    }
  }
}