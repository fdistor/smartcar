# Smartcar Backend Coding Challenge

This is an API that fetches data from the GM API, polishes the data, and returns a cleaner response to the user.

## Pre-requisites

- Node

## Set up

Run `$ npm install` to install dependencies.

## Start up

Run `$ npm start` to start server in production environment.

Run `$ npm run dev` to start server in development environment.

## Testing

Run `$ npm test` to test the code.

## API Routing

| ROUTING               | METHOD | DATA              |
| --------------------- | ------ | ----------------- |
| /vehicles/:id         | GET    | Vehicle Info      |
| /vehicles/:id/doors   | GET    | Security          |
| /vehicles/:id/fuel    | GET    | Fuel Range        |
| /vehicles/:id/battery | GET    | Battery Range     |
| /vehicles/:id/engine  | POST   | Start/Stop Engine |

## Vehicle Info

- 200 - OK

Request:
``` js
GET /vehicles/1234
```

Response: 
``` js
{ 
  vin: '123123412412', 
  color: 'Metallic Silver', 
  doorCount: 4, 
  driveTrain: 'v8' 
}
```

## Security

- 200 - OK

Request: 
``` js
GET /vehicles/1234/doors
```

Response: 
```
[
  { location: 'frontLeft', locked: false }, 
  { location: 'frontRight', locked: true }, 
  { location: 'backLeft', locked: false }, 
  { location: 'backRight', locked: true }
]
```

## Fuel Range

- 200 - OK

Request: 
``` js
GET /vehicles/1234/fuel
```

Response: 
``` js
{ percent: 84.15 }
```

## Battery Range

- 200 - OK

Request: 
``` js
GET /vehicles/1234/battery
```

Response: 
``` js
{ percent: 64.37 }
```

## Start/Stop Engine

- 200 - OK

Request: 
``` js
POST /vehicles/1234/engine
{ action: 'START|STOP' }
```

Response: 
``` js
{ status: 'success|error' }
```

- 400 - Bad request, invalid action or missing key 'action'

**Invalid Action**

Request: 
``` js
POST /vehicles/1234/engine
{ action: 'PAUSE' }
```

Response: 
``` js
{ reason: 'Bad request, invalid action.' }
```

**Missing Key**

Request: 
``` js
POST /vehicles/1234/engine
{ command: 'START' }
```

Response: 
``` js
{ reason: 'Bad request, missing key 'action'.' }
```

## Common Errors

- 404 - Invalid vehicle id provided

Request: 
``` js
GET /vehicles/thisIsInvalidId
```

Response: 
``` js
{ reason: 'Vehicle id: thisIsInvalidId not found.' }
```

- 502 - Failed to fetch from GM API

Response: 
``` js
{ reason: 'Failed to fetch from GM API.' }
```

## Built With

- Mocha/Chai/Sinon - For unit testing the API endpoints
- Istanbul - For test coverage
- Express - For server set-up
- Dotenv - For environment variables
- Body-Parser - For parsing the body of requests
- Nodemon - For server restarts when developing
