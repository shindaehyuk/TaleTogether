#FROM ubuntu:latest
FROM amazoncorretto:11
#COPY build/libs/*.jar app.jar
COPY build/libs/backend-0.0.1-SNAPSHOT.jar app.jar
LABEL authors="SSAFY"

ENTRYPOINT ["java", "-jar", "app.jar"]