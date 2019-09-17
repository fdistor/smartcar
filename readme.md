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

- 200 - OK<br \>
  Request: `GET /vehicles/1234`<br \>
  Response: `{ vin: '123123412412', color: 'Metallic Silver', doorCount: 4, driveTrain: 'v8' }`

### Security

- 200 - OK<br \>
  Request: `GET /vehicles/1234/doors`<br \>
  Response: `[ { location: 'frontLeft', locked: false }, { location: 'frontRight', locked: true }, { location: 'backLeft', locked: false }, { location: 'backRight', locked: true } ]`

### Fuel Range

- 200 - OK<br \>
  Request: `GET /vehicles/1234/fuel`<br \>
  Response: `{ percent: 84.15 }`

### Battery Range

- 200 - OK<br \>
  Request: `GET /vehicles/1234/battery`<br \>
  Response: `{ percent: 64.37 }`

### Start/Stop Engine

- 200 - OK<br \>
  Request: `POST /vehicles/1234/battery { action: 'START|STOP' }`<br \>
  Response: `{ status: 'success|error' }`

- 400 - Bad request, invalid action or missing key 'action'<br \>
  **Invalid Action**<br \>
  Request: `POST /vehicles/1234/battery { action: 'PAUSE' }`<br \>
  Response: `{ reason: 'Bad request, invalid action.' }`

  **Missing Key**<br \>
  Request: `POST /vehicles/1234/battery { command: 'START' }`<br \>
  Response: `{ reason: 'Bad request, missing key 'action'.' }`

### Common Errors

- 404 - Invalid vehicle id provided<br \>
  Request: `GET /vehicles/thisIsInvalidId`<br \>
  Response: `{ reason: 'Vehicle id: thisIsInvalidId not found.' }`

- 502 - Failed to fetch from GM API<br \>
  Response: `{ reason: 'Failed to fetch from GM API.' }`
