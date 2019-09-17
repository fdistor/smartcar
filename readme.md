# Smartcar Backend Coding Challenge

This is an API that fetches data from the GM API, polishes the data, and returns the user a clean response.

## API Routing

| ROUTING               | METHOD | DATA              |
| --------------------- | ------ | ----------------- |
| /vehicles/:id         | GET    | Vehicle Info      |
| /vehicles/:id/doors   | GET    | Security          |
| /vehicles/:id/fuel    | GET    | Fuel Range        |
| /vehicles/:id/battery | GET    | Battery Range     |
| /vehicles/:id/engine  | POST   | Start/Stop Engine |

### Vehicle Info

- 200 - OK

Request: `GET /vehicles/1234`

Response: `{ vin: '123123412412', color: 'Metallic Silver', doorCount: 4, driveTrain: 'v8' }`

### Security

- 200 - OK

Request: `GET /vehicles/1234/doors`

Response: `[ { location: 'frontLeft', locked: false }, { location: 'frontRight', locked: true }, { location: 'backLeft', locked: false }, { location: 'backRight', locked: true } ]`

### Fuel Range

- 200 - OK

Request: `GET /vehicles/1234/fuel`

Response: `{ percent: 84.15 }`

### Battery Range

- 200 - OK

Request: `GET /vehicles/1234/battery`

Response: `{ percent: 64.37 }`

### Start/Stop Engine

- 200 - OK

Request: `POST /vehicles/1234/battery { action: 'START|STOP' }`

Response: `{ status: 'success|error' }`

- 400 - Bad request, invalid action or missing key 'action'

**Invalid Action**

Request: `POST /vehicles/1234/battery { action: 'PAUSE' }`

Response: `{ reason: 'Bad request, invalid action.' }`

**Missing Key**

Request: `POST /vehicles/1234/battery { command: 'START' }`

Response: `{ reason: 'Bad request, missing key 'action'.' }`

### Common Errors

- 404 - Invalid vehicle id provided

Request: `GET /vehicles/thisIsInvalidId`

Response: `{ reason: 'Vehicle id: thisIsInvalidId not found.' }`

- 502 - Failed to fetch from GM API

Response: `{ reason: 'Failed to fetch from GM API.' }`
