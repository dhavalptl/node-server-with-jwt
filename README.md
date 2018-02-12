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
