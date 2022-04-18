'use strict';

const axios = require(`axios`);
const TIMEOUT = 1000;

const port = process.env.API_PORT || 3000;
const defaultUrl = `http://localhost:${port}/api/`;

class API {
  constructor(baseURL, timeout) {
    this._http = axios.create({
      baseURL,
      timeout
    });
  }

  async _load(url, options) {
    const response = await this._http.request({url, ...options});
    return response.data;
  }

  getPublications({comments}) {
    return this._load(`/publications`, {params: {comments}});
  }

  getPublication(id) {
    return this._load(`/publications/${id}`);
  }

  search(query) {
    return this._load(`/search`, {params: {query}});
  }

  getComments(id) {
    return this._load(`/comments/${id}`);
  }

  async getCategories() {
    return this._load(`/categories`);
  }

  async createPublication(data) {
    return this._load(`/publications`, {
      method: `POST`,
      data
    });
  }
}

const defaultAPI = new API(defaultUrl, TIMEOUT);

module.exports = {
  API,
  getAPI: () => defaultAPI
};
