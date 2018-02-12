# node-server-with-jwt

## Express NodeJS server with JWT implementation

Start Server
```
node index
```

Signup User with dummy username and password in json form using POST url http://localhost:3000/signup
```
{
  "username": "test",
  "password": "test"
}
```

Login user with above username and password in json form using POST url http://localhost:3000/login
```
{
  "username": "test",
  "password": "test"
}
```
Server will return token in header

Take token from login request header set Authorization header and send GET request http://localhost:3000/customers

you will get list of customers if you send request with valid jwt token

## Dockerize node server

After clone this project, go to project directory and build docker images
```
docker build -t node-server-with-jwt .
```

Run docker image
```
docker run -p <enter port which you want to use for this server>:3000 -d node-server-with-jwt
```
