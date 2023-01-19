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

int redPin = 26;
int greenPin = 13;
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

// void callApi(){

//   if (WiFi.status()==WL_CONNECTED){

//   HTTPClient http;
//   String serverName = "https://litterlogic-backend.herokuapp.com/api/triggers/create/1";
//   //http.begin(serverName);
//   //String serverPath=serverName;
//   //http.begin(serverPath.c_str());
//   //http.addHeader("Content-Type", "application/json");
//   //String httpRequestData = "{\"action\":\"apicall\",\"time\":\"2022-10-13\"}";
//   int httpResponseCode=http.POST("{\"action\":\"apicall\",\"dateTime\":\"2022-10-13\"}");
//   //Serial.print(httpResponseCode);
//   //Serial.print(httpRequestData);
//   Serial.print("httpResponseCode ");

//   if (httpResponseCode>0){
//     Serial.print("HTTP Response code: ");
//     Serial.println(httpResponseCode);
//     String payload=http.getString();
//     Serial.println(payload);

//   } else {
//     Serial.print("Error code:  ");
//     Serial.println(httpResponseCode);
//     }
//     http.end();
// }

// else {
// Serial.println("wifi disconnected");
// }

//}
void setup()
{
  setupDateTime();
  pinMode(redPin, OUTPUT);   // declare LED as output
  pinMode(greenPin, OUTPUT); // declare LED as output
  pinMode(inputPin, INPUT);  // declare sensor as input

  Serial.begin(115200);
  delay(10);

  // next connect to wifi
  //  We start by connecting to a WiFi network

  Serial.println();
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED)
  {
    delay(2000);
    //     Serial.print(".");
    // }

    Serial.println("");
    Serial.println("WiFi connected.");
    Serial.println("IP address: ");
    Serial.println(WiFi.localIP());

    server.begin();
    // callApi();
  }

  int value = 0;
}

void loop()
{
  HTTPClient http;
  String serverName = "https://litterlogic-backend.herokuapp.com/api/triggers/create/3";
  http.begin(serverName);
  http.addHeader("Content-Type", "application/json");
  // int httpResponseCode=http.POST("{\"action\":\"apicall\",\"time\":\"2022-10-13\"}");

  DynamicJsonBuffer jBuffer;
  JsonObject &root = jBuffer.createObject();

  val = digitalRead(inputPin); // read input value
  if (val == HIGH)
  { // check if the input is HIGH
    digitalWrite(redPin, HIGH);
    digitalWrite(greenPin, LOW);
    delay(500); // turn LED ON
    if (pirState == LOW)
    {
      // we have just turned on
      StaticJsonBuffer<256> jb;
      // Add values in the document
      DateTimeParts p = DateTime.getParts();
      root["cat_id"] = 3;
      root["action"] = "enter";
      // root["date"]=(p.getYear(),
      //         p.getMonth(), p.getMonthDay());
      root["date"] = DateTime.format(DateFormatter::DATE_ONLY);
      root["time"] = DateTime.format(DateFormatter::TIME_ONLY);

      String requestBody;
      root.printTo(requestBody);
      int httpResponseCode = http.POST(requestBody);
      // int httpResponseCode=http.POST("{\"cat_id\":\"2\",\"action\":\"enter\"}");

      Serial.println("Motion detected, cat entered and logged");
      root["action"] = "enter";
      // root["time"]=DateTime.format(DateFormatter::SIMPLE).c_str();

      // root["date"]=DateTime.format(DateFormatter::DATE_ONLY);

      root["date"] = DateTime.format(DateFormatter::DATE_ONLY);
      root["time"] = DateTime.format(DateFormatter::TIME_ONLY);

      root.prettyPrintTo(Serial);
      Serial.println();

      delay(3000);
      // We only want to print on the output change, not state
      pirState = HIGH;
    }
  }
  else
  {
    digitalWrite(greenPin, HIGH); // turn green LED ON
    digitalWrite(redPin, LOW);    // turnred LED OFF
    delay(500);
    if (pirState == HIGH)
    {

      StaticJsonBuffer<256> jb;
      // Add values in the document
      DateTimeParts p = DateTime.getParts();
      root["cat_id"] = 3;
      root["action"] = "exit";
      //  root["date"]=(p.getYear(),
      //         p.getMonth(), p.getMonthDay());
      root["date"] = DateTime.format(DateFormatter::DATE_ONLY);
      root["time"] = DateTime.format(DateFormatter::TIME_ONLY);

      String requestBody;
      root.printTo(requestBody);
      int httpResponseCode = http.POST(requestBody);
      // int httpResponseCode=http.POST("{\"cat_id\":\"2\",\"action\":\"exit\"}");
      Serial.println("Motion ended, cat left and logged:");
      //  DateTimeParts p = DateTime.getParts();
      root["action"] = "exit";

      root["date"] = (p.getYear(),
                      p.getMonth(), p.getMonthDay());
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