import axios from 'axios';

/* eslint no-underscore-dangle: ["error", { "allow": ["_client"] }] */
class Service {
  constructor(client) {
    this._client = client;
  }
}

class EstablishmentService extends Service {
  get(id) {
    return this._client.get(`Establishments/${id}`);
  }

  search(name, address) {
    return this._client.get(`Establishments?name=${name}&address=${address}`);
  }
}

class RatingsService extends Service {
  get() {
    return this._client.get('Ratings');
  }
}

export default class FHRS {
  constructor() {
    this._client = axios.create({
      baseURL: 'https://api.ratings.food.gov.uk/',
      headers: {
        'x-api-version': '2',
        'accept-language': 'en-GB',
      },
    });
  }

  get establishments() {
    return new EstablishmentService(this._client);
  }

  get ratings() {
    return new RatingsService(this._client);
  }
}
