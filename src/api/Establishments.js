/* eslint no-underscore-dangle: 0 */
import Service from './Service';

/**
 * Interact with the Establishments methods of the API.
 */
export default class Establishments extends Service {
  /**
   * Get an establishment by ID.
   *
   * @param {string} id - The ID to lookup.
   *
   * @returns {Promise}
   */
  get(id) {
    return this._client.get(`Establishments/${id}`);
  }

  /**
   * Search for establishments by criteria.
   *
   * @param {string} name - The name of the establishment.
   * @param {string} address - The address of the establishment.
   * @param {number} page - The page of results to return.
   * @param {number} perPage - The number of results per page to return.
   *
   * @returns {Promise}
   */
  search(name, address, page = 1, perPage = 20) {
    const params = new URLSearchParams();
    params.append('name', name);

    if (address) {
      params.append('address', address);
    }

    params.append('pageNumber', page);
    params.append('pageSize', perPage);

    return this._client.get(`Establishments?${params.toString()}`);
  }
}
