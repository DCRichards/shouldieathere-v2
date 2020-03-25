/* eslint no-underscore-dangle: 0 */
import axios from 'axios';
import Establishments from './Establishments';

/**
 * A slimline client library for the UK FHRS API.
 *
 * @link{https://api.ratings.food.gov.uk}
 */
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
    return new Establishments(this._client);
  }
}
