version: '2'
services:
  db:
    image: mysql/mysql-server:8.0.3
    restart: unless-stopped
    environment:
      MYSQL_ROOT_PASSWORD: 1234
      MYSQL_DATABASE: ssafy
      MYSQL_USER: root
      MYSQL_PASSWORD: twja0930
      TZ: 'Asia/Seoul'
    ports:
      - "3305:3306"
    volumes:
      - db-data:/var/lib/mysql

  myapp:
    image: test
    restart: on-failure
    build:
      context: .
      dockerfile: Dockerfile
    depends_on:
      - db
    environment:
      SPRING_DATASOURCE_URL: jdbc:mysql://db:3306/ssafy?useSSL=false
      SPRING_DATASOURCE_USERNAME: "root"
      SPRING_DATASOURCE_PASSWORD: "1234"
    ports:
      - "8080:8080"

volumes:
  db-data: