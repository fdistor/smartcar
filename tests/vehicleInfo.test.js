const { expect } = require('chai');
const axios = require('axios');
const url = 'http://localhost:8000';

describe('Vehicle endpoint', () => {
  it('Should get vehicle info for valid id', async () => {
    const response = await axios.get(url + '/vehicles/1234');

    expect(response).to.deep.equal({
      vin: '1213231',
      color: 'Metallic Silver',
      doorCount: 4,
      driveTrain: 'v8'
    });
  });

  it('Should return ');
});
