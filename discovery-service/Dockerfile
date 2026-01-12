# Stage 1: Build with Maven (use the repo's wrapper if present)
FROM maven:3.9.11-eclipse-temurin-21 AS build
WORKDIR /app

# Copy only what's needed for build to leverage Docker cache
COPY pom.xml .
COPY mvnw .
COPY .mvn .mvn
RUN chmod +x mvnw

COPY src ./src

# Use the wrapper if available; falls back to mvn if not
RUN ./mvnw -B clean package -DskipTests

# Stage 2: smaller runtime image
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8761

ENTRYPOINT ["java", "-jar", "app.jar"]
