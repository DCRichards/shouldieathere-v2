/* eslint no-underscore-dangle: 0 */
import Service from './Service';

export default class Establishments extends Service {
  get(id) {
    return this._client.get(`Establishments/${id}`);
  }

  search(name, address) {
    return this._client.get(`Establishments?name=${name}&address=${address}`);
  }
}
